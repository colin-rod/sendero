import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={`h-4 w-4 rounded border-border text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
          {...props}
        />
        <label htmlFor={checkboxId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
