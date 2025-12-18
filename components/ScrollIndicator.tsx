'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)
  const t = useTranslations('accessibility')

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after scrolling 10% of viewport height
      const scrollThreshold = window.innerHeight * 0.1
      setIsVisible(window.scrollY < scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    // Scroll to first content section (just past the hero)
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={handleClick}
      aria-label={t('scrollIndicator')}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-2 text-white">
        {/* Animated chevron */}
        <svg
          className="w-8 h-8 md:w-10 md:h-10 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {/* Optional text hint - uncomment if desired */}
        {/* <span className="text-xs md:text-sm font-medium uppercase tracking-wide">
          Scroll
        </span> */}
      </div>
    </button>
  )
}
