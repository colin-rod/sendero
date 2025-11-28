'use client';

import React, { useState, useMemo } from 'react';
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
  Search,
  X,
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
  const [searchQuery, setSearchQuery] = useState('');

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

  function clearSearch() {
    setSearchQuery('');
  }

  // Filter questions based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return sections.map((sectionKey) => ({
        sectionKey,
        questions: t.raw(`sections.${sectionKey}.questions`) as Array<{ question: string; answer: string }>,
      }));
    }

    const query = searchQuery.toLowerCase();
    return sections
      .map((sectionKey) => {
        const questions = t.raw(`sections.${sectionKey}.questions`) as Array<{ question: string; answer: string }>;
        if (!Array.isArray(questions)) return null;

        const filtered = questions.filter((qa) => {
          const questionMatch = qa.question.toLowerCase().includes(query);
          const answerMatch = qa.answer.toLowerCase().includes(query);
          return questionMatch || answerMatch;
        });

        return filtered.length > 0 ? { sectionKey, questions: filtered } : null;
      })
      .filter((section): section is { sectionKey: string; questions: Array<{ question: string; answer: string }> } => section !== null);
  }, [searchQuery, sections, t]);

  // Auto-expand all when searching
  React.useEffect(() => {
    if (searchQuery.trim()) {
      const allItemIds: string[] = [];
      filteredSections.forEach(({ sectionKey, questions }) => {
        questions.forEach((_, index) => {
          allItemIds.push(`${sectionKey}-${index}`);
        });
      });
      setExpandedItems(allItemIds);
    }
  }, [searchQuery, filteredSections]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            placeholder={t('search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-10 text-body transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={t('search.ariaLabel')}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={t('search.clearAriaLabel')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-muted-foreground">
            {filteredSections.length > 0
              ? t('search.results', { count: filteredSections.reduce((sum, s) => sum + s.questions.length, 0) })
              : t('search.noResults')}
          </p>
        )}
      </div>

      {/* Expand/Collapse All Button */}
      {!searchQuery && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={allExpanded ? handleCollapseAll : handleExpandAll}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded px-2 py-1"
          >
            {allExpanded ? t('collapseAll') : t('expandAll')}
          </button>
        </div>
      )}

      {/* FAQ Sections */}
      {filteredSections.length > 0 ? (
        filteredSections.map(({ sectionKey, questions }) => {
          const IconComponent = SECTION_ICONS[sectionKey] || Shield;

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
        })
      ) : (
        <div className="rounded-lg border border-border bg-muted/20 p-8 text-center">
          <Search className="mx-auto mb-3 h-12 w-12 text-muted-foreground" aria-hidden="true" />
          <p className="text-body font-medium text-foreground">{t('search.noResults')}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t('search.tryDifferent')}</p>
        </div>
      )}
    </div>
  );
}
