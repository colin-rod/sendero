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
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current)
      }
    }
  }, [])

  const handleJoinClick = () => {
    if (!isExpanded) {
      setShowSuccess(false)
      setIsExpanded(true)
      return
    }
    handleSubmit()
  }

  const handleSubmit = async () => {
    setError('')
    setShowSuccess(false)
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current)
      successTimerRef.current = null
    }

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

      successTimerRef.current = setTimeout(() => {
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
    <div className="w-full max-w-xl">
      <div
        data-testid="bottom-email-capture-row"
        className="flex w-full items-center justify-center gap-3"
      >
        {/* Email input — revealed inline when expanded */}
        <div
          className={`min-w-0 overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
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
              bg-white/96
              border-2 border-white/90
              focus:border-honey-500 focus:ring-2 focus:ring-honey-400
              text-foreground placeholder:text-gray-600
              shadow-xl
            "
            disabled={isSubmitting}
            aria-label={t('placeholder')}
            tabIndex={isExpanded ? 0 : -1}
          />
        </div>

        {showSuccess ? (
          <div
            data-testid="bottom-email-confirmation"
            role="status"
            aria-live="polite"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-[20px] bg-success-500 h-[42px] min-w-[140px] px-6 text-accent-400 uppercase font-medium text-[14px] leading-[18px] tracking-[0.06em] font-['Helvetica_Neue'] shadow-xl"
          >
            {t('buttonSent')}
          </div>
        ) : (
          <Button
            onClick={handleJoinClick}
            disabled={isSubmitting}
            loading={isSubmitting}
            variant="hero-cta"
            className="whitespace-nowrap transition-all duration-300"
          >
            {isExpanded ? t('buttonSubmit') : tWaitlist('joinButton')}
          </Button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-3 rounded-lg bg-white/95 px-4 py-2 text-sm text-error-500 shadow-lg backdrop-blur-sm">
          {error}
        </p>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 rounded-lg bg-green-500/95 px-6 py-3 text-sm text-white shadow-xl animate-fade-in"
        >
          {t('successMessage')}
        </div>
      )}
    </div>
  )
}
