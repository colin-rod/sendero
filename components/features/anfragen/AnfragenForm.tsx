'use client';

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import posthog from 'posthog-js';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Link } from '@/lib/i18n/routing';
import { isValidEmail } from '@/lib/utils/validation';
import { parseRequestMonths } from '@/lib/utils/bookingValidation';
import {
  REQUEST_MONTHS,
  RIDING_LEVELS,
  TRAVELER_OPTIONS,
  type BookingFormData,
  type RequestMonth,
  type RidingLevel,
  type Travelers,
} from '@/lib/types/database';
import { SelectChips, type ChipOption } from './SelectChips';
import { LevelInfo } from './LevelInfo';
import { Signature } from './Signature';

const CONTACT_EMAIL = 'julian@senderobiketrails.com';

export function AnfragenForm() {
  const t = useTranslations('anfragenPage.form');
  const tSuccess = useTranslations('anfragenPage.success');
  const locale = useLocale();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [months, setMonths] = useState<RequestMonth[]>([]);
  const [travelers, setTravelers] = useState<Travelers[]>([]);
  const [level, setLevel] = useState<RidingLevel[]>([]);
  const [message, setMessage] = useState('');
  const [mailingList, setMailingList] = useState(false);
  const [company, setCompany] = useState('');

  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitted, setSubmitted] = useState<{ firstName: string; mailingList: boolean } | null>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Optional prefill from trip cards, e.g. /anfragen?monat=2027-04
  useEffect(() => {
    const prefill = parseRequestMonths(new window.URLSearchParams(window.location.search).get('monat'));
    if (prefill.length > 0) setMonths(prefill);
  }, []);

  useEffect(() => {
    if (!submitted || !successRef.current) return;
    successRef.current.focus({ preventScroll: true });
    successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [submitted]);

  const monthOptions: ChipOption<RequestMonth>[] = [
    ...REQUEST_MONTHS.map((value) => ({ value, label: t(`months.${value}`) })),
    { value: 'flexible', label: t('months.flexible'), exclusive: true },
  ];

  const travelerOptions: ChipOption<Travelers>[] = TRAVELER_OPTIONS.map((value) => ({
    value,
    label: value === '1' ? t('travelers.1') : value,
  }));

  const levelOptions: ChipOption<RidingLevel>[] = RIDING_LEVELS.map((value) => ({
    value,
    label: t(`levels.${value}.title`),
  }));

  const levelInfoOptions = RIDING_LEVELS.map((value) => ({
    value,
    title: t(`levels.${value}.title`),
    text: t(`levels.${value}.text`),
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(false);

    const trimmedName = firstName.trim();
    const trimmedEmail = email.trim();
    const nextErrors: typeof errors = {};
    if (!trimmedName) nextErrors.firstName = t('errors.firstNameRequired');
    if (!isValidEmail(trimmedEmail)) nextErrors.email = t('errors.emailInvalid');
    setErrors(nextErrors);

    if (nextErrors.firstName) return firstNameRef.current?.focus();
    if (nextErrors.email) return emailRef.current?.focus();

    const payload: BookingFormData & { locale: string } = {
      firstName: trimmedName,
      email: trimmedEmail,
      months,
      travelers: travelers[0] ?? null,
      level: level[0] ?? null,
      message: message.trim(),
      mailingList,
      company,
      locale,
      source: 'anfrage-page',
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`/${locale}/api/anfragen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setSubmitError(true);
        return;
      }

      posthog.capture('booking_submitted', {
        locale,
        months,
        travelers: payload.travelers,
        level: payload.level,
        mailingList,
      });
      setSubmitted({ firstName: trimmedName.split(/\s+/)[0], mailingList });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="anfrage"
      className="mx-auto max-w-[720px] scroll-mt-28 rounded-[10px] bg-white px-6 py-14 sm:px-[clamp(24px,6vw,64px)]"
    >
      {submitted ? (
        <div ref={successRef} tabIndex={-1} className="success-reveal flex flex-col gap-[22px] outline-none" aria-live="polite">
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-primary-500">
            {tSuccess('eyebrow')}
          </p>
          <h2 className="text-[40px] font-bold leading-[1.1] text-foreground">
            {tSuccess('title', { name: submitted.firstName })}
          </h2>
          <p className="text-lg leading-[1.7] text-gray-800">{tSuccess('message')}</p>
          {submitted.mailingList && (
            <p className="text-lg leading-[1.7] text-gray-800">{tSuccess('mailingList')}</p>
          )}
          <p className="text-lg leading-[1.7] text-gray-800">{tSuccess('closing')}</p>
          <Signature className="success-signature" />
        </div>
      ) : (
        <>
          <h2 className="text-h2 mb-11 font-normal leading-[1.4] text-foreground">
            {t('heading')}
          </h2>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-9">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                ref={firstNameRef}
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                label={t('labels.firstName')}
                placeholder={t('placeholders.firstName')}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName}
                disabled={isSubmitting}
                required
                className="h-[54px] border-gray-400 bg-white px-4 text-base"
              />
              <Input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                label={t('labels.email')}
                placeholder={t('placeholders.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                disabled={isSubmitting}
                required
                className="h-[54px] border-gray-400 bg-white px-4 text-base"
              />
            </div>

            <fieldset className="flex flex-col gap-3.5" aria-describedby="months-hint">
              <legend className="label mb-3.5 text-label">{t('labels.months')}</legend>
              <SelectChips options={monthOptions} selected={months} onChange={setMonths} multi disabled={isSubmitting} />
              <p id="months-hint" className="text-base leading-[26px] text-gray-700">
                {t('hints.months')}
              </p>
            </fieldset>

            <fieldset className="flex flex-col gap-3.5" aria-describedby="travelers-hint">
              <legend className="label mb-3.5 text-label">{t('labels.travelers')}</legend>
              <SelectChips
                options={travelerOptions}
                selected={travelers}
                onChange={setTravelers}
                disabled={isSubmitting}
              />
              <p id="travelers-hint" className="text-base leading-[26px] text-gray-700">
                {t('hints.travelers')}
              </p>
            </fieldset>

            <div role="group" aria-labelledby="level-label" aria-describedby="level-hint" className="flex flex-col gap-3.5">
              <div className="flex items-center gap-1">
                <span id="level-label" className="label text-label">
                  {t('labels.level')}
                </span>
                <LevelInfo
                  options={levelInfoOptions}
                  selected={level[0] ?? null}
                  onSelect={(value) => setLevel([value])}
                  triggerLabel={t('levelInfo.trigger')}
                  title={t('levelInfo.title')}
                  closeLabel={t('levelInfo.close')}
                />
              </div>
              <SelectChips options={levelOptions} selected={level} onChange={setLevel} disabled={isSubmitting} />
              <p id="level-hint" className="text-base leading-[26px] text-gray-700">
                {t('hints.level')}
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <label htmlFor="message" className="label text-label">
                {t('labels.message')}
              </label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                placeholder={t('placeholders.message')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
                className="border-gray-400 bg-white px-4 py-3.5 text-base leading-[26px]"
              />
            </div>

            <label htmlFor="mailingList" className="flex cursor-pointer items-start gap-3.5">
              <span className="relative mt-0.5 flex h-[22px] w-[22px] flex-shrink-0">
                <input
                  id="mailingList"
                  name="mailingList"
                  type="checkbox"
                  checked={mailingList}
                  onChange={(e) => setMailingList(e.target.checked)}
                  disabled={isSubmitting}
                  className="peer h-[22px] w-[22px] cursor-pointer appearance-none rounded-[4px] border border-silver bg-white transition-colors hover:border-primary-500 checked:border-primary-500 checked:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <Check
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 m-auto hidden h-4 w-4 text-white peer-checked:block"
                  strokeWidth={3}
                />
              </span>
              <span className="text-base leading-[26px] text-foreground">
                {t('mailingList.label')} <span className="text-gray-700">{t('mailingList.note')}</span>
              </span>
            </label>

            {/* Honeypot (spam). Hidden from humans and screen readers. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />

            <div>
              <Button type="submit" variant="hero-cta" disabled={isSubmitting} className="!h-[60px] w-full font-bold">
                {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
              </Button>
              <p className="mt-3.5 text-center text-base leading-[26px] text-gray-700">
                {t('legal.response')}
                <br />
                {t('legal.text')}{' '}
                <Link href="/datenschutz" className="text-primary-500 underline">
                  {t('legal.privacy')}
                </Link>
              </p>
              {submitError && (
                <p role="alert" className="mt-4 text-caption text-red-600">
                  {t.rich('submitError', {
                    mail: (chunks) => (
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
