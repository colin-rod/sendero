'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/lib/i18n/routing';
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
  const t = useTranslations('form');
  const tValidation = useTranslations('validation');
  const locale = useLocale();
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
        // Map error messages to translated strings
        const errorKey = error.field;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const translatedMessage = tValidation(error.message as any) || error.message;
        errorMap[errorKey] = translatedMessage;
      });
      setErrors(errorMap);
      return;
    }

    // Submit to API
    setIsSubmitting(true);

    try {
      const response = await fetch(`/${locale}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData as WaitlistFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ email: tValidation('emailDuplicate') });
        } else {
          setGeneralError(data.error || tValidation('generalError'));
        }
        return;
      }

      // Success - redirect to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      setGeneralError(tValidation('networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-white p-8 shadow-lg">
      <div className="space-y-6">
        {/* Email */}
        <Input
          label={t('labels.email')}
          type="email"
          placeholder={t('placeholders.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        {/* Tour Duration */}
        <RadioGroup
          name="tourDuration"
          label={t('labels.tourDuration')}
          value={tourDuration}
          onChange={(value) => setTourDuration(value as TourDuration)}
          error={errors.tourDuration}
          options={[
            {
              value: 'one_day',
              label: t('tourDuration.oneDay.label'),
              description: t('tourDuration.oneDay.description')
            },
            {
              value: 'weekend',
              label: t('tourDuration.weekend.label'),
              description: t('tourDuration.weekend.description')
            },
            {
              value: 'one_week',
              label: t('tourDuration.oneWeek.label'),
              description: t('tourDuration.oneWeek.description')
            },
          ]}
        />

        {/* Interest Types */}
        <div>
          <label className="label mb-3 block text-body">
            {t('labels.interestTypes')}
          </label>
          <div className="space-y-2">
            <Checkbox
              label={t('interests.hiking')}
              checked={interestTypes.includes('hike')}
              onChange={(e) => handleInterestChange('hike', e.target.checked)}
            />
            <Checkbox
              label={t('interests.biking')}
              checked={interestTypes.includes('bike')}
              onChange={(e) => handleInterestChange('bike', e.target.checked)}
            />
            <Checkbox
              label={t('interests.eBike')}
              checked={interestTypes.includes('e_bike')}
              onChange={(e) => handleInterestChange('e_bike', e.target.checked)}
            />
            <Checkbox
              label={t('interests.womenOnly')}
              checked={interestTypes.includes('women_only')}
              onChange={(e) => handleInterestChange('women_only', e.target.checked)}
            />
            <Checkbox
              label={t('interests.coffeeFarm')}
              checked={interestTypes.includes('coffee_farm')}
              onChange={(e) => handleInterestChange('coffee_farm', e.target.checked)}
            />
          </div>
          {errors.interestTypes && (
            <p className="mt-1 text-body text-red-500">{errors.interestTypes}</p>
          )}
        </div>

        {/* Fitness Level */}
        <RadioGroup
          name="fitnessLevel"
          label={t('labels.fitnessLevel')}
          value={fitnessLevel}
          onChange={(value) => setFitnessLevel(value as FitnessLevel)}
          error={errors.fitnessLevel}
          options={[
            {
              value: 'beginner',
              label: t('fitnessLevel.beginner.label'),
              description: t('fitnessLevel.beginner.description')
            },
            {
              value: 'moderate',
              label: t('fitnessLevel.moderate.label'),
              description: t('fitnessLevel.moderate.description')
            },
          ]}
        />

        {/* Travel Timeline */}
        <RadioGroup
          name="travelTimeline"
          label={t('labels.travelTimeline')}
          value={travelTimeline}
          onChange={(value) => setTravelTimeline(value as TravelTimeline)}
          error={errors.travelTimeline}
          options={[
            { value: 'next_3_months', label: t('travelTimeline.next3Months') },
            { value: 'next_6_months', label: t('travelTimeline.next6Months') },
            { value: 'later', label: t('travelTimeline.later') },
          ]}
        />

        {/* General Error */}
        {generalError && (
          <div className="rounded-md bg-red-50 p-4 text-body text-red-600">
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
          {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
        </Button>

        <p className="text-center text-body text-muted-foreground">
          {t('helperText')}
        </p>
      </div>
    </form>
  );
}
