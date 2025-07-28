/**
 * Test script for Access Code API
 * Run this script to test the access code functionality
 * 
 * Prerequisites:
 * - Next.js development server running on localhost:3000
 * - Node.js installed
 * 
 * Usage: node test-access-codes.js
 */

const BASE_URL = 'http://localhost:3000'
const ADMIN_TOKEN = 'admin2520'

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return { success: response.ok, status: response.status, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

async function testGenerateCode() {
  console.log('\n🔧 Testing code generation...')
  
  const result = await makeRequest(`${BASE_URL}/api/access-codes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    },
    body: JSON.stringify({
      action: 'generate',
      duration: 5 // 5 minutes for testing
    })
  })

  if (result.success) {
    console.log('✅ Code generated successfully:', result.data.code)
    console.log('⏰ Expires at:', new Date(result.data.expiresAt).toLocaleString())
    return result.data.code
  } else {
    console.log('❌ Failed to generate code:', result.data?.error || result.error)
    return null
  }
}

async function testValidateCode(code) {
  console.log('\n🔍 Testing code validation...')
  
  const result = await makeRequest(`${BASE_URL}/api/access-codes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'validate',
      code: code
    })
  })

  if (result.success) {
    console.log('✅ Code validated successfully:', result.data.message)
    return true
  } else {
    console.log('❌ Code validation failed:', result.data?.error || result.error)
    return false
  }
}

async function testInvalidCode() {
  console.log('\n🚫 Testing invalid code...')
  
  const result = await makeRequest(`${BASE_URL}/api/access-codes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'validate',
      code: 'INVALID1'
    })
  })

  if (!result.success) {
    console.log('✅ Invalid code properly rejected:', result.data?.error || result.error)
    return true
  } else {
    console.log('❌ Invalid code was accepted (this should not happen)')
    return false
  }
}

async function testAdminData() {
  console.log('\n📊 Testing admin data retrieval...')
  
  const result = await makeRequest(`${BASE_URL}/api/access-codes?action=admin`, {
    headers: {
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    }
  })

  if (result.success) {
    console.log('✅ Admin data retrieved successfully')
    console.log('📈 Active codes:', result.data.activeCodes.length)
    console.log('📊 Total codes:', result.data.totalCodes)
    console.log('📝 Usage logs:', result.data.usageLogs.length)
    return true
  } else {
    console.log('❌ Failed to retrieve admin data:', result.data?.error || result.error)
    return false
  }
}

async function testRevokeCode(code) {
  console.log('\n🗑️ Testing code revocation...')
  
  const result = await makeRequest(`${BASE_URL}/api/access-codes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    },
    body: JSON.stringify({
      action: 'revoke',
      code: code
    })
  })

  if (result.success) {
    console.log('✅ Code revoked successfully:', result.data.message)
    return true
  } else {
    console.log('❌ Failed to revoke code:', result.data?.error || result.error)
    return false
  }
}

async function testUnauthorizedAccess() {
  console.log('\n🔒 Testing unauthorized access...')
  
  const result = await makeRequest(`${BASE_URL}/api/access-codes?action=admin`, {
    headers: {
      'Authorization': 'Bearer invalid-token'
    }
  })

  if (!result.success && result.status === 401) {
    console.log('✅ Unauthorized access properly blocked')
    return true
  } else {
    console.log('❌ Unauthorized access was allowed (security issue)')
    return false
  }
}

async function runTests() {
  console.log('🚀 Starting Access Code API Tests')
  console.log('=====================================')

  let testsPassed = 0
  let totalTests = 0

  // Test 1: Generate code
  totalTests++
  const generatedCode = await testGenerateCode()
  if (generatedCode) testsPassed++

  // Test 2: Validate valid code
  if (generatedCode) {
    totalTests++
    const validationResult = await testValidateCode(generatedCode)
    if (validationResult) testsPassed++
  }

  // Test 3: Test invalid code
  totalTests++
  const invalidResult = await testInvalidCode()
  if (invalidResult) testsPassed++

  // Test 4: Test admin data
  totalTests++
  const adminResult = await testAdminData()
  if (adminResult) testsPassed++

  // Test 5: Test unauthorized access
  totalTests++
  const unauthorizedResult = await testUnauthorizedAccess()
  if (unauthorizedResult) testsPassed++

  // Test 6: Revoke code
  if (generatedCode) {
    totalTests++
    const revokeResult = await testRevokeCode(generatedCode)
    if (revokeResult) testsPassed++
  }

  // Test 7: Try to use revoked code
  if (generatedCode) {
    totalTests++
    console.log('\n🔄 Testing revoked code validation...')
    const revokedValidation = await testValidateCode(generatedCode)
    if (!revokedValidation) {
      console.log('✅ Revoked code properly rejected')
      testsPassed++
    } else {
      console.log('❌ Revoked code was accepted (this should not happen)')
    }
  }

  console.log('\n📋 Test Results')
  console.log('================')
  console.log(`✅ Tests passed: ${testsPassed}/${totalTests}`)
  console.log(`❌ Tests failed: ${totalTests - testsPassed}/${totalTests}`)
  
  if (testsPassed === totalTests) {
    console.log('\n🎉 All tests passed! The access code system is working correctly.')
  } else {
    console.log('\n⚠️ Some tests failed. Please check the implementation.')
  }

  console.log('\n📝 Next Steps:')
  console.log('1. Open http://localhost:3000 to test the user interface')
  console.log('2. Open http://localhost:3000/admin to test the admin dashboard')
  console.log('3. Use admin token: admin-secret-token-2024')
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ with built-in fetch support')
  console.log('💡 Alternative: Test the API using the web interface at http://localhost:3000')
  process.exit(1)
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test execution failed:', error.message)
  console.log('\n💡 Make sure the Next.js development server is running:')
  console.log('   npm run dev (or yarn dev / pnpm dev)')
  process.exit(1)
})
