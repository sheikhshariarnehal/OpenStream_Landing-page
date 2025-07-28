"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'admin-theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark')

  // Get system preference
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Resolve theme based on current setting
  const resolveTheme = (currentTheme: Theme): ResolvedTheme => {
    if (currentTheme === 'system') {
      return getSystemTheme()
    }
    return currentTheme
  }

  // Apply theme to document
  const applyTheme = (newResolvedTheme: ResolvedTheme) => {
    const root = window.document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add new theme class
    root.classList.add(newResolvedTheme)
    
    // Set CSS custom property for theme
    root.style.setProperty('--theme', newResolvedTheme)
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        newResolvedTheme === 'dark' ? '#111827' : '#ffffff'
      )
    }
  }

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    
    try {
      localStorage.setItem(storageKey, newTheme)
    } catch (error) {
      console.warn('Failed to save theme preference:', error)
    }
    
    const newResolvedTheme = resolveTheme(newTheme)
    setResolvedTheme(newResolvedTheme)
    applyTheme(newResolvedTheme)
  }

  // Toggle between light and dark (skip system)
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Initialize theme on mount
  useEffect(() => {
    try {
      // Try to get saved theme from localStorage
      const savedTheme = localStorage.getItem(storageKey) as Theme | null
      const initialTheme = savedTheme || defaultTheme
      
      setThemeState(initialTheme)
      
      const initialResolvedTheme = resolveTheme(initialTheme)
      setResolvedTheme(initialResolvedTheme)
      applyTheme(initialResolvedTheme)
    } catch (error) {
      console.warn('Failed to load theme preference:', error)
      // Fallback to default
      const fallbackResolvedTheme = resolveTheme(defaultTheme)
      setResolvedTheme(fallbackResolvedTheme)
      applyTheme(fallbackResolvedTheme)
    }
  }, [defaultTheme, storageKey])

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      const newResolvedTheme = getSystemTheme()
      setResolvedTheme(newResolvedTheme)
      applyTheme(newResolvedTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

// Hook for getting theme-aware classes
export function useThemeClasses() {
  const { resolvedTheme } = useTheme()
  
  return {
    // Background classes
    bg: {
      primary: resolvedTheme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-white via-slate-50 to-white',
      secondary: resolvedTheme === 'dark'
        ? 'bg-gray-800/50'
        : 'bg-white',
      card: resolvedTheme === 'dark'
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white border-slate-200 shadow-sm',
      sidebar: resolvedTheme === 'dark'
        ? 'bg-gray-900/50 border-gray-800'
        : 'bg-white border-slate-200',
      header: resolvedTheme === 'dark'
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white/95 backdrop-blur-sm border-slate-200'
    },
    
    // Text classes
    text: {
      primary: resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900',
      secondary: resolvedTheme === 'dark' ? 'text-gray-400' : 'text-slate-600',
      muted: resolvedTheme === 'dark' ? 'text-gray-500' : 'text-slate-500',
      accent: resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'
    },
    
    // Interactive classes
    interactive: {
      hover: resolvedTheme === 'dark'
        ? 'hover:bg-gray-800/50'
        : 'hover:bg-slate-50',
      active: resolvedTheme === 'dark'
        ? 'bg-blue-600/20 text-blue-400 border-blue-600/30'
        : 'bg-blue-50 text-blue-600 border-blue-200',
      button: resolvedTheme === 'dark'
        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
    },
    
    // Input classes
    input: {
      base: resolvedTheme === 'dark'
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500',
      focus: resolvedTheme === 'dark'
        ? 'focus:ring-blue-500 focus:border-blue-500'
        : 'focus:ring-blue-500 focus:border-blue-500'
    }
  }
}
