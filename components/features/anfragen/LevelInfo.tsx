'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Info, X } from 'lucide-react';

export interface LevelInfoOption<T extends string> {
  value: T;
  title: string;
  text: string;
}

interface LevelInfoProps<T extends string> {
  options: LevelInfoOption<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
  triggerLabel: string;
  title: string;
  closeLabel: string;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

/**
 * Info button that explains the riding levels.
 * Popover anchored to the icon from 640px up, bottom sheet below.
 * Opens on click only; closes on ×, Esc, outside click or when a level is picked.
 */
export function LevelInfo<T extends string>({
  options,
  selected,
  onSelect,
  triggerLabel,
  title,
  closeLabel,
}: LevelInfoProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const titleId = useId();

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    // `click` (not pointerdown) so a click on another field keeps the focus it just received
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
      if (document.activeElement === document.body) triggerRef.current?.focus();
    };

    // Bottom sheet (mobile) locks page scroll
    const isSheet = window.matchMedia('(max-width: 639px)').matches;
    if (isSheet) document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
      if (isSheet) document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <div ref={wrapperRef} className="relative -my-4 inline-flex">
      <button
        ref={triggerRef}
        type="button"
        aria-label={triggerLabel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className={`flex h-11 w-11 items-center justify-center rounded-full text-silver transition-colors hover:text-primary-500 aria-expanded:text-primary-500 ${focusRing}`}
      >
        <Info className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[55] bg-black/40 sm:hidden" aria-hidden="true" onClick={close} />
          <div
            id={panelId}
            role="dialog"
            aria-labelledby={titleId}
            className="fixed inset-x-0 bottom-0 z-[60] rounded-t-2xl bg-white px-6 pb-8 pt-6 shadow-xl sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-0 sm:top-full sm:mt-1 sm:w-[320px] sm:rounded-md sm:border sm:border-gray-300 sm:p-5 sm:shadow-lg"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h3 id={titleId} className="pt-2 text-lg font-semibold leading-snug text-foreground">
                {title}
              </h3>
              <button
                ref={closeRef}
                type="button"
                aria-label={closeLabel}
                onClick={close}
                className={`-mr-2 -mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-foreground hover:bg-background ${focusRing}`}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="-mx-3 flex flex-col">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    aria-pressed={selected === option.value}
                    onClick={() => {
                      onSelect(option.value);
                      close();
                    }}
                    className={`flex w-full flex-col gap-1 rounded-md px-3 py-3 text-left transition-colors hover:bg-background ${focusRing} ${
                      selected === option.value ? 'bg-background' : ''
                    }`}
                  >
                    <span className="text-base font-semibold text-foreground">{option.title}</span>
                    <span className="text-base leading-[1.5] text-gray-700">{option.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
