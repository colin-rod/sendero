'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import {
  Shield,
  Cloud,
  Activity,
  Plane,
  Backpack,
  FileText,
  CreditCard,
  LucideIcon,
} from 'lucide-react';

/**
 * FAQ Accordion Component
 *
 * Displays FAQ sections with expand/collapse functionality
 * Supports multilingual content via next-intl
 */

// Icon mapping for sections
const SECTION_ICONS: Record<string, LucideIcon> = {
  safety: Shield,
  weather: Cloud,
  fitness: Activity,
  transport: Plane,
  gear: Backpack,
  insurance: FileText,
  payments: CreditCard,
};

interface FAQAccordionProps {
  /** Section keys to display */
  sections: readonly string[];
}

export function FAQAccordion({ sections }: FAQAccordionProps) {
  const t = useTranslations('faqPage');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Check if all items are expanded
  const allExpanded = expandedItems.length === getTotalQuestions();

  function getTotalQuestions(): number {
    return sections.reduce((total, sectionKey) => {
      const questions = t.raw(`sections.${sectionKey}.questions`) as Array<{ question: string; answer: string }>;
      return total + (Array.isArray(questions) ? questions.length : 0);
    }, 0);
  }

  function handleExpandAll() {
    const allItemIds: string[] = [];
    sections.forEach((sectionKey) => {
      const questions = t.raw(`sections.${sectionKey}.questions`) as Array<{ question: string; answer: string }>;
      if (Array.isArray(questions)) {
        questions.forEach((_, index) => {
          allItemIds.push(`${sectionKey}-${index}`);
        });
      }
    });
    setExpandedItems(allItemIds);
  }

  function handleCollapseAll() {
    setExpandedItems([]);
  }

  return (
    <div className="space-y-6">
      {/* Expand/Collapse All Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={allExpanded ? handleCollapseAll : handleExpandAll}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded px-2 py-1"
        >
          {allExpanded ? t('collapseAll') : t('expandAll')}
        </button>
      </div>

      {/* FAQ Sections */}
      {sections.map((sectionKey) => {
        const IconComponent = SECTION_ICONS[sectionKey] || Shield;
        const questions = t.raw(`sections.${sectionKey}.questions`) as Array<{ question: string; answer: string }>;

        if (!Array.isArray(questions) || questions.length === 0) {
          return null;
        }

        return (
          <div key={sectionKey} className="space-y-3">
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <IconComponent className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <h2 className="text-h3 font-semibold text-foreground">
                {t(`sections.${sectionKey}.title`)}
              </h2>
            </div>

            {/* Section Questions */}
            <Accordion
              type="multiple"
              value={expandedItems}
              onValueChange={(value) => setExpandedItems(value as string[])}
            >
              {questions.map((qa, index) => {
                const itemId = `${sectionKey}-${index}`;
                const isPlaceholder = qa.question.includes('[PLACEHOLDER]') || qa.answer.includes('[TODO');

                return (
                  <AccordionItem key={itemId} value={itemId}>
                    <AccordionTrigger
                      className={isPlaceholder ? 'bg-amber-50 hover:bg-amber-100' : ''}
                    >
                      {qa.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className={isPlaceholder ? 'bg-amber-50/50 italic' : ''}
                    >
                      {qa.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
