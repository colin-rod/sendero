'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  label: string;
  children: React.ReactNode;
  panelClassName?: string;
}

export function InfoTooltip({ label, children, panelClassName = 'w-56' }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-label={label}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="align-middle text-muted-foreground transition-colors hover:text-primary-600"
      >
        <Info className="h-4 w-4" />
      </button>
      {isOpen && (
        <span
          role="tooltip"
          className={`absolute left-1/2 z-10 mt-2 -translate-x-1/2 rounded-md border border-border bg-white p-3 text-label text-muted-foreground shadow-lg ${panelClassName}`}
        >
          {children}
        </span>
      )}
    </span>
  );
}
