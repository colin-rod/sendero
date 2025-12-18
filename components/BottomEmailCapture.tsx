'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { isValidEmail } from '@/lib/utils/validation'
import { Button } from '@/components/ui/Button'

export default function BottomEmailCapture() {
  const t = useTranslations('hero.emailCapture')
  const tValidation = useTranslations('validation')
  const locale = useLocale()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setShowSuccess(false)

    // Validate email
    if (!isValidEmail(email)) {
      setError(tValidation('emailInvalid'))
      return
    }

    setIsSubmitting(true)

    try {
      // Submit with sensible defaults for required fields
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

      // Success - show toast notification
      setShowSuccess(true)
      setEmail('')
      setIsSubmitting(false)

      // Hide success message after 5 seconds
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
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
        {/* Email Input - Always visible */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('placeholder')}
          className="
            input
            w-full
            bg-white/95 backdrop-blur-sm
            border-2 border-white
            focus:border-primary-500 focus:ring-2 focus:ring-primary-500
            text-foreground placeholder:text-gray-500
            shadow-lg
          "
          disabled={isSubmitting}
          aria-label={t('placeholder')}
        />

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
          variant="primary"
          size="lg"
          className="
            whitespace-nowrap
            shadow-xl
            text-white font-semibold
            bg-primary-500 hover:bg-primary-600 active:bg-primary-700
            border-2 border-primary-400
            w-full sm:w-auto
          "
        >
          {t('buttonSubmit')}
        </Button>
      </div>

      {/* Helper Text */}
      {!showSuccess && !error && (
        <p className="text-white/90 text-sm text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {t('helperText')}
        </p>
      )}

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
