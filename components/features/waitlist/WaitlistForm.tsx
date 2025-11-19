'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import { validateWaitlistForm, type ValidationError } from '@/lib/utils/validation';
import type {
  WaitlistFormData,
  TourDuration,
  InterestType,
  FitnessLevel,
  TravelTimeline,
} from '@/lib/types/database';

export function WaitlistForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>('');

  // Form state
  const [email, setEmail] = useState('');
  const [tourDuration, setTourDuration] = useState<TourDuration | ''>('');
  const [interestTypes, setInterestTypes] = useState<InterestType[]>([]);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel | ''>('');
  const [travelTimeline, setTravelTimeline] = useState<TravelTimeline | ''>('');

  // Handle interest type checkbox changes
  const handleInterestChange = (interest: InterestType, checked: boolean) => {
    setInterestTypes((prev) =>
      checked ? [...prev, interest] : prev.filter((i) => i !== interest)
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});
    setGeneralError('');

    // Prepare form data
    const formData: Partial<WaitlistFormData> = {
      email,
      tourDuration: tourDuration || undefined,
      interestTypes,
      fitnessLevel: fitnessLevel || undefined,
      travelTimeline: travelTimeline || undefined,
    };

    // Validate
    const validationErrors = validateWaitlistForm(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error: ValidationError) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    // Submit to API
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData as WaitlistFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ email: 'This email is already on the waitlist' });
        } else {
          setGeneralError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      // Success - redirect to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      setGeneralError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-white p-8 shadow-lg">
      <div className="space-y-6">
        {/* Email */}
        <Input
          label="Email address *"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        {/* Tour Duration */}
        <RadioGroup
          name="tourDuration"
          label="Preferred tour duration *"
          value={tourDuration}
          onChange={(value) => setTourDuration(value as TourDuration)}
          error={errors.tourDuration}
          options={[
            { value: 'one_day', label: '1 Day', description: 'Perfect for a quick adventure' },
            { value: 'weekend', label: 'Weekend (2-3 days)', description: 'Explore more at a relaxed pace' },
            { value: 'one_week', label: '1 Week', description: 'Full immersion experience' },
          ]}
        />

        {/* Interest Types */}
        <div>
          <label className="label mb-3 block text-sm font-medium">
            What interests you? (select all that apply) *
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Hiking"
              checked={interestTypes.includes('hike')}
              onChange={(e) => handleInterestChange('hike', e.target.checked)}
            />
            <Checkbox
              label="Biking"
              checked={interestTypes.includes('bike')}
              onChange={(e) => handleInterestChange('bike', e.target.checked)}
            />
            <Checkbox
              label="E-Bike (electric bike)"
              checked={interestTypes.includes('e_bike')}
              onChange={(e) => handleInterestChange('e_bike', e.target.checked)}
            />
            <Checkbox
              label="Women-only tours"
              checked={interestTypes.includes('women_only')}
              onChange={(e) => handleInterestChange('women_only', e.target.checked)}
            />
            <Checkbox
              label="Coffee farm experiences"
              checked={interestTypes.includes('coffee_farm')}
              onChange={(e) => handleInterestChange('coffee_farm', e.target.checked)}
            />
          </div>
          {errors.interestTypes && (
            <p className="mt-1 text-sm text-red-500">{errors.interestTypes}</p>
          )}
        </div>

        {/* Fitness Level */}
        <RadioGroup
          name="fitnessLevel"
          label="Fitness level *"
          value={fitnessLevel}
          onChange={(value) => setFitnessLevel(value as FitnessLevel)}
          error={errors.fitnessLevel}
          options={[
            { value: 'beginner', label: 'Beginner', description: 'New to cycling or hiking' },
            { value: 'moderate', label: 'Moderate', description: 'Some experience, comfortable with physical activity' },
          ]}
        />

        {/* Travel Timeline */}
        <RadioGroup
          name="travelTimeline"
          label="When are you planning to travel? *"
          value={travelTimeline}
          onChange={(value) => setTravelTimeline(value as TravelTimeline)}
          error={errors.travelTimeline}
          options={[
            { value: 'next_3_months', label: 'Next 3 months' },
            { value: 'next_6_months', label: 'Next 6 months' },
            { value: 'later', label: 'Just exploring for now' },
          ]}
        />

        {/* General Error */}
        {generalError && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
            {generalError}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          We respect your privacy. No spam, just updates about tours.
        </p>
      </div>
    </form>
  );
}
