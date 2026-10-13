'use client';

export interface ChipOption<T extends string> {
  value: T;
  label: string;
  /** Selecting this option clears all others (and vice versa) in multi mode */
  exclusive?: boolean;
}

interface ToggleOptions {
  multi: boolean;
  exclusive?: boolean;
  exclusiveValues?: readonly string[];
}

/**
 * Returns the next selection after clicking `value`.
 * - single: selects `value`, or clears it when it was already selected
 * - multi: toggles `value`; an exclusive value clears everything else,
 *   any other value clears the exclusive ones
 */
export function toggleSelection<T extends string>(
  current: readonly T[],
  value: T,
  { multi, exclusive = false, exclusiveValues = [] }: ToggleOptions
): T[] {
  const isSelected = current.includes(value);

  if (!multi || exclusive) {
    return isSelected ? [] : [value];
  }

  if (isSelected) {
    return current.filter((v) => v !== value);
  }

  return [...current.filter((v) => !exclusiveValues.includes(v)), value];
}

interface SelectChipsProps<T extends string> {
  options: ChipOption<T>[];
  selected: T[];
  onChange: (next: T[]) => void;
  multi?: boolean;
  disabled?: boolean;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

export function SelectChips<T extends string>({
  options,
  selected,
  onChange,
  multi = false,
  disabled = false,
}: SelectChipsProps<T>) {
  const exclusiveValues = options.filter((o) => o.exclusive).map((o) => o.value);

  const handleClick = (option: ChipOption<T>) => {
    onChange(toggleSelection(selected, option.value, { multi, exclusive: option.exclusive, exclusiveValues }));
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const isOn = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isOn}
            disabled={disabled}
            onClick={() => handleClick(option)}
            className={`min-h-[46px] min-w-[56px] rounded-full border px-5 text-base transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${focusRing} ${
              isOn
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-gray-400 bg-white text-foreground hover:border-foreground'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
