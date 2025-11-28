'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { validateContactForm, type ValidationError } from '@/lib/utils/contactValidation';
import type { ContactFormData, ContactSubject } from '@/lib/types/database';
import { CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const t = useTranslations('contactPage.form');
  const tValidation = useTranslations('validation');
  const locale = useLocale();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<ContactSubject | ''>('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors and success state
    setErrors({});
    setGeneralError('');
    setIsSuccess(false);

    // Prepare form data
    const formData: Partial<ContactFormData> = {
      name,
      email,
      subject: subject || undefined,
      message,
    };

    // Validate
    const validationErrors = validateContactForm(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error: ValidationError) => {
        // Map error messages to translated strings
        const errorKey = error.field;
        const translatedMessage = tValidation(error.message as any) || error.message;
        errorMap[errorKey] = translatedMessage;
      });
      setErrors(errorMap);
      return;
    }

    // Submit to API
    setIsSubmitting(true);

    try {
      const response = await fetch(`/${locale}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData as ContactFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        setGeneralError(data.error || tValidation('generalError'));
        return;
      }

      // Success - show success message and clear form
      setIsSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
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
        {/* Success Message */}
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

        {/* Name */}
        <Input
          label={t('labels.name')}
          type="text"
          placeholder={t('placeholders.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          disabled={isSubmitting}
        />

        {/* Email */}
        <Input
          label={t('labels.email')}
          type="email"
          placeholder={t('placeholders.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={isSubmitting}
        />

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="label mb-2 block text-label">
            {t('labels.subject')}
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value as ContactSubject)}
            className="input w-full"
            disabled={isSubmitting}
          >
            <option value="">{t('placeholders.subject')}</option>
            <option value="general">{t('subjects.general')}</option>
            <option value="tour">{t('subjects.tour')}</option>
            <option value="custom">{t('subjects.custom')}</option>
            <option value="feedback">{t('subjects.feedback')}</option>
          </select>
          {errors.subject && (
            <p className="mt-1 text-label text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <Textarea
          label={t('labels.message')}
          placeholder={t('placeholders.message')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={errors.message}
          rows={6}
          disabled={isSubmitting}
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
      </div>
    </form>
  );
}
