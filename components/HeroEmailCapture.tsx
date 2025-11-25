'use client'

import { useState } from 'react'
import { isValidEmail } from '@/lib/utils/validation'
import { Button } from '@/components/ui/Button'

export default function HeroEmailCapture() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleButtonClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      return
    }

    // If expanded, always allow submit
    handleSubmit()
  }

  const handleSubmit = async () => {
    setError('')

    // Validate email
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      // Submit with sensible defaults for required fields
      const response = await fetch('/api/waitlist', {
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
          setError('This email is already on our waitlist!')
        } else if (response.status === 400) {
          setError(data.error || 'Invalid email address')
        } else {
          setError('Something went wrong. Please try again.')
        }
        setIsSubmitting(false)
        return
      }

      // Success - redirect to thank you page
      router.push('/thank-you')
    } catch {
      setError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email) {
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 w-full">
        {/* Email Input - Shows when expanded */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your email"
          className={`
            input
            transition-all duration-300 ease-in-out
            bg-white/95 backdrop-blur-sm
            border-2 border-white
            focus:border-primary-500 focus:ring-2 focus:ring-primary-500
            text-foreground placeholder:text-gray-500
            shadow-lg
            ${isExpanded ? 'w-full opacity-100 scale-100' : 'w-0 opacity-0 scale-0'}
          `}
          disabled={isSubmitting}
          aria-label="Email address"
        />

        {/* Button - Changes text based on state */}
        <Button
          onClick={handleButtonClick}
          disabled={isSubmitting}
          loading={isSubmitting}
          variant="primary"
          size="lg"
          className={`
            transition-all duration-300 ease-in-out
            whitespace-nowrap
            shadow-xl
            !text-white font-semibold
            !bg-primary-500 hover:!bg-primary-600 active:!bg-primary-700
            border-2 border-primary-400
            ${isExpanded ? 'flex-shrink-0' : 'w-full'}
          `}
        >
          {isExpanded && email ? 'SUBMIT' : 'SIGN UP'}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-error-500 text-sm bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
          {error}
        </p>
      )}
    </div>
  )
}
