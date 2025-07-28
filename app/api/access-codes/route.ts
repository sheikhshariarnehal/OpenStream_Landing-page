import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/supabase'
import { ensureCleanup } from '@/lib/cleanup-service'

// Admin authentication (simple token-based for demo)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin2520'

function isValidAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${ADMIN_TOKEN}`
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return 'unknown'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  try {
    // Clean up expired codes before any operation
    await ensureCleanup()

    if (action === 'admin') {
      // Admin endpoint to get all codes and logs
      if (!isValidAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const [activeCodes, totalCodes, usageLogs] = await Promise.all([
        DatabaseService.getActiveCodes(),
        DatabaseService.getTotalCodesCount(),
        DatabaseService.getUsageLogs(50)
      ])

      // Transform data to match frontend expectations
      const transformedCodes = activeCodes.map(code => ({
        code: code.code,
        expiresAt: code.expires_at,
        createdAt: code.created_at,
        usedAt: code.used_at,
        usedBy: code.used_by
      }))

      const transformedLogs = usageLogs.map(log => ({
        id: log.id,
        code: log.code,
        action: log.action,
        timestamp: log.timestamp,
        details: log.details
      }))

      return NextResponse.json({
        activeCodes: transformedCodes,
        totalCodes,
        usageLogs: transformedLogs
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('GET /api/access-codes error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, code, duration } = body
    const clientIP = getClientIP(request)

    // Clean up expired codes before any operation
    await ensureCleanup()

    if (action === 'generate') {
      // Admin endpoint to generate new code
      if (!isValidAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const expirationMinutes = duration || 10
      const accessCode = await DatabaseService.generateAccessCode(expirationMinutes)

      return NextResponse.json({
        code: accessCode.code,
        expiresAt: accessCode.expires_at,
        expirationMinutes
      })
    }

    if (action === 'validate') {
      // Public endpoint to validate code
      if (!code) {
        return NextResponse.json({ error: 'Code is required' }, { status: 400 })
      }

      const result = await DatabaseService.validateAccessCode(code, clientIP)

      if (result.valid) {
        return NextResponse.json({
          valid: true,
          message: result.message
        })
      } else {
        return NextResponse.json({
          valid: false,
          error: result.message
        }, { status: 400 })
      }
    }

    if (action === 'revoke') {
      // Admin endpoint to revoke code
      if (!isValidAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      if (!code) {
        return NextResponse.json({ error: 'Code is required' }, { status: 400 })
      }

      await DatabaseService.revokeAccessCode(code)
      return NextResponse.json({ message: 'Code revoked successfully' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Access code API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
