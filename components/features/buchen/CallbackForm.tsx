'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { validateCallbackForm, type ValidationError } from '@/lib/utils/bookingValidation';
import type { CallbackFormData } from '@/lib/types/database';
import { CheckCircle2 } from 'lucide-react';
import posthog from 'posthog-js';

export function CallbackForm() {
  const t = useTranslations('buchenPage.callback');
  const tValidation = useTranslations('validation');
  const locale = useLocale();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setGeneralError('');
    setIsSuccess(false);

    const formData: Partial<CallbackFormData> = {
      name,
      phone,
      email,
      message: message || undefined,
    };

    const validationErrors = validateCallbackForm(formData);
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
      const response = await fetch(`/${locale}/api/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData as CallbackFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        setGeneralError(data.error || tValidation('generalError'));
        return;
      }

      posthog.capture('callback_requested', { locale });
      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Form submission error:', error);
      setGeneralError(tValidation('networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="bordered" padding="lg">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-2 text-h3">{t('heading')}</h2>
        <p className="mb-6 text-body text-muted-foreground">{t('subtitle')}</p>

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
            label={t('labels.phone')}
            type="tel"
            placeholder={t('placeholders.phone')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
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

          <Textarea
            label={t('labels.message')}
            placeholder={t('placeholders.message')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={errors.message}
            rows={2}
            disabled={isSubmitting}
          />

          {generalError && (
            <div className="rounded-md bg-red-50 p-4 text-body text-red-600">
              {generalError}
            </div>
          )}

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
          </Button>
        </div>
      </form>
    </Card>
  );
}
