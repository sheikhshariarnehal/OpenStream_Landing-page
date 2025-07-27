import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.')
  console.error('Required variables:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY')

  // Don't throw error during build/import, only when actually using the client
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface AccessCode {
  id: string
  code: string
  expires_at: string
  created_at: string
  is_active: boolean
  used_at?: string
  used_by?: string
  duration_minutes: number
  created_by?: string
}

export interface UsageLog {
  id: string
  code: string
  action: 'generated' | 'used' | 'expired' | 'revoked'
  timestamp: string
  details?: string
  ip_address?: string
  user_agent?: string
}

// Database utility functions
export class DatabaseService {

  private static checkSupabaseClient() {
    if (!supabase) {
      throw new Error('Supabase client not initialized. Please check your environment variables.')
    }
  }

  // Access Codes Operations
  static async generateAccessCode(duration: number = 10): Promise<AccessCode> {
    this.checkSupabaseClient()

    const code = this.generateSecureCode()
    const expiresAt = new Date(Date.now() + duration * 60 * 1000)

    const { data, error } = await supabase!
      .from('access_codes')
      .insert({
        code,
        expires_at: expiresAt.toISOString(),
        duration_minutes: duration,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to generate access code: ${error.message}`)
    }

    // Log the generation
    await this.addUsageLog(code, 'generated', `Expires in ${duration} minutes`)

    return data
  }

  static async validateAccessCode(code: string, ipAddress?: string): Promise<{ valid: boolean; message: string; accessCode?: AccessCode }> {
    // Get the access code
    const { data: accessCode, error } = await supabase
      .from('access_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !accessCode) {
      return { valid: false, message: 'Invalid access code' }
    }

    // Check if expired
    const now = new Date()
    const expiresAt = new Date(accessCode.expires_at)
    
    if (expiresAt < now) {
      // Mark as expired
      await this.deactivateAccessCode(code, 'expired')
      return { valid: false, message: 'Access code has expired' }
    }

    // Mark as used
    await supabase
      .from('access_codes')
      .update({
        used_at: now.toISOString(),
        used_by: ipAddress || 'unknown'
      })
      .eq('code', code.toUpperCase())

    // Log the usage
    await this.addUsageLog(code, 'used', `Used by ${ipAddress || 'unknown'}`)

    return { valid: true, message: 'Access code validated successfully', accessCode }
  }

  static async revokeAccessCode(code: string): Promise<void> {
    await this.deactivateAccessCode(code, 'revoked')
  }

  static async deactivateAccessCode(code: string, reason: 'expired' | 'revoked'): Promise<void> {
    const { error } = await supabase
      .from('access_codes')
      .update({ is_active: false })
      .eq('code', code.toUpperCase())

    if (error) {
      throw new Error(`Failed to deactivate access code: ${error.message}`)
    }

    await this.addUsageLog(code, reason, `Manually ${reason} by admin`)
  }

  static async getActiveCodes(): Promise<AccessCode[]> {
    const { data, error } = await supabase
      .from('access_codes')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch active codes: ${error.message}`)
    }

    return data || []
  }

  static async getTotalCodesCount(): Promise<number> {
    const { count, error } = await supabase
      .from('access_codes')
      .select('*', { count: 'exact', head: true })

    if (error) {
      throw new Error(`Failed to count codes: ${error.message}`)
    }

    return count || 0
  }

  // Usage Logs Operations
  static async addUsageLog(code: string, action: UsageLog['action'], details?: string, ipAddress?: string): Promise<void> {
    const { error } = await supabase
      .from('usage_logs')
      .insert({
        code: code.toUpperCase(),
        action,
        details,
        ip_address: ipAddress,
        timestamp: new Date().toISOString()
      })

    if (error) {
      console.error('Failed to add usage log:', error)
      // Don't throw error for logging failures to avoid breaking main functionality
    }
  }

  static async getUsageLogs(limit: number = 50): Promise<UsageLog[]> {
    const { data, error } = await supabase
      .from('usage_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch usage logs: ${error.message}`)
    }

    return data || []
  }

  // Cleanup Operations
  static async cleanupExpiredCodes(): Promise<number> {
    const now = new Date().toISOString()
    
    // Get expired codes that are still active
    const { data: expiredCodes, error: fetchError } = await supabase
      .from('access_codes')
      .select('code')
      .eq('is_active', true)
      .lt('expires_at', now)

    if (fetchError) {
      throw new Error(`Failed to fetch expired codes: ${fetchError.message}`)
    }

    if (!expiredCodes || expiredCodes.length === 0) {
      return 0
    }

    // Deactivate expired codes
    const { error: updateError } = await supabase
      .from('access_codes')
      .update({ is_active: false })
      .eq('is_active', true)
      .lt('expires_at', now)

    if (updateError) {
      throw new Error(`Failed to cleanup expired codes: ${updateError.message}`)
    }

    // Log the cleanup
    for (const expiredCode of expiredCodes) {
      await this.addUsageLog(expiredCode.code, 'expired', 'Automatically expired by cleanup')
    }

    return expiredCodes.length
  }

  // Utility Functions
  static generateSecureCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    
    // Use crypto.getRandomValues for better randomness
    const array = new Uint8Array(8)
    crypto.getRandomValues(array)
    
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(array[i] % chars.length)
    }
    
    return result
  }

  // Real-time subscriptions
  static subscribeToAccessCodes(callback: (payload: any) => void) {
    return supabase
      .channel('access_codes_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'access_codes' }, 
        callback
      )
      .subscribe()
  }

  static subscribeToUsageLogs(callback: (payload: any) => void) {
    return supabase
      .channel('usage_logs_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'usage_logs' }, 
        callback
      )
      .subscribe()
  }
}
