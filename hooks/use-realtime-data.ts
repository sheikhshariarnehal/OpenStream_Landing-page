"use client"

import { useState, useEffect, useCallback } from 'react'
import { DatabaseService } from '@/lib/supabase'
import { toast } from 'sonner'

interface AdminData {
  activeCodes: any[]
  totalCodes: number
  usageLogs: any[]
}

interface UseRealtimeDataOptions {
  adminToken: string
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useRealtimeData({ 
  adminToken, 
  autoRefresh = true, 
  refreshInterval = 30000 
}: UseRealtimeDataOptions) {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async (showToast = false) => {
    if (!adminToken) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/access-codes?action=admin', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const newData = await response.json()
      setData(newData)
      
      if (showToast) {
        toast.success('Data refreshed successfully')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [adminToken])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchData(false)
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchData, autoRefresh, refreshInterval])

  // Real-time subscriptions
  useEffect(() => {
    if (!adminToken) return

    // Subscribe to access codes changes
    const accessCodesSubscription = DatabaseService.subscribeToAccessCodes((payload) => {
      console.log('Access codes changed:', payload)
      // Refresh data when changes occur
      fetchData(false)
    })

    // Subscribe to usage logs changes
    const usageLogsSubscription = DatabaseService.subscribeToUsageLogs((payload) => {
      console.log('Usage logs changed:', payload)
      // Refresh data when changes occur
      fetchData(false)
    })

    return () => {
      accessCodesSubscription.unsubscribe()
      usageLogsSubscription.unsubscribe()
    }
  }, [adminToken, fetchData])

  // Initial data fetch
  useEffect(() => {
    if (adminToken) {
      fetchData(false)
    }
  }, [adminToken, fetchData])

  const generateCode = useCallback(async (options: { 
    duration: number
    quantity: number
    prefix?: string
    autoExpire: boolean 
  }) => {
    setLoading(true)
    try {
      const promises = Array.from({ length: options.quantity }, () =>
        fetch('/api/access-codes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            action: 'generate',
            duration: options.duration
          })
        })
      )

      const responses = await Promise.all(promises)
      const results = await Promise.all(responses.map(r => r.json()))
      
      const successfulResults = results.filter((result, index) => responses[index].ok)
      const generatedCodes = successfulResults.map(result => result.code)
      
      if (successfulResults.length > 0) {
        toast.success(`Generated ${successfulResults.length} access code${successfulResults.length > 1 ? 's' : ''} successfully`)
        await fetchData(false) // Refresh data
        return generatedCodes
      } else {
        throw new Error("No codes generated")
      }
    } catch (error) {
      console.error('Code generation error:', error)
      toast.error("Failed to generate codes")
      throw error
    } finally {
      setLoading(false)
    }
  }, [adminToken, fetchData])

  const revokeCode = useCallback(async (code: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/access-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          action: 'revoke',
          code
        })
      })

      if (!response.ok) {
        throw new Error('Failed to revoke code')
      }

      toast.success(`Code ${code} revoked successfully`)
      await fetchData(false) // Refresh data
    } catch (error) {
      console.error('Code revocation error:', error)
      toast.error("Failed to revoke code")
      throw error
    } finally {
      setLoading(false)
    }
  }, [adminToken, fetchData])

  const copyCode = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success("Code copied to clipboard")
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      try {
        const textArea = document.createElement('textarea')
        textArea.value = code
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        toast.success("Code copied to clipboard")
      } catch (fallbackError) {
        console.error('Copy failed:', fallbackError)
        toast.error("Failed to copy code. Please copy manually: " + code)
      }
    }
  }, [])

  return {
    data,
    loading,
    error,
    fetchData,
    generateCode,
    revokeCode,
    copyCode,
    refresh: () => fetchData(true)
  }
}
