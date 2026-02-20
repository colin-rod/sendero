'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { isValidEmail } from '@/lib/utils/validation'
import { Button } from '@/components/ui/Button'

export default function BottomEmailCapture() {
  const t = useTranslations('hero.emailCapture')
  const tWaitlist = useTranslations('waitlist')
  const tValidation = useTranslations('validation')
  const locale = useLocale()

  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const handleJoinClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      return
    }
    handleSubmit()
  }

  const handleSubmit = async () => {
    setError('')
    setShowSuccess(false)

    if (!isValidEmail(email)) {
      setError(tValidation('emailInvalid'))
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/${locale}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tourDuration: 'weekend',
          interestTypes: ['bike', 'e_bike'],
          fitnessLevel: 'beginner',
          travelTimeline: 'later',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setError(tValidation('emailDuplicate'))
        } else if (response.status === 400) {
          setError(data.error || tValidation('emailInvalid'))
        } else {
          setError(tValidation('generalError'))
        }
        setIsSubmitting(false)
        return
      }

      setShowSuccess(true)
      setEmail('')
      setIsExpanded(false)
      setIsSubmitting(false)

      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch {
      setError(tValidation('networkError'))
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Email input — revealed when expanded */}
      <div
        style={{
          maxHeight: isExpanded ? '80px' : '0px',
          opacity: isExpanded ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          width: '100%',
        }}
      >
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('placeholder')}
          className="
            input
            w-full
            mb-3
            bg-white/95 backdrop-blur-sm
            border-2 border-white
            focus:border-primary-500 focus:ring-2 focus:ring-primary-500
            text-foreground placeholder:text-gray-500
            shadow-lg
          "
          disabled={isSubmitting}
          aria-label={t('placeholder')}
          tabIndex={isExpanded ? 0 : -1}
        />
      </div>

      {/* CTA / Submit button */}
      <Button
        onClick={handleJoinClick}
        disabled={isSubmitting}
        loading={isSubmitting}
        size="lg"
        className="
          whitespace-nowrap
          shadow-xl
          font-semibold tracking-widest
          bg-foreground hover:bg-gray-800 active:bg-gray-900
          text-white
          border-0
          rounded-full
          px-10
          transition-all duration-300
        "
      >
        {isExpanded ? t('buttonSubmit') : tWaitlist('joinButton')}
      </Button>

      {/* Error Message */}
      {error && (
        <p className="text-error-500 text-sm bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
          {error}
        </p>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="bg-green-500 text-white text-sm px-6 py-3 rounded-lg shadow-xl animate-fade-in">
          {t('successMessage')}
        </div>
      )}
    </div>
  )
}
