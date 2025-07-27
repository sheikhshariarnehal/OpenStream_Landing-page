import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// In-memory storage for demo purposes
// In production, use a proper database
interface AccessCode {
  code: string
  expiresAt: Date
  createdAt: Date
  isActive: boolean
  usedAt?: Date
  usedBy?: string
}

interface UsageLog {
  id: string
  code: string
  action: 'generated' | 'used' | 'expired' | 'revoked'
  timestamp: Date
  details?: string
}

let accessCodes: Map<string, AccessCode> = new Map()
let usageLogs: UsageLog[] = []

// Admin authentication (simple token-based for demo)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-secret-token-2024'

function generateSecureCode(): string {
  // Generate a cryptographically secure 8-character alphanumeric code
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(crypto.randomInt(0, chars.length))
  }
  return result
}

function addUsageLog(code: string, action: UsageLog['action'], details?: string) {
  usageLogs.push({
    id: crypto.randomUUID(),
    code,
    action,
    timestamp: new Date(),
    details
  })
}

function cleanupExpiredCodes() {
  const now = new Date()
  for (const [code, accessCode] of accessCodes.entries()) {
    if (accessCode.expiresAt < now && accessCode.isActive) {
      accessCode.isActive = false
      addUsageLog(code, 'expired')
    }
  }
}

function isValidAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${ADMIN_TOKEN}`
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  // Clean up expired codes before any operation
  cleanupExpiredCodes()

  if (action === 'admin') {
    // Admin endpoint to get all codes and logs
    if (!isValidAdminToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const activeCodes = Array.from(accessCodes.entries())
      .filter(([_, code]) => code.isActive)
      .map(([codeStr, code]) => ({
        code: codeStr,
        expiresAt: code.expiresAt,
        createdAt: code.createdAt,
        usedAt: code.usedAt,
        usedBy: code.usedBy
      }))

    return NextResponse.json({
      activeCodes,
      totalCodes: accessCodes.size,
      usageLogs: usageLogs.slice(-50) // Last 50 logs
    })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, code, duration } = body

    // Clean up expired codes before any operation
    cleanupExpiredCodes()

    if (action === 'generate') {
      // Admin endpoint to generate new code
      if (!isValidAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const newCode = generateSecureCode()
      const expirationMinutes = duration || 10
      const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000)

      accessCodes.set(newCode, {
        code: newCode,
        expiresAt,
        createdAt: new Date(),
        isActive: true
      })

      addUsageLog(newCode, 'generated', `Expires in ${expirationMinutes} minutes`)

      return NextResponse.json({
        code: newCode,
        expiresAt,
        expirationMinutes
      })
    }

    if (action === 'validate') {
      // Public endpoint to validate code
      if (!code) {
        return NextResponse.json({ error: 'Code is required' }, { status: 400 })
      }

      const accessCode = accessCodes.get(code.toUpperCase())
      
      if (!accessCode) {
        return NextResponse.json({ 
          valid: false, 
          error: 'Invalid access code' 
        }, { status: 400 })
      }

      if (!accessCode.isActive) {
        return NextResponse.json({ 
          valid: false, 
          error: 'Access code has been deactivated' 
        }, { status: 400 })
      }

      if (accessCode.expiresAt < new Date()) {
        accessCode.isActive = false
        addUsageLog(code, 'expired')
        return NextResponse.json({ 
          valid: false, 
          error: 'Access code has expired' 
        }, { status: 400 })
      }

      // Mark as used
      accessCode.usedAt = new Date()
      accessCode.usedBy = request.ip || 'unknown'
      addUsageLog(code, 'used', `Used by ${accessCode.usedBy}`)

      return NextResponse.json({ 
        valid: true, 
        message: 'Access code validated successfully' 
      })
    }

    if (action === 'revoke') {
      // Admin endpoint to revoke code
      if (!isValidAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      if (!code) {
        return NextResponse.json({ error: 'Code is required' }, { status: 400 })
      }

      const accessCode = accessCodes.get(code.toUpperCase())
      if (!accessCode) {
        return NextResponse.json({ error: 'Code not found' }, { status: 404 })
      }

      accessCode.isActive = false
      addUsageLog(code, 'revoked', 'Manually revoked by admin')

      return NextResponse.json({ message: 'Code revoked successfully' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Access code API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
