import React from 'react';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="label mb-3 block text-sm font-medium">{label}</label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-start">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="mt-0.5 h-4 w-4 border-border text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block cursor-pointer"
            >
              <span className="text-sm font-medium">{option.label}</span>
              {option.description && (
                <span className="block text-sm text-muted-foreground">
                  {option.description}
                </span>
              )}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
