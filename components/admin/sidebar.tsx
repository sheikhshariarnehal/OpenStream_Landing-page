"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/contexts/theme-context"
import { 
  Shield, 
  BarChart3, 
  Key, 
  Activity, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  LogOut,
  Home,
  Users,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  stats?: {
    activeCodes: number
    totalCodes: number
    recentActivity: number
  }
}

export function Sidebar({ activeTab, onTabChange, stats }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { resolvedTheme } = useTheme()

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      badge: stats?.activeCodes,
      description: "Dashboard overview"
    },
    {
      id: "codes",
      label: "Access Codes",
      icon: Key,
      badge: stats?.activeCodes,
      description: "Manage access codes"
    },
    {
      id: "logs",
      label: "Activity Logs",
      icon: Activity,
      badge: stats?.recentActivity,
      description: "View usage logs"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "System settings"
    }
  ]

  return (
    <div className={cn(
      "flex flex-col h-full theme-bg-sidebar theme-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 theme-border border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold theme-text-primary">Admin Panel</h2>
              <p className="text-xs theme-text-secondary">Access Management</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="theme-text-secondary hover:theme-text-primary theme-transition"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 theme-transition",
                isActive
                  ? "theme-interactive-active"
                  : "theme-text-secondary hover:theme-text-primary theme-interactive-hover",
                isCollapsed && "justify-center"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      <Separator className="bg-gray-800" />

      {/* Stats Summary */}
      {!isCollapsed && stats && (
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Active Codes</span>
              <span className="text-white font-medium">{stats.activeCodes}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total Generated</span>
              <span className="text-white font-medium">{stats.totalCodes}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Recent Activity</span>
              <span className="text-white font-medium">{stats.recentActivity}</span>
            </div>
          </div>
        </div>
      )}

      <Separator className="bg-gray-800" />

      {/* Footer */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-gray-400 hover:text-white",
            isCollapsed && "justify-center"
          )}
        >
          <HelpCircle className="h-4 w-4" />
          {!isCollapsed && "Help & Support"}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-gray-400 hover:text-red-400",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  )
}
