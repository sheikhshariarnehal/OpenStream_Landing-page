"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Users, 
  Clock, 
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Timer
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardsProps {
  data: {
    activeCodes: number
    totalCodes: number
    usageLogs: number
    expiringSoon?: number
    usedToday?: number
    successRate?: number
  }
  loading?: boolean
}

export function StatsCards({ data, loading }: StatsCardsProps) {
  const stats = [
    {
      title: "Active Codes",
      value: data.activeCodes,
      icon: Shield,
      description: "Currently valid codes",
      trend: "+12%",
      trendUp: true,
      color: "blue"
    },
    {
      title: "Total Generated",
      value: data.totalCodes,
      icon: Users,
      description: "All time codes",
      trend: "+5%",
      trendUp: true,
      color: "green"
    },
    {
      title: "Recent Activity",
      value: data.usageLogs,
      icon: Activity,
      description: "Last 24 hours",
      trend: "+23%",
      trendUp: true,
      color: "purple"
    },
    {
      title: "Expiring Soon",
      value: data.expiringSoon || 2,
      icon: Timer,
      description: "Next 5 minutes",
      trend: "-8%",
      trendUp: false,
      color: "orange"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
      green: "from-green-500/20 to-green-600/20 border-green-500/30",
      purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
      orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-400 bg-blue-500/20",
      green: "text-green-400 bg-green-500/20",
      purple: "text-purple-400 bg-purple-500/20",
      orange: "text-orange-400 bg-orange-500/20"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gray-700 rounded-lg animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-24 bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card 
            key={index} 
            className={cn(
              "bg-gradient-to-br border transition-all duration-300 hover:scale-105 hover:shadow-lg",
              getColorClasses(stat.color)
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center",
                getIconColorClasses(stat.color)
              )}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value.toLocaleString()}
              </div>
              <p className="text-xs text-gray-400 mb-2">
                {stat.description}
              </p>
              <div className="flex items-center gap-1">
                <Badge 
                  variant={stat.trendUp ? "default" : "destructive"}
                  className="text-xs"
                >
                  <TrendingUp className={cn(
                    "h-3 w-3 mr-1",
                    !stat.trendUp && "rotate-180"
                  )} />
                  {stat.trend}
                </Badge>
                <span className="text-xs text-gray-500">vs last week</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
