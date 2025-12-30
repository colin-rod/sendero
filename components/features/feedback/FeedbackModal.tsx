'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Bug, Sparkles, MessageCircle, Palette, Upload, X } from 'lucide-react';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogClose } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { submitFeedback, validateFeedback } from '@/lib/utils/feedback';
import type { FeedbackCategory, FeedbackFormData } from '@/lib/types/feedback';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORY_ICONS = {
  'bug-report': Bug,
  'feature-request': Sparkles,
  'general': MessageCircle,
  'ux-issue': Palette,
} as const;

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const t = useTranslations('feedback');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<FeedbackCategory | ''>('');
  const [message, setMessage] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle screenshot selection
  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Clean up previous preview URL if it exists
      if (screenshotPreview) {
        URL.revokeObjectURL(screenshotPreview);
      }

      setScreenshot(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setScreenshotPreview(previewUrl);
      setErrors((prev) => ({ ...prev, screenshot: '' }));
    }
  };

  // Handle paste event for screenshots
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          // Clean up previous preview URL if it exists
          if (screenshotPreview) {
            URL.revokeObjectURL(screenshotPreview);
          }

          setScreenshot(file);
          // Create preview URL
          const previewUrl = URL.createObjectURL(file);
          setScreenshotPreview(previewUrl);
          setErrors((prev) => ({ ...prev, screenshot: '' }));
        }
      }
    }
  };

  // Remove screenshot
  const removeScreenshot = () => {
    // Revoke preview URL to avoid memory leaks
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
    }
    setScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: Partial<FeedbackFormData> = {
      email: email.trim() || undefined,
      category: category || undefined,
      message,
      screenshot,
    };

    // Validate
    const validation = validateFeedback(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // Clear errors if validation passed
    setErrors({});

    setIsSubmitting(true);

    try {
      const result = await submitFeedback(formData as FeedbackFormData, locale);

      if (result.success) {
        setSubmitted(true);
        // Auto-close after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setErrors({ general: result.error || t('errors.submitFailed') });
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      setErrors({ general: t('errors.networkError') });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    onOpenChange(false);
    // Cleanup preview URL
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
    }
    // Reset form after animation
    setTimeout(() => {
      setEmail('');
      setCategory('');
      setMessage('');
      setScreenshot(null);
      setScreenshotPreview(null);
      setErrors({});
      setSubmitted(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogClose onClick={handleClose} />
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
      </DialogHeader>

      {submitted ? (
        <DialogContent>
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
              <svg
                className="h-8 w-8 text-success-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-2xl font-medium text-success-700">{t('success.title')}</p>
            <p className="mt-2 text-base text-muted-foreground">{t('success.message')}</p>
          </div>
        </DialogContent>
      ) : (
        <form onSubmit={handleSubmit} onPaste={handlePaste} noValidate>
          <DialogContent>
            <div className="space-y-4">
              {/* Category Selection */}
              <div>
                <label className="label mb-3 block text-label">
                  {t('fields.category.label')} <span className="text-error-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['general', 'feature-request', 'bug-report', 'ux-issue'] as const).map((cat) => {
                    const Icon = CATEGORY_ICONS[cat];
                    const isSelected = category === cat;

                    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCategory(cat);
                      setErrors((prev) => ({ ...prev, category: '' }));
                    };

                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={handleClick}
                        className="feedback-category-button"
                        data-selected={isSelected}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{t(`categories.${cat}`)}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.category && (
                  <p className="mt-1 text-label text-error-500">{errors.category}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="label mb-2 block text-label">
                  {t('fields.message.label')} <span className="text-error-500">*</span>
                </label>
                <Textarea
                  placeholder={t('fields.message.placeholder')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={errors.message}
                  rows={5}
                />
              </div>

              {/* Screenshot Upload */}
              <div>
                <label className="label mb-2 block text-label">{t('fields.screenshot.label')}</label>
                {screenshot ? (
                  <div className="space-y-2">
                    {/* Preview */}
                    {screenshotPreview && (
                      <div className="relative overflow-hidden rounded-md border border-border">
                        <img
                          src={screenshotPreview}
                          alt="Screenshot preview"
                          className="max-h-48 w-full object-contain bg-muted"
                        />
                      </div>
                    )}
                    {/* File info */}
                    <div className="flex items-center gap-2 rounded-md border border-border bg-muted p-3">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="flex-1 truncate text-sm text-foreground">
                        {screenshot.name}
                      </span>
                      <button
                        type="button"
                        onClick={removeScreenshot}
                        className="rounded p-1 text-muted-foreground hover:bg-gray-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-dashed border-border bg-muted px-4 py-3 text-muted-foreground transition-colors hover:border-gray-400 hover:bg-gray-100"
                    >
                      <Upload className="h-5 w-5" />
                      <span className="text-sm">{t('fields.screenshot.placeholder')}</span>
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t('fields.screenshot.hint')}
                    </p>
                  </div>
                )}
                {errors.screenshot && (
                  <p className="mt-1 text-label text-error-500">{errors.screenshot}</p>
                )}
              </div>

              {/* Email (Optional) */}
              <Input
                type="email"
                label={t('fields.email.label')}
                placeholder={t('fields.email.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              {/* General Error */}
              {errors.general && (
                <div className="rounded-md bg-error-50 p-3 text-sm text-error-700">
                  {errors.general}
                </div>
              )}
            </div>
          </DialogContent>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              {t('actions.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting} loading={isSubmitting}>
              {isSubmitting ? t('actions.submitting') : t('actions.submit')}
            </Button>
          </DialogFooter>
        </form>
      )}
    </Dialog>
  );
}
