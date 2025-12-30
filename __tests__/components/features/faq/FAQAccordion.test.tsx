/**
 * Component Tests: FAQAccordion
 *
 * Comprehensive tests for the FAQAccordion component including:
 * - Rendering with sections and icons
 * - Search functionality and filtering
 * - Expand/Collapse All functionality
 * - Auto-expansion on search
 * - Placeholder content detection
 * - Translation integration
 * - Accessibility features
 * - Edge cases and state management
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQAccordion } from '@/components/features/faq/FAQAccordion';

// Mock translation data - defined outside to maintain stable reference
const mockTranslations: Record<string, unknown> = {
  expandAll: 'Expand All',
  collapseAll: 'Collapse All',
  search: {
    placeholder: 'Search FAQs...',
    ariaLabel: 'Search frequently asked questions',
    clearAriaLabel: 'Clear search',
    results: '{{count}} results',
    noResults: 'No results found',
    tryDifferent: 'Try different keywords',
  },
  sections: {
    safety: {
      title: 'Safety',
      questions: [
        { question: 'Is it safe to cycle in Colombia?', answer: 'Yes, our guided tours prioritize safety.' },
        { question: 'What safety equipment is provided?', answer: 'Helmets, first aid kits, and safety gear.' },
      ],
    },
    weather: {
      title: 'Weather',
      questions: [
        { question: 'What is the weather like?', answer: 'Mild and pleasant year-round.' },
      ],
    },
    fitness: {
      title: 'Fitness',
      questions: [
        { question: 'Do I need to be fit?', answer: 'Basic fitness level is recommended.' },
        { question: 'Are there difficulty levels?', answer: 'Yes, we offer beginner and intermediate routes.' },
      ],
    },
    transport: {
      title: 'Transportation',
      questions: [
        { question: 'How do I get there?', answer: 'We provide transportation from Pereira.' },
      ],
    },
    gear: {
      title: 'Gear',
      questions: [
        { question: 'What should I bring?', answer: 'Comfortable clothes and water bottle.' },
      ],
    },
    insurance: {
      title: 'Insurance',
      questions: [
        { question: 'Do I need insurance?', answer: 'Travel insurance is recommended.' },
      ],
    },
    payments: {
      title: 'Payments',
      questions: [
        { question: 'What payment methods accepted?', answer: 'We accept credit cards and cash.' },
      ],
    },
    placeholder: {
      title: 'Placeholder Section',
      questions: [
        { question: 'This is a [PLACEHOLDER] question', answer: 'This is a placeholder answer.' },
        { question: 'Another question', answer: '[TODO: Add answer here]' },
      ],
    },
    'empty-section': {
      title: 'Empty Section',
      questions: [],
    },
    'unmapped-section': {
      title: 'Unmapped Section',
      questions: [
        { question: 'Test question', answer: 'Test answer' },
      ],
    },
  },
};

const getNestedValue = (key: string): { value: unknown, found: boolean } => {
  const keys = key.split('.');
  let value: unknown = mockTranslations;
  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return { value: key, found: false };
    }
  }
  return { value, found: true };
};

// Create stable translation function reference
const mockT: any = (key: string, params?: { count: number }) => {
  const { value, found } = getNestedValue(key);

  if (!found) {
    return key;
  }

  if (typeof value === 'string' && value.includes('{{count}}') && params?.count !== undefined) {
    const plural = params.count === 1 ? '' : 's';
    return `${params.count} result${plural}`;
  }

  return typeof value === 'string' ? value : key;
};

// Add raw method
mockT.raw = (key: string) => {
  const { value, found } = getNestedValue(key);
  return found ? value : [];
};

// Mock next-intl with stable function reference
jest.mock('next-intl', () => ({
  useTranslations: () => mockT,
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Shield: ({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean | "true" | "false" }) => (
    <div data-testid="icon-shield" className={className} aria-hidden={ariaHidden} />
  ),
  Cloud: ({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean | "true" | "false" }) => (
    <div data-testid="icon-cloud" className={className} aria-hidden={ariaHidden} />
  ),
  Activity: ({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean | "true" | "false" }) => (
    <div data-testid="icon-activity" className={className} aria-hidden={ariaHidden} />
  ),
  Plane: ({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean | "true" | "false" }) => (
    <div data-testid="icon-plane" className={className} aria-hidden={ariaHidden} />
  ),
  Backpack: ({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean | "true" | "false" }) => (
    <div data-testid="icon-backpack" className={className} aria-hidden={ariaHidden} />
  ),
  FileText: ({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean | "true" | "false" }) => (
    <div data-testid="icon-filetext" className={className} aria-hidden={ariaHidden} />
  ),
  CreditCard: ({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean | "true" | "false" }) => (
    <div data-testid="icon-creditcard" className={className} aria-hidden={ariaHidden} />
  ),
  Search: ({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean | "true" | "false" }) => (
    <div data-testid="icon-search" className={className} aria-hidden={ariaHidden} />
  ),
  X: ({ className }: { className?: string }) => (
    <div data-testid="icon-x" className={className} />
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <div data-testid="icon-chevron-down" className={className} />
  ),
  LucideIcon: () => <div data-testid="icon-lucide" />,
}));

describe('FAQAccordion', () => {
  describe('Rendering', () => {
    it('should render with provided sections', () => {
      render(<FAQAccordion sections={['safety', 'weather']} />);

      expect(screen.getByText('Safety')).toBeInTheDocument();
      expect(screen.getByText('Weather')).toBeInTheDocument();
    });

    it('should display all section headers with correct titles', () => {
      render(<FAQAccordion sections={['safety', 'weather', 'fitness']} />);

      expect(screen.getByText('Safety')).toBeInTheDocument();
      expect(screen.getByText('Weather')).toBeInTheDocument();
      expect(screen.getByText('Fitness')).toBeInTheDocument();
    });

    it('should render all questions for each section', () => {
      render(<FAQAccordion sections={['safety']} />);

      expect(screen.getByText('Is it safe to cycle in Colombia?')).toBeInTheDocument();
      expect(screen.getByText('What safety equipment is provided?')).toBeInTheDocument();
    });

    it('should display correct icons for each section type', () => {
      render(<FAQAccordion sections={['safety', 'weather', 'fitness', 'transport', 'gear', 'insurance', 'payments']} />);

      expect(screen.getByTestId('icon-shield')).toBeInTheDocument();
      expect(screen.getByTestId('icon-cloud')).toBeInTheDocument();
      expect(screen.getByTestId('icon-activity')).toBeInTheDocument();
      expect(screen.getByTestId('icon-plane')).toBeInTheDocument();
      expect(screen.getByTestId('icon-backpack')).toBeInTheDocument();
      expect(screen.getByTestId('icon-filetext')).toBeInTheDocument();
      expect(screen.getByTestId('icon-creditcard')).toBeInTheDocument();
    });

    it('should use default Shield icon for unmapped sections', () => {
      render(<FAQAccordion sections={['unmapped-section']} />);

      // Should still render a shield icon as default
      const icons = screen.getAllByTestId('icon-shield');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should render search input with placeholder', () => {
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    it('should render Expand All button initially', () => {
      render(<FAQAccordion sections={['safety']} />);

      expect(screen.getByRole('button', { name: 'Expand All' })).toBeInTheDocument();
    });

    it('should render icons without accessibility concerns', () => {
      render(<FAQAccordion sections={['safety']} />);

      // Verify icons are rendered (they are mocked with aria-hidden in the component)
      expect(screen.getByTestId('icon-shield')).toBeInTheDocument();
      expect(screen.getByTestId('icon-search')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should filter questions by question text', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety', 'weather']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'safe');

      // Should show questions with "safe" in them
      expect(screen.getByText('Is it safe to cycle in Colombia?')).toBeInTheDocument();
      expect(screen.getByText('What safety equipment is provided?')).toBeInTheDocument();

      // Should not show weather questions
      expect(screen.queryByText('What is the weather like?')).not.toBeInTheDocument();
    });

    it('should filter questions by answer text', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety', 'weather']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'mild');

      // Should show weather question because answer contains "mild"
      expect(screen.getByText('What is the weather like?')).toBeInTheDocument();

      // Should not show safety questions
      expect(screen.queryByText('Is it safe to cycle in Colombia?')).not.toBeInTheDocument();
    });

    it('should be case-insensitive', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'SAFE');

      expect(screen.getByText('Is it safe to cycle in Colombia?')).toBeInTheDocument();
    });

    it('should show correct result count with singular form', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['weather']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'weather');

      expect(screen.getByText('1 result')).toBeInTheDocument();
    });

    it('should show correct result count with plural form', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'safety');

      expect(screen.getByText('2 results')).toBeInTheDocument();
    });

    it('should show no results message when nothing matches', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'xyz123nonexistent');

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('should show try different keywords suggestion', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'nonexistent');

      expect(screen.getByText('Try different keywords')).toBeInTheDocument();
    });

    it('should show clear button when search has value', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      // Clear button should not be present initially
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();

      await user.type(searchInput, 'safe');

      // Clear button should appear
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('should remove search query when clear button clicked', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety', 'weather']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'safe');

      expect(searchInput).toHaveValue('safe');

      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);

      expect(searchInput).toHaveValue('');
      // All sections should be visible again
      expect(screen.getByText('Weather')).toBeInTheDocument();
    });

    it('should hide Expand/Collapse button during search', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      expect(screen.getByRole('button', { name: 'Expand All' })).toBeInTheDocument();

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'safe');

      expect(screen.queryByRole('button', { name: 'Expand All' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Collapse All' })).not.toBeInTheDocument();
    });

    it('should handle special characters in search', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'safe?');

      // Should still filter correctly
      expect(screen.getByText('Is it safe to cycle in Colombia?')).toBeInTheDocument();
    });

    it('should handle multiple spaces in search', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, '  safe  ');

      // Should filter correctly (trimming handled internally)
      expect(screen.getByText('Is it safe to cycle in Colombia?')).toBeInTheDocument();
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('should start with all items collapsed', () => {
      render(<FAQAccordion sections={['safety']} />);

      const triggers = screen.getAllByRole('button', { name: /Is it safe|What safety/ });
      triggers.forEach(trigger => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should expand item when trigger clicked', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const trigger = screen.getByRole('button', { name: 'Is it safe to cycle in Colombia?' });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Yes, our guided tours prioritize safety.')).toBeVisible();
    });

    it('should collapse item when clicked again', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const trigger = screen.getByRole('button', { name: 'Is it safe to cycle in Colombia?' });

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should allow multiple items to be open simultaneously', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const trigger1 = screen.getByRole('button', { name: 'Is it safe to cycle in Colombia?' });
      const trigger2 = screen.getByRole('button', { name: 'What safety equipment is provided?' });

      await user.click(trigger1);
      await user.click(trigger2);

      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    });

    it('should expand all visible items when Expand All clicked', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const expandButton = screen.getByRole('button', { name: 'Expand All' });
      await user.click(expandButton);

      const triggers = screen.getAllByRole('button', { name: /Is it safe|What safety/ });
      triggers.forEach(trigger => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should collapse all items when Collapse All clicked', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const expandButton = screen.getByRole('button', { name: 'Expand All' });
      await user.click(expandButton);

      const collapseButton = screen.getByRole('button', { name: 'Collapse All' });
      await user.click(collapseButton);

      const triggers = screen.getAllByRole('button', { name: /Is it safe|What safety/ });
      triggers.forEach(trigger => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should show Collapse All when all items are expanded', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const expandButton = screen.getByRole('button', { name: 'Expand All' });
      await user.click(expandButton);

      expect(screen.getByRole('button', { name: 'Collapse All' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Expand All' })).not.toBeInTheDocument();
    });

    it('should show Expand All when not all items are expanded', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      // Expand just one item
      const trigger = screen.getByRole('button', { name: 'Is it safe to cycle in Colombia?' });
      await user.click(trigger);

      // Should still show "Expand All" because not all are expanded
      expect(screen.getByRole('button', { name: 'Expand All' })).toBeInTheDocument();
    });
  });

  describe('Auto-Expansion on Search', () => {
    it('should auto-expand filtered results when search is entered', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'safe');

      // All matching questions should be auto-expanded
      const triggers = screen.getAllByRole('button', { name: /Is it safe|What safety/ });
      triggers.forEach(trigger => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });

      // Answers should be visible
      expect(screen.getByText('Yes, our guided tours prioritize safety.')).toBeVisible();
      expect(screen.getByText('Helmets, first aid kits, and safety gear.')).toBeVisible();
    });

    it('should update expansion when search query changes', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety', 'weather']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      // First search
      await user.type(searchInput, 'safe');
      let triggers = screen.getAllByRole('button', { name: /Is it safe|What safety/ });
      triggers.forEach(trigger => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });

      // Clear and search for different term
      await user.clear(searchInput);
      await user.type(searchInput, 'weather');

      const weatherTrigger = screen.getByRole('button', { name: 'What is the weather like?' });
      expect(weatherTrigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Placeholder Content Detection', () => {
    it('should apply amber background to questions with [PLACEHOLDER]', () => {
      render(<FAQAccordion sections={['placeholder']} />);

      const trigger = screen.getByRole('button', { name: 'This is a [PLACEHOLDER] question' });
      expect(trigger.className).toContain('bg-amber');
    });

    it('should apply amber background to answers with [TODO', () => {
      render(<FAQAccordion sections={['placeholder']} />);

      const trigger = screen.getByRole('button', { name: 'Another question' });
      expect(trigger.className).toContain('bg-amber');
    });

    it('should make placeholder answers italic', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['placeholder']} />);

      const trigger = screen.getByRole('button', { name: 'Another question' });
      await user.click(trigger);

      const content = screen.getByText('[TODO: Add answer here]');
      expect(content.className).toContain('italic');
    });

    it('should keep placeholder content functional', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['placeholder']} />);

      const trigger = screen.getByRole('button', { name: 'This is a [PLACEHOLDER] question' });
      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('This is a placeholder answer.')).toBeVisible();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on search input', () => {
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      expect(searchInput).toHaveAttribute('aria-label', 'Search frequently asked questions');
    });

    it('should have aria-label on clear button', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'safe');

      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toHaveAttribute('aria-label', 'Clear search');
    });

    it('should mark all icons as aria-hidden', () => {
      render(<FAQAccordion sections={['safety', 'weather']} />);

      const icons = screen.getAllByTestId(/^icon-/);
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should have proper aria-expanded on accordion triggers', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const trigger = screen.getByRole('button', { name: 'Is it safe to cycle in Colombia?' });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('should render empty state when no sections provided', () => {
      render(<FAQAccordion sections={[]} />);

      // Should render but be empty
      expect(screen.getByPlaceholderText('Search FAQs...')).toBeInTheDocument();
      expect(screen.queryByText(/Safety|Weather|Fitness/)).not.toBeInTheDocument();
    });

    it('should handle sections with empty questions array', () => {
      render(<FAQAccordion sections={['empty-section']} />);

      // Should not crash, just not display anything
      expect(screen.getByPlaceholderText('Search FAQs...')).toBeInTheDocument();
    });

    it('should filter out empty sections after search', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety', 'weather']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'safe');

      // Weather section should not be visible
      expect(screen.queryByText('Weather')).not.toBeInTheDocument();
    });

    it('should work with single section', () => {
      render(<FAQAccordion sections={['safety']} />);

      expect(screen.getByText('Safety')).toBeInTheDocument();
      expect(screen.getByText('Is it safe to cycle in Colombia?')).toBeInTheDocument();
    });

    it('should work with all 7 section types', () => {
      render(<FAQAccordion sections={['safety', 'weather', 'fitness', 'transport', 'gear', 'insurance', 'payments']} />);

      expect(screen.getByText('Safety')).toBeInTheDocument();
      expect(screen.getByText('Weather')).toBeInTheDocument();
      expect(screen.getByText('Fitness')).toBeInTheDocument();
      expect(screen.getByText('Transportation')).toBeInTheDocument();
      expect(screen.getByText('Gear')).toBeInTheDocument();
      expect(screen.getByText('Insurance')).toBeInTheDocument();
      expect(screen.getByText('Payments')).toBeInTheDocument();
    });

    it('should show all content when search is empty', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety', 'weather']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      // Type and then clear
      await user.type(searchInput, 'safe');
      await user.clear(searchInput);

      // All sections should be visible again
      expect(screen.getByText('Safety')).toBeInTheDocument();
      expect(screen.getByText('Weather')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should persist expanded state across interactions', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety', 'fitness']} />);

      // Expand one item
      const safetyTrigger = screen.getByRole('button', { name: 'Is it safe to cycle in Colombia?' });
      await user.click(safetyTrigger);

      // Expand another item in different section
      const fitnessTrigger = screen.getByRole('button', { name: 'Do I need to be fit?' });
      await user.click(fitnessTrigger);

      // Both should remain expanded
      expect(safetyTrigger).toHaveAttribute('aria-expanded', 'true');
      expect(fitnessTrigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should maintain independent state per item', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const trigger1 = screen.getByRole('button', { name: 'Is it safe to cycle in Colombia?' });
      const trigger2 = screen.getByRole('button', { name: 'What safety equipment is provided?' });

      // Expand first
      await user.click(trigger1);
      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
      expect(trigger2).toHaveAttribute('aria-expanded', 'false');

      // Collapse first, expand second
      await user.click(trigger1);
      await user.click(trigger2);
      expect(trigger1).toHaveAttribute('aria-expanded', 'false');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    });

    it('should update search query state correctly', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion sections={['safety']} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      await user.type(searchInput, 's');
      expect(searchInput).toHaveValue('s');

      await user.type(searchInput, 'afe');
      expect(searchInput).toHaveValue('safe');
    });
  });
});
