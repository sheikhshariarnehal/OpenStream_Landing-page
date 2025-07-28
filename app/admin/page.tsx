"use client"

import { useState, useEffect, useCallback } from "react"
import { useRealtimeData } from "@/hooks/use-realtime-data"
import { useTheme } from "@/contexts/theme-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/admin/sidebar"
import { StatsCards } from "@/components/admin/stats-cards"
import { DataTable } from "@/components/admin/data-table"
import { CodeGenerator } from "@/components/admin/code-generator"
import {
  Shield,
  Plus,
  Trash2,
  Clock,
  Users,
  Activity,
  AlertCircle,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  Timer,
  TrendingUp,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Settings,
  Bell,
  User
} from "lucide-react"
import { toast } from "sonner"

interface AccessCode {
  code: string
  expiresAt: string
  createdAt: string
  usedAt?: string
  usedBy?: string
}

interface UsageLog {
  id: string
  code: string
  action: 'generated' | 'used' | 'expired' | 'revoked'
  timestamp: string
  details?: string
}

interface AdminData {
  activeCodes: AccessCode[]
  totalCodes: number
  usageLogs: UsageLog[]
}

export default function AdminPage() {
  const [adminToken, setAdminToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [isInitializing, setIsInitializing] = useState(true)
  const { resolvedTheme } = useTheme()

  // Use the new realtime data hook
  const {
    data: adminData,
    loading,
    error,
    generateCode,
    revokeCode,
    copyCode,
    refresh: refreshData
  } = useRealtimeData({
    adminToken: isAuthenticated ? adminToken : "",
    autoRefresh: isAuthenticated,
    refreshInterval: 30000
  })

  // Session persistence - restore authentication state on page load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem('admin-token')
        const savedAuth = localStorage.getItem('admin-authenticated')
        const sessionTimestamp = localStorage.getItem('admin-session-timestamp')

        if (savedToken && savedAuth === 'true') {
          // Check if session has expired (24 hours)
          const sessionAge = Date.now() - parseInt(sessionTimestamp || '0')
          const maxSessionAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

          if (sessionAge > maxSessionAge) {
            // Session expired, clear saved data
            localStorage.removeItem('admin-token')
            localStorage.removeItem('admin-authenticated')
            localStorage.removeItem('admin-session-timestamp')
            toast.info("Session expired. Please login again.")
          } else {
            // Verify the saved token is still valid
            const response = await fetch('/api/access-codes?action=admin', {
              headers: {
                'Authorization': `Bearer ${savedToken}`
              }
            })

            if (response.ok) {
              setAdminToken(savedToken)
              setIsAuthenticated(true)
              // Update session timestamp
              localStorage.setItem('admin-session-timestamp', Date.now().toString())
            } else {
              // Token is invalid, clear saved data
              localStorage.removeItem('admin-token')
              localStorage.removeItem('admin-authenticated')
              localStorage.removeItem('admin-session-timestamp')
            }
          }
        }
      } catch (error) {
        console.error('Session restoration failed:', error)
        // Clear invalid session data
        localStorage.removeItem('admin-token')
        localStorage.removeItem('admin-authenticated')
        localStorage.removeItem('admin-session-timestamp')
      } finally {
        setIsInitializing(false)
      }
    }

    restoreSession()
  }, [])

  const authenticate = async () => {
    if (!adminToken.trim()) {
      toast.error("Please enter admin password")
      return
    }

    // Test authentication by trying to fetch admin data
    try {
      const response = await fetch('/api/access-codes?action=admin', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      })

      if (response.ok) {
        setIsAuthenticated(true)
        // Save authentication state to localStorage with timestamp
        localStorage.setItem('admin-token', adminToken)
        localStorage.setItem('admin-authenticated', 'true')
        localStorage.setItem('admin-session-timestamp', Date.now().toString())
        toast.success("Authentication successful")
      } else {
        toast.error("Invalid admin password")
      }
    } catch (error) {
      toast.error("Authentication failed")
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAdminToken("")
    // Clear saved authentication data
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-authenticated')
    localStorage.removeItem('admin-session-timestamp')
    toast.success("Logged out successfully")
  }

  // All data management functions are now handled by the useRealtimeData hook

  // copyCode function is now handled by the useRealtimeData hook

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()
    
    if (diff <= 0) return "Expired"
    
    const minutes = Math.floor(diff / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    return `${minutes}m ${seconds}s`
  }

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'generated': return 'default'
      case 'used': return 'secondary'
      case 'expired': return 'destructive'
      case 'revoked': return 'outline'
      default: return 'default'
    }
  }

  // Real-time updates for countdown timers (keep this for UI updates)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAuthenticated && adminData) {
      interval = setInterval(() => {
        // Force re-render to update countdown timers
        setActiveTab(prev => prev)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isAuthenticated, adminData])

  // Show loading state during initialization
  if (isInitializing) {
    return (
      <div className="min-h-screen theme-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="theme-text-secondary">Initializing...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen theme-bg-primary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
              resolvedTheme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/8'
            }`} />
            <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
              resolvedTheme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/8'
            }`} />
          </div>

          <Card className={`relative theme-bg-card backdrop-blur-sm theme-transition ${
            resolvedTheme === 'dark' ? 'shadow-2xl' : 'shadow-xl border'
          }`}>
            <CardHeader className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl theme-text-primary">Admin Portal</CardTitle>
                <CardDescription className="theme-text-secondary mt-2">
                  Secure access to the access code management system
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="theme-text-secondary">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showToken ? "text" : "password"}
                    placeholder="Enter your admin password"
                    value={adminToken}
                    onChange={(e) => setAdminToken(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && authenticate()}
                    className="theme-input pr-12 theme-transition"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 theme-text-secondary hover:theme-text-primary theme-transition"
                    onClick={() => setShowToken(!showToken)}
                  >
                    {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                onClick={authenticate}
                disabled={loading || !adminToken.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Prepare data for components
  const statsData = {
    activeCodes: adminData?.activeCodes.length || 0,
    totalCodes: adminData?.totalCodes || 0,
    usageLogs: adminData?.usageLogs.length || 0,
    expiringSoon: adminData?.activeCodes.filter(code => {
      const expiresAt = new Date(code.expiresAt)
      const now = new Date()
      const diff = expiresAt.getTime() - now.getTime()
      return diff > 0 && diff < 5 * 60 * 1000 // 5 minutes
    }).length || 0
  }

  const accessCodeColumns = [
    {
      key: "code",
      label: "Code",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-blue-400">{value}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyCode(value)}
            className="h-6 w-6 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      )
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value: string) => formatDate(value)
    },
    {
      key: "expiresAt",
      label: "Expires",
      sortable: true,
      render: (value: string) => formatDate(value)
    },
    {
      key: "timeRemaining",
      label: "Time Left",
      render: (_: any, row: any) => (
        <Badge variant={new Date(row.expiresAt) > new Date() ? "default" : "destructive"}>
          {getTimeRemaining(row.expiresAt)}
        </Badge>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (_: any, row: any) => (
        row.usedAt ? (
          <Badge variant="secondary">
            <CheckCircle className="h-3 w-3 mr-1" />
            Used
          </Badge>
        ) : (
          <Badge variant="default">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      )
    }
  ]

  const logColumns = [
    {
      key: "code",
      label: "Code",
      render: (value: string) => <span className="font-mono text-blue-400">{value}</span>
    },
    {
      key: "action",
      label: "Action",
      render: (value: string) => (
        <Badge variant={getActionBadgeVariant(value)}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: "timestamp",
      label: "Timestamp",
      sortable: true,
      render: (value: string) => formatDate(value)
    },
    {
      key: "details",
      label: "Details",
      render: (value: string) => (
        <span className="text-gray-400 text-sm">{value || '-'}</span>
      )
    }
  ]

  return (
    <div className="min-h-screen theme-bg-primary theme-transition">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          stats={statsData}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="theme-bg-header theme-border px-6 py-4 theme-transition">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold theme-text-primary">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'codes' && 'Access Codes'}
                  {activeTab === 'logs' && 'Activity Logs'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
                <p className="theme-text-secondary text-sm mt-1">
                  {activeTab === 'overview' && 'Monitor system performance and recent activity'}
                  {activeTab === 'codes' && 'Manage and monitor access codes'}
                  {activeTab === 'logs' && 'View detailed activity and usage logs'}
                  {activeTab === 'settings' && 'Configure system settings and preferences'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle variant="dropdown" size="sm" />
                <div className="flex items-center gap-2 text-sm theme-text-secondary">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="theme-button-secondary theme-transition"
                  title="Logout"
                >
                  <User className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className={`flex-1 overflow-auto p-6 space-y-6 ${
            resolvedTheme === 'dark' ? '' : 'bg-slate-50/30'
          }`}>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <StatsCards data={statsData} loading={loading} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DataTable
                    title="Recent Access Codes"
                    description="Latest generated access codes"
                    data={adminData?.activeCodes.slice(0, 5) || []}
                    columns={accessCodeColumns.slice(0, 3)}
                    loading={loading}
                    searchPlaceholder="Search codes..."
                  />

                  <DataTable
                    title="Recent Activity"
                    description="Latest system activity"
                    data={adminData?.usageLogs.slice(0, 5) || []}
                    columns={logColumns.slice(0, 3)}
                    loading={loading}
                    searchPlaceholder="Search logs..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'codes' && (
              <div className="space-y-6">
                <CodeGenerator onGenerate={generateCode} loading={loading} />

                <DataTable
                  title="Active Access Codes"
                  description="All currently valid access codes"
                  data={adminData?.activeCodes || []}
                  columns={accessCodeColumns}
                  loading={loading}
                  searchPlaceholder="Search access codes..."
                  actions={[
                    {
                      label: "Copy",
                      icon: Copy,
                      onClick: (row) => copyCode(row.code),
                      variant: "outline"
                    },
                    {
                      label: "Revoke",
                      icon: Trash2,
                      onClick: (row) => revokeCode(row.code),
                      variant: "destructive"
                    }
                  ]}
                />
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="space-y-6">
                <DataTable
                  title="Activity Logs"
                  description="Complete history of access code activities"
                  data={adminData?.usageLogs.slice().reverse() || []}
                  columns={logColumns}
                  loading={loading}
                  searchPlaceholder="Search activity logs..."
                />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card className="theme-bg-card theme-transition">
                  <CardHeader>
                    <CardTitle className="theme-text-primary">System Settings</CardTitle>
                    <CardDescription className="theme-text-secondary">
                      Configure system preferences and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-12 theme-text-secondary">
                      <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Settings panel coming soon</p>
                      <p className="text-sm">Advanced configuration options will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
