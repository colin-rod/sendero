'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FeedbackModal } from './FeedbackModal';

/**
 * Floating Feedback Button
 *
 * A fixed-position button that appears on all pages, allowing users to
 * submit feedback from anywhere in the application.
 *
 * Features:
 * - Fixed bottom-right positioning
 * - Opens feedback modal on click
 * - Accessible with keyboard navigation
 * - Hover and focus states
 */
export function FloatingFeedbackButton() {
  const t = useTranslations('feedback');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={t('button.ariaLabel')}
        title={t('button.title')}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <FeedbackModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
