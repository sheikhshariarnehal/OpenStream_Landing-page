"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestSupabasePage() {
  const [status, setStatus] = useState('Testing...')
  const [details, setDetails] = useState<any>(null)

  const testConnection = async () => {
    setStatus('Testing Supabase connection...')
    
    try {
      // Test environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        setStatus('❌ Environment variables not found')
        setDetails({
          url: supabaseUrl ? '✅ URL found' : '❌ URL missing',
          key: supabaseKey ? '✅ Key found' : '❌ Key missing'
        })
        return
      }

      // Test API endpoint
      const response = await fetch('/api/access-codes?action=admin', {
        headers: {
          'Authorization': 'Bearer admin2520'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStatus('✅ Supabase connection successful!')
        setDetails(data)
      } else {
        const error = await response.text()
        setStatus('❌ API call failed')
        setDetails({ error, status: response.status })
      }
    } catch (error) {
      setStatus('❌ Connection failed')
      setDetails({ error: error instanceof Error ? error.message : 'Unknown error' })
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Supabase Connection Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg font-medium text-white">
              Status: {status}
            </div>
            
            <Button onClick={testConnection} className="w-full">
              Test Again
            </Button>

            {details && (
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Details:</h3>
                <pre className="text-green-400 text-sm overflow-auto">
                  {JSON.stringify(details, null, 2)}
                </pre>
              </div>
            )}

            <div className="text-sm text-gray-400">
              <p>Environment Variables:</p>
              <ul className="list-disc list-inside">
                <li>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</li>
                <li>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
