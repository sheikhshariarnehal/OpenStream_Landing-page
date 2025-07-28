"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Copy,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SortAsc,
  SortDesc
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  title: string
  description?: string
  data: any[]
  columns: Column[]
  loading?: boolean
  searchPlaceholder?: string
  onRowAction?: (action: string, row: any) => void
  actions?: Array<{
    label: string
    icon: React.ComponentType<any>
    onClick: (row: any) => void
    variant?: "default" | "destructive" | "outline"
  }>
}

export function DataTable({ 
  title, 
  description, 
  data, 
  columns, 
  loading, 
  searchPlaceholder = "Search...",
  onRowAction,
  actions = []
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const { resolvedTheme } = useTheme()

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]
        
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, sortColumn, sortDirection])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedData, currentPage])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  const exportData = () => {
    const csv = [
      columns.map(col => col.label).join(","),
      ...filteredAndSortedData.map(row =>
        columns.map(col => row[col.key]).join(",")
      )
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <Card className="theme-bg-card">
        <CardHeader>
          <div className={`h-6 w-48 rounded animate-pulse ${
            resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'
          }`} />
          <div className={`h-4 w-64 rounded animate-pulse ${
            resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'
          }`} />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-12 rounded animate-pulse ${
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'
              }`} />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="theme-bg-card theme-transition">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="theme-text-primary">{title}</CardTitle>
            {description && (
              <p className="text-sm theme-text-secondary mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportData}
              className="theme-button-secondary theme-transition"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 theme-text-muted" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 theme-input theme-transition"
            />
          </div>
          <Badge variant="secondary" className={`${
            resolvedTheme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-slate-100 text-slate-700'
          }`}>
            {filteredAndSortedData.length} items
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg theme-border border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="theme-table-header theme-border theme-interactive-hover">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      "theme-text-secondary",
                      column.sortable && "cursor-pointer hover:theme-text-primary theme-transition"
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sortColumn === column.key && (
                        sortDirection === "asc" ? 
                          <SortAsc className="h-4 w-4" /> : 
                          <SortDesc className="h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
                {actions.length > 0 && (
                  <TableHead className="theme-text-secondary w-20">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  className="theme-border theme-table-row theme-transition"
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="theme-text-primary">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {actions.map((action, actionIndex) => {
                          const Icon = action.icon
                          return (
                            <Button
                              key={actionIndex}
                              variant={action.variant || "ghost"}
                              size="sm"
                              onClick={() => action.onClick(row)}
                              className="h-8 w-8 p-0"
                            >
                              <Icon className="h-3 w-3" />
                            </Button>
                          )
                        })}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm theme-text-secondary">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="theme-button-secondary theme-transition"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="theme-button-secondary theme-transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm theme-text-secondary px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="theme-button-secondary theme-transition"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="theme-button-secondary theme-transition"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
