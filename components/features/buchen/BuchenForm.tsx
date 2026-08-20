'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { validateBookingForm, type ValidationError } from '@/lib/utils/bookingValidation';
import type { BookingFormData, TechnicalLevel, TourDate } from '@/lib/types/database';
import { CheckCircle2 } from 'lucide-react';
import posthog from 'posthog-js';

interface LevelOption {
  value: TechnicalLevel;
  label: string;
  technik: string;
  kondition: string;
}

export function BuchenForm() {
  const t = useTranslations('buchenPage.form');
  const tValidation = useTranslations('validation');
  const locale = useLocale();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [travelers, setTravelers] = useState('');
  const [tourDate, setTourDate] = useState<TourDate | ''>('');
  const [technicalLevel, setTechnicalLevel] = useState<TechnicalLevel | ''>('');
  const [message, setMessage] = useState('');

  const levels = t.raw('levels') as LevelOption[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setGeneralError('');
    setIsSuccess(false);

    const formData: Partial<BookingFormData> = {
      name,
      email,
      country,
      travelers: travelers ? Number(travelers) : undefined,
      tourDate,
      technicalLevel,
      message: message || undefined,
    };

    const validationErrors = validateBookingForm(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error: ValidationError) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const translatedMessage = tValidation(error.message as any) || error.message;
        errorMap[error.field] = translatedMessage;
      });
      setErrors(errorMap);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/${locale}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData as BookingFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        setGeneralError(data.error || tValidation('generalError'));
        return;
      }

      posthog.capture('booking_submitted', { locale, tour_date: tourDate, technical_level: technicalLevel });
      setIsSuccess(true);
      setName('');
      setEmail('');
      setCountry('');
      setTravelers('');
      setTourDate('');
      setTechnicalLevel('');
      setMessage('');
    } catch (error) {
      console.error('Form submission error:', error);
      setGeneralError(tValidation('networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-white p-6 shadow-lg md:p-8">
      <h2 className="mb-6 text-h3">{t('heading')}</h2>

      <div className="space-y-6">
        {isSuccess && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-label font-semibold text-green-800">{t('success.title')}</h3>
                <p className="mt-1 text-body text-green-700">{t('success.message')}</p>
              </div>
            </div>
          </div>
        )}

        <Input
          label={t('labels.name')}
          type="text"
          placeholder={t('placeholders.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          disabled={isSubmitting}
        />

        <Input
          label={t('labels.email')}
          type="email"
          placeholder={t('placeholders.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={isSubmitting}
        />

        <Input
          label={t('labels.country')}
          type="text"
          placeholder={t('placeholders.country')}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          error={errors.country}
          disabled={isSubmitting}
        />

        <Input
          label={t('labels.travelers')}
          type="number"
          min={1}
          placeholder={t('placeholders.travelers')}
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          error={errors.travelers}
          disabled={isSubmitting}
        />

        <Select
          label={t('labels.date')}
          value={tourDate}
          onChange={(e) => setTourDate(e.target.value as TourDate)}
          error={errors.tourDate}
          disabled={isSubmitting}
          options={[
            { value: '', label: t('placeholders.date') },
            { value: '2027-04', label: t('dateOptions.april') },
            { value: '2027-11', label: t('dateOptions.november') },
          ]}
        />

        {/* Technical Level / Kondition */}
        <div className="w-full">
          <div className="mb-3 flex items-center gap-1.5">
            <label className="label block text-label">{t('labels.technicalLevel')}</label>
            <InfoTooltip label={t('labels.technicalLevel')} panelClassName="w-72">
              <div className="space-y-3">
                {levels.map((level) => (
                  <div key={level.value}>
                    <p className="font-semibold text-foreground">{level.label}</p>
                    <p>
                      <span className="font-medium">{t('levelInfo.technik')}:</span>{' '}
                      {level.technik}
                    </p>
                    <p>
                      <span className="font-medium">{t('levelInfo.kondition')}:</span>{' '}
                      {level.kondition}
                    </p>
                  </div>
                ))}
              </div>
            </InfoTooltip>
          </div>
          <div className="space-y-2">
            {levels.map((level) => (
              <div key={level.value} className="flex items-start">
                <input
                  type="radio"
                  id={`technicalLevel-${level.value}`}
                  name="technicalLevel"
                  value={level.value}
                  checked={technicalLevel === level.value}
                  onChange={(e) => setTechnicalLevel(e.target.value as TechnicalLevel)}
                  disabled={isSubmitting}
                  className="mt-0.5 h-4 w-4 border-border text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                />
                <label
                  htmlFor={`technicalLevel-${level.value}`}
                  className="ml-2 cursor-pointer text-label"
                >
                  {level.label}
                </label>
              </div>
            ))}
          </div>
          {errors.technicalLevel && (
            <p className="mt-1 text-label text-red-500">{errors.technicalLevel}</p>
          )}
        </div>

        <Textarea
          label={t('labels.message')}
          placeholder={t('placeholders.message')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={errors.message}
          rows={3}
          disabled={isSubmitting}
        />

        {generalError && (
          <div className="rounded-md bg-red-50 p-4 text-body text-red-600">
            {generalError}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
        </Button>
      </div>
    </form>
  );
}
