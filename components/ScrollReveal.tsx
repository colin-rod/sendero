'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  threshold?: number
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // If user prefers reduced motion, show immediately
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay before showing
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}
