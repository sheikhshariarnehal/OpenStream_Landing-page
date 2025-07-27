/**
 * Cleanup Service for Access Codes
 * Handles automatic cleanup of expired codes without requiring pg_cron
 */

import { DatabaseService } from './supabase'

export class CleanupService {
  private static lastCleanup: Date | null = null
  private static cleanupInterval = 5 * 60 * 1000 // 5 minutes in milliseconds
  private static isRunning = false

  /**
   * Check if cleanup is needed and run it if necessary
   * This should be called before any major operation
   */
  static async checkAndCleanup(): Promise<void> {
    const now = new Date()
    
    // Skip if cleanup was run recently
    if (this.lastCleanup && (now.getTime() - this.lastCleanup.getTime()) < this.cleanupInterval) {
      return
    }

    // Skip if cleanup is already running
    if (this.isRunning) {
      return
    }

    try {
      this.isRunning = true
      await this.runCleanup()
      this.lastCleanup = now
    } catch (error) {
      console.error('Cleanup service error:', error)
    } finally {
      this.isRunning = false
    }
  }

  /**
   * Force run cleanup regardless of timing
   */
  static async forceCleanup(): Promise<number> {
    try {
      this.isRunning = true
      const cleanedCount = await this.runCleanup()
      this.lastCleanup = new Date()
      return cleanedCount
    } catch (error) {
      console.error('Force cleanup error:', error)
      throw error
    } finally {
      this.isRunning = false
    }
  }

  /**
   * Run the actual cleanup process
   */
  private static async runCleanup(): Promise<number> {
    try {
      const cleanedCount = await DatabaseService.cleanupExpiredCodes()
      
      if (cleanedCount > 0) {
        console.log(`Cleanup service: Cleaned up ${cleanedCount} expired codes`)
      }
      
      return cleanedCount
    } catch (error) {
      console.error('Cleanup execution error:', error)
      throw error
    }
  }

  /**
   * Get cleanup status information
   */
  static getStatus(): {
    lastCleanup: Date | null
    isRunning: boolean
    nextCleanupDue: Date | null
  } {
    const nextCleanupDue = this.lastCleanup 
      ? new Date(this.lastCleanup.getTime() + this.cleanupInterval)
      : new Date() // Due now if never run

    return {
      lastCleanup: this.lastCleanup,
      isRunning: this.isRunning,
      nextCleanupDue
    }
  }

  /**
   * Set custom cleanup interval (in minutes)
   */
  static setCleanupInterval(minutes: number): void {
    this.cleanupInterval = minutes * 60 * 1000
  }
}

/**
 * Middleware function to automatically run cleanup
 * Use this in your API routes
 */
export async function withCleanup<T>(operation: () => Promise<T>): Promise<T> {
  // Run cleanup check before the operation
  await CleanupService.checkAndCleanup()
  
  // Execute the main operation
  return await operation()
}

/**
 * Background cleanup service for client-side
 * Runs cleanup periodically in the background
 */
export class BackgroundCleanupService {
  private static interval: NodeJS.Timeout | null = null
  private static isStarted = false

  /**
   * Start background cleanup service
   */
  static start(intervalMinutes: number = 5): void {
    if (this.isStarted) {
      return
    }

    this.interval = setInterval(async () => {
      try {
        await CleanupService.checkAndCleanup()
      } catch (error) {
        console.error('Background cleanup error:', error)
      }
    }, intervalMinutes * 60 * 1000)

    this.isStarted = true
    console.log(`Background cleanup service started (interval: ${intervalMinutes} minutes)`)
  }

  /**
   * Stop background cleanup service
   */
  static stop(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.isStarted = false
    console.log('Background cleanup service stopped')
  }

  /**
   * Check if service is running
   */
  static isRunning(): boolean {
    return this.isStarted
  }
}

// Export a simple function for easy use in API routes
export const ensureCleanup = () => CleanupService.checkAndCleanup()
