'use client';

import React, { createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Accordion Component
 *
 * An accessible accordion component following WAI-ARIA guidelines.
 * Supports single or multiple item expansion.
 *
 * @example
 * ```tsx
 * <Accordion type="single">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Question 1</AccordionTrigger>
 *     <AccordionContent>Answer 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */

// Context for accordion state management
interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

// Accordion Root Component
export interface AccordionProps {
  /** Content (AccordionItem components) */
  children: React.ReactNode;

  /** Type of accordion - single allows only one open, multiple allows many */
  type?: 'single' | 'multiple';

  /** Default open items (item values) */
  defaultValue?: string | string[];

  /** Additional CSS classes */
  className?: string;

  /** Controlled value for opened items */
  value?: string | string[];

  /** Callback when value changes */
  onValueChange?: (value: string | string[]) => void;

  /** Whether items can be collapsed (only used with type="single") */
  collapsible?: boolean;
}

export function Accordion({
  children,
  type = 'multiple',
  defaultValue,
  className = '',
  value,
  onValueChange,
  collapsible = false,
}: AccordionProps) {
  // Initialize open items based on type and defaultValue
  const getInitialValue = (): string[] => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  };

  const [openItems, setOpenItems] = useState<string[]>(getInitialValue());

  // Update internal state if controlled value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setOpenItems(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const toggleItem = (itemValue: string) => {
    let newOpenItems: string[];

    if (type === 'single') {
      // Single mode: only one item open at a time
      // If collapsible is true, allow closing the open item
      if (openItems.includes(itemValue) && collapsible) {
        newOpenItems = [];
      } else {
        newOpenItems = [itemValue];
      }
    } else {
      // Multiple mode: toggle the item
      if (openItems.includes(itemValue)) {
        newOpenItems = openItems.filter(v => v !== itemValue);
      } else {
        newOpenItems = [...openItems, itemValue];
      }
    }

    setOpenItems(newOpenItems);

    // Call onValueChange if provided
    if (onValueChange) {
      const returnValue = type === 'single' ? newOpenItems[0] || '' : newOpenItems;
      onValueChange(returnValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={`space-y-2 ${className}`.trim()}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// Context for AccordionItem to pass value to children
interface AccordionItemContextValue {
  value: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined);

// AccordionItem Component
export interface AccordionItemProps {
  /** Unique identifier for this item */
  value: string;

  /** Content (AccordionTrigger and AccordionContent) */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export function AccordionItem({ value, children, className = '' }: AccordionItemProps) {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        className={`rounded-lg border border-border bg-white overflow-hidden ${className}`.trim()}
        data-state={isOpen ? 'open' : 'closed'}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// AccordionTrigger Component
export interface AccordionTriggerProps {
  /** Trigger content (question text) */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export function AccordionTrigger({ children, className = '' }: AccordionTriggerProps) {
  const context = useAccordionContext();

  // Get the value from parent AccordionItem
  const itemElement = React.useContext(AccordionItemContext);
  if (!itemElement) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  const { value } = itemElement;
  const isOpen = context.openItems.includes(value);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className={`
        flex w-full items-center justify-between gap-4 px-6 py-4 text-left
        transition-colors duration-200
        hover:bg-muted/40
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
        ${className}
      `.trim()}
      onClick={() => context.toggleItem(value)}
    >
      <span className="text-body font-medium text-foreground">
        {children}
      </span>
      <ChevronDown
        className={`
          h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200
          ${isOpen ? 'rotate-180' : ''}
        `.trim()}
        aria-hidden="true"
      />
    </button>
  );
}

// AccordionContent Component
export interface AccordionContentProps {
  /** Answer content */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export function AccordionContent({ children, className = '' }: AccordionContentProps) {
  const context = useAccordionContext();

  // Get the value from parent AccordionItem
  const itemElement = React.useContext(AccordionItemContext);
  if (!itemElement) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  const { value } = itemElement;
  const isOpen = context.openItems.includes(value);

  return (
    <div
      className={`
        overflow-hidden transition-all duration-200
        ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
      `.trim()}
      aria-hidden={!isOpen}
    >
      <div className={`px-6 pb-4 pt-2 ${className}`.trim()}>
        <div className="text-body text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
