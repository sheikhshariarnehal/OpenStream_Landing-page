import { NextRequest, NextResponse } from 'next/server'
import { CleanupService } from '@/lib/cleanup-service'

// Admin authentication
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin2520'

function isValidAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${ADMIN_TOKEN}`
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    if (!isValidAdminToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Force cleanup
    const cleanedCount = await CleanupService.forceCleanup()
    
    return NextResponse.json({
      success: true,
      cleanedCount,
      message: `Cleaned up ${cleanedCount} expired codes`
    })
  } catch (error) {
    console.error('Cleanup API error:', error)
    return NextResponse.json({
      error: 'Failed to run cleanup',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    if (!isValidAdminToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get cleanup status
    const status = CleanupService.getStatus()
    
    return NextResponse.json({
      status: {
        lastCleanup: status.lastCleanup,
        isRunning: status.isRunning,
        nextCleanupDue: status.nextCleanupDue
      }
    })
  } catch (error) {
    console.error('Cleanup status API error:', error)
    return NextResponse.json({
      error: 'Failed to get cleanup status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
