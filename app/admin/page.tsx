"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Clock, 
  Users, 
  Activity,
  AlertCircle,
  CheckCircle,
  Copy,
  Eye,
  EyeOff
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
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(false)
  const [newCodeDuration, setNewCodeDuration] = useState(10)
  const [showToken, setShowToken] = useState(false)

  const authenticate = async () => {
    if (!adminToken.trim()) {
      toast.error("Please enter admin token")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/access-codes?action=admin', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAdminData(data)
        setIsAuthenticated(true)
        toast.success("Authentication successful")
      } else {
        toast.error("Invalid admin token")
      }
    } catch (error) {
      toast.error("Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    if (!isAuthenticated) return

    setLoading(true)
    try {
      const response = await fetch('/api/access-codes?action=admin', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAdminData(data)
      } else {
        toast.error("Failed to refresh data")
      }
    } catch (error) {
      toast.error("Failed to refresh data")
    } finally {
      setLoading(false)
    }
  }

  const generateCode = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/access-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          action: 'generate',
          duration: newCodeDuration
        })
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(`New access code generated: ${data.code}`)
        await refreshData()
      } else {
        toast.error("Failed to generate code")
      }
    } catch (error) {
      toast.error("Failed to generate code")
    } finally {
      setLoading(false)
    }
  }

  const revokeCode = async (code: string) => {
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

      if (response.ok) {
        toast.success(`Code ${code} revoked successfully`)
        await refreshData()
      } else {
        toast.error("Failed to revoke code")
      }
    } catch (error) {
      toast.error("Failed to revoke code")
    } finally {
      setLoading(false)
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success("Code copied to clipboard")
  }

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

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAuthenticated && adminData) {
      interval = setInterval(() => {
        // Force re-render to update time remaining
        setAdminData(prev => prev ? { ...prev } : null)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isAuthenticated, adminData])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle>Admin Authentication</CardTitle>
            <CardDescription>
              Enter your admin token to access the access code management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-token">Admin Token</Label>
              <div className="relative">
                <Input
                  id="admin-token"
                  type={showToken ? "text" : "password"}
                  placeholder="Enter admin token"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && authenticate()}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Default token for demo: <code className="bg-gray-100 px-1 rounded">admin-secret-token-2024</code>
              </AlertDescription>
            </Alert>

            <Button 
              onClick={authenticate} 
              disabled={loading || !adminToken.trim()}
              className="w-full"
            >
              {loading ? "Authenticating..." : "Authenticate"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-500" />
              Access Code Management
            </h1>
            <p className="text-gray-400 mt-2">Manage temporary access codes for server connections</p>
          </div>
          <Button onClick={refreshData} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="codes">Active Codes</TabsTrigger>
            <TabsTrigger value="logs">Usage Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminData?.activeCodes.length || 0}</div>
                  <p className="text-xs text-muted-foreground">Currently valid codes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Generated</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminData?.totalCodes || 0}</div>
                  <p className="text-xs text-muted-foreground">All time codes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminData?.usageLogs.length || 0}</div>
                  <p className="text-xs text-muted-foreground">Log entries</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Generate New Access Code</CardTitle>
                <CardDescription>Create a new temporary access code with custom expiration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Expiration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="1440"
                      value={newCodeDuration}
                      onChange={(e) => setNewCodeDuration(parseInt(e.target.value) || 10)}
                      className="w-32"
                    />
                  </div>
                  <Button onClick={generateCode} disabled={loading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Access Codes</CardTitle>
                <CardDescription>Currently valid access codes and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {adminData?.activeCodes.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No active access codes</p>
                    <p className="text-sm">Generate a new code to get started</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead>Time Remaining</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminData?.activeCodes.map((accessCode) => (
                        <TableRow key={accessCode.code}>
                          <TableCell className="font-mono">
                            <div className="flex items-center gap-2">
                              {accessCode.code}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyCode(accessCode.code)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(accessCode.createdAt)}</TableCell>
                          <TableCell>{formatDate(accessCode.expiresAt)}</TableCell>
                          <TableCell>
                            <Badge variant={new Date(accessCode.expiresAt) > new Date() ? "default" : "destructive"}>
                              {getTimeRemaining(accessCode.expiresAt)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {accessCode.usedAt ? (
                              <Badge variant="secondary">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Used
                              </Badge>
                            ) : (
                              <Badge variant="default">
                                <Clock className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => revokeCode(accessCode.code)}
                              disabled={loading}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Revoke
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Logs</CardTitle>
                <CardDescription>Recent activity and code usage history</CardDescription>
              </CardHeader>
              <CardContent>
                {adminData?.usageLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No usage logs available</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminData?.usageLogs.slice().reverse().map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono">{log.code}</TableCell>
                          <TableCell>
                            <Badge variant={getActionBadgeVariant(log.action)}>
                              {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(log.timestamp)}</TableCell>
                          <TableCell className="text-sm text-gray-400">
                            {log.details || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
