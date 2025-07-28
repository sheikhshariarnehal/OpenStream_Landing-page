/**
 * Database Setup Script
 * Run this script to set up the database with sample data
 * 
 * Usage: npx tsx scripts/setup-database.ts
 */

import { DatabaseService } from '../lib/supabase'

async function setupDatabase() {
  console.log('🚀 Setting up database...')

  try {
    // Test database connection
    console.log('📡 Testing database connection...')
    const stats = await DatabaseService.getTotalCodesCount()
    console.log(`✅ Database connected. Current total codes: ${stats}`)

    // Clean up any expired codes
    console.log('🧹 Cleaning up expired codes...')
    const cleanedUp = await DatabaseService.cleanupExpiredCodes()
    console.log(`✅ Cleaned up ${cleanedUp} expired codes`)

    // Generate some sample codes for testing
    console.log('📝 Generating sample access codes...')
    
    const sampleCodes = await Promise.all([
      DatabaseService.generateAccessCode(10), // 10 minutes
      DatabaseService.generateAccessCode(30), // 30 minutes
      DatabaseService.generateAccessCode(60), // 1 hour
    ])

    console.log('✅ Generated sample codes:')
    sampleCodes.forEach(code => {
      console.log(`   - ${code.code} (expires: ${new Date(code.expires_at).toLocaleString()})`)
    })

    // Get current statistics
    console.log('📊 Current database statistics:')
    const [activeCodes, totalCodes, usageLogs] = await Promise.all([
      DatabaseService.getActiveCodes(),
      DatabaseService.getTotalCodesCount(),
      DatabaseService.getUsageLogs(10)
    ])

    console.log(`   - Active codes: ${activeCodes.length}`)
    console.log(`   - Total codes: ${totalCodes}`)
    console.log(`   - Recent logs: ${usageLogs.length}`)

    console.log('🎉 Database setup completed successfully!')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupDatabase()
}
