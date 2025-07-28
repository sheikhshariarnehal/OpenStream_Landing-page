"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/contexts/theme-context"
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
  const { resolvedTheme } = useTheme()
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
    const opacity = resolvedTheme === 'dark' ? '20' : '10'
    const borderOpacity = resolvedTheme === 'dark' ? '30' : '20'

    const colors = {
      blue: `from-blue-500/${opacity} to-blue-600/${opacity} border-blue-500/${borderOpacity}`,
      green: `from-green-500/${opacity} to-green-600/${opacity} border-green-500/${borderOpacity}`,
      purple: `from-purple-500/${opacity} to-purple-600/${opacity} border-purple-500/${borderOpacity}`,
      orange: `from-orange-500/${opacity} to-orange-600/${opacity} border-orange-500/${borderOpacity}`
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getIconColorClasses = (color: string) => {
    const bgOpacity = resolvedTheme === 'dark' ? '20' : '10'
    const textShade = resolvedTheme === 'dark' ? '400' : '600'

    const colors = {
      blue: `text-blue-${textShade} bg-blue-500/${bgOpacity}`,
      green: `text-green-${textShade} bg-green-500/${bgOpacity}`,
      purple: `text-purple-${textShade} bg-purple-500/${bgOpacity}`,
      orange: `text-orange-${textShade} bg-orange-500/${bgOpacity}`
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="theme-bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className={`h-4 w-20 rounded animate-pulse ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`} />
              <div className={`h-8 w-8 rounded-lg animate-pulse ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`} />
            </CardHeader>
            <CardContent>
              <div className={`h-8 w-16 rounded animate-pulse mb-2 ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`} />
              <div className={`h-3 w-24 rounded animate-pulse mb-2 ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`} />
              <div className={`h-3 w-16 rounded animate-pulse ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`} />
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
              "bg-gradient-to-br border theme-transition hover:scale-105",
              getColorClasses(stat.color),
              resolvedTheme === 'light' && "shadow-sm hover:shadow-md"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium theme-text-secondary">
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
              <div className="text-2xl font-bold theme-text-primary mb-1">
                {stat.value.toLocaleString()}
              </div>
              <p className="text-xs theme-text-muted mb-2">
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
