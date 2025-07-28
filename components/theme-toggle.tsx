"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from '@/contexts/theme-context'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Palette,
  Check
} from 'lucide-react'

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ThemeToggle({ 
  variant = 'dropdown', 
  size = 'md',
  showLabel = false 
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size={size}
        className="theme-button-secondary"
        disabled
      >
        <Palette className="h-4 w-4" />
        {showLabel && <span className="ml-2">Theme</span>}
      </Button>
    )
  }

  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'system':
        return <Monitor className="h-4 w-4" />
      default:
        return <Palette className="h-4 w-4" />
    }
  }

  const getThemeLabel = (themeName: string) => {
    switch (themeName) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'system':
        return 'System'
      default:
        return 'Theme'
    }
  }

  if (variant === 'button') {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className="theme-button-secondary theme-transition"
        title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        {showLabel && (
          <span className="ml-2">
            {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
          </span>
        )}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className="theme-button-secondary theme-transition"
          title="Change theme"
        >
          {getThemeIcon(theme)}
          {showLabel && <span className="ml-2">{getThemeLabel(theme)}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="theme-bg-card theme-border min-w-[140px]"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="theme-interactive-hover theme-transition cursor-pointer"
        >
          <Sun className="h-4 w-4 mr-2" />
          <span className="theme-text-primary">Light</span>
          {theme === 'light' && (
            <Check className="h-4 w-4 ml-auto theme-text-accent" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="theme-interactive-hover theme-transition cursor-pointer"
        >
          <Moon className="h-4 w-4 mr-2" />
          <span className="theme-text-primary">Dark</span>
          {theme === 'dark' && (
            <Check className="h-4 w-4 ml-auto theme-text-accent" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="theme-interactive-hover theme-transition cursor-pointer"
        >
          <Monitor className="h-4 w-4 mr-2" />
          <span className="theme-text-primary">System</span>
          {theme === 'system' && (
            <Check className="h-4 w-4 ml-auto theme-text-accent" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Simple toggle switch component
export function ThemeSwitch() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-11 h-6 bg-gray-300 rounded-full animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 theme-text-secondary" />
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${resolvedTheme === 'dark' 
            ? 'bg-blue-600' 
            : 'bg-gray-300'
          }
        `}
        role="switch"
        aria-checked={resolvedTheme === 'dark'}
        aria-label="Toggle theme"
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${resolvedTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      <Moon className="h-4 w-4 theme-text-secondary" />
    </div>
  )
}

// Compact theme indicator
export function ThemeIndicator() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
  }

  return (
    <div 
      className={`
        w-2 h-2 rounded-full transition-colors
        ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-yellow-500'}
      `}
      title={`Current theme: ${resolvedTheme}`}
    />
  )
}
