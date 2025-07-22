"use client"

import { useEffect, useRef, useState } from "react"

interface LazySectionProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export default function LazySection({ 
  children, 
  className = "", 
  threshold = 0.1, 
  rootMargin = "50px" 
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-pulse bg-gray-800 rounded-lg w-full h-48"></div>
        </div>
      )}
    </div>
  )
}
