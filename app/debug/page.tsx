"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, TestTube, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function DebugPage() {
  const [adminToken, setAdminToken] = useState("admin-secret-token-2024")
  const [testResults, setTestResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const addTestResult = (test: string, success: boolean, data?: any, error?: any) => {
    const result = {
      test,
      success,
      data,
      error: error?.message || error,
      timestamp: new Date().toLocaleTimeString()
    }
    setTestResults(prev => [result, ...prev])
    return result
  }

  const testAPI = async () => {
    setLoading(true)
    setTestResults([])

    try {
      // Test 1: Generate a code
      console.log("Testing code generation...")
      const generateResponse = await fetch('/api/access-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          action: 'generate',
          duration: 10
        })
      })

      const generateData = await generateResponse.json()
      addTestResult(
        "Generate Code", 
        generateResponse.ok, 
        generateData, 
        !generateResponse.ok ? generateData : null
      )

      if (generateResponse.ok && generateData.code) {
        // Test 2: Validate the generated code
        console.log("Testing code validation...")
        const validateResponse = await fetch('/api/access-codes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'validate',
            code: generateData.code
          })
        })

        const validateData = await validateResponse.json()
        addTestResult(
          "Validate Code", 
          validateResponse.ok, 
          validateData, 
          !validateResponse.ok ? validateData : null
        )

        // Test 3: Get admin data
        console.log("Testing admin data retrieval...")
        const adminResponse = await fetch('/api/access-codes?action=admin', {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        })

        const adminData = await adminResponse.json()
        addTestResult(
          "Get Admin Data", 
          adminResponse.ok, 
          adminData, 
          !adminResponse.ok ? adminData : null
        )
      }

    } catch (error) {
      console.error("Test error:", error)
      addTestResult("API Test", false, null, error)
    } finally {
      setLoading(false)
    }
  }

  const testCopyFunctionality = async () => {
    const testCode = "TEST1234"
    
    try {
      await navigator.clipboard.writeText(testCode)
      toast.success("Clipboard test successful!")
      addTestResult("Clipboard Test", true, { code: testCode })
    } catch (error) {
      console.error("Clipboard test failed:", error)
      
      // Try fallback method
      try {
        const textArea = document.createElement('textarea')
        textArea.value = testCode
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const success = document.execCommand('copy')
        document.body.removeChild(textArea)
        
        if (success) {
          toast.success("Fallback clipboard test successful!")
          addTestResult("Clipboard Fallback Test", true, { code: testCode })
        } else {
          throw new Error("execCommand failed")
        }
      } catch (fallbackError) {
        toast.error("Both clipboard methods failed!")
        addTestResult("Clipboard Test", false, null, fallbackError)
      }
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TestTube className="h-5 w-5 text-blue-400" />
              Debug & Test Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token" className="text-gray-300">Admin Token</Label>
              <Input
                id="token"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={testAPI} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Testing..." : "Test API"}
              </Button>
              
              <Button 
                onClick={testCopyFunctionality}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Test Copy Function
              </Button>
              
              <Button 
                onClick={clearResults}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Clear Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        {testResults.length > 0 && (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.success 
                        ? 'bg-green-900/20 border-green-700' 
                        : 'bg-red-900/20 border-red-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {result.success ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span className="font-medium text-white">{result.test}</span>
                      </div>
                      <Badge variant={result.success ? "default" : "destructive"}>
                        {result.success ? "PASS" : "FAIL"}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-400 mb-2">
                      {result.timestamp}
                    </div>

                    {result.data && (
                      <div className="bg-gray-900/50 p-3 rounded border border-gray-600 mb-2">
                        <div className="text-xs text-gray-400 mb-1">Response Data:</div>
                        <pre className="text-xs text-green-400 overflow-x-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    )}

                    {result.error && (
                      <div className="bg-red-900/20 p-3 rounded border border-red-600">
                        <div className="text-xs text-red-400 mb-1">Error:</div>
                        <pre className="text-xs text-red-300 overflow-x-auto">
                          {typeof result.error === 'string' ? result.error : JSON.stringify(result.error, null, 2)}
                        </pre>
                      </div>
                    )}

                    {result.data?.code && (
                      <div className="mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(result.data.code)
                            toast.success("Code copied!")
                          }}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Code: {result.data.code}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-blue-900/20 border-blue-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Debug Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-200 space-y-2">
            <p>1. <strong>Test API</strong>: This will test code generation, validation, and admin data retrieval</p>
            <p>2. <strong>Test Copy Function</strong>: This will test if the clipboard functionality works in your browser</p>
            <p>3. <strong>Check Console</strong>: Open browser DevTools (F12) and check the Console tab for any errors</p>
            <p>4. <strong>Check Network</strong>: In DevTools, go to Network tab to see if API calls are successful</p>
            <p>5. If tests pass but the main admin page doesn't work, there might be a component rendering issue</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
