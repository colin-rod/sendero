import React from 'react';
import { SpinnerButton } from './Spinner';

/**
 * Button Component
 *
 * A versatile button component with multiple variants, sizes, and states.
 * Now uses semantic design tokens for consistent theming.
 *
 * @example
 * ```tsx
 * <Button>Click me</Button>
 * <Button variant="secondary">Secondary action</Button>
 * <Button variant="outline" size="lg">Large outlined button</Button>
 * <Button loading disabled>Loading...</Button>
 * ```
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant using semantic color tokens */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'hero-cta' | 'secondary-oro-solid' | 'secondary-oro-light' | 'secondary-oro-outline';

  /** Button size */
  size?: 'sm' | 'md' | 'lg';

  /** Show loading spinner */
  loading?: boolean;

  /** Button content */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base classes with semantic transitions
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-component-button';

    // Variant classes using semantic color tokens
    const variantClasses = {
      primary:
        'bg-primary-500 text-foreground hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-500 shadow-md',
      secondary:
        'bg-accent-500 text-foreground hover:bg-accent-600 active:bg-accent-700 focus-visible:ring-accent-500',
      outline:
        'border border-border bg-transparent hover:bg-muted active:bg-muted/80 focus-visible:ring-primary-500',
      ghost:
        'bg-transparent hover:bg-muted active:bg-muted/80 focus-visible:ring-primary-500',
      danger:
        'bg-error-500 text-white hover:bg-error-600 active:bg-error-700 focus-visible:ring-error-500',
      'secondary-oro-solid':
        'bg-secondary-oro-500 text-white hover:bg-secondary-oro-600 active:bg-secondary-oro-700 shadow-md disabled:bg-secondary-oro-300 disabled:text-secondary-oro-100 focus-visible:ring-secondary-oro-500',
      'secondary-oro-light':
        'bg-accent-400 text-secondary-oro-700 hover:bg-accent-500 active:bg-accent-600 shadow-sm disabled:bg-accent-200 disabled:text-accent-400 focus-visible:ring-accent-500',
      'secondary-oro-outline':
        'bg-transparent text-secondary-oro-600 border-2 border-secondary-oro-500 hover:bg-secondary-oro-50 active:bg-secondary-oro-100 disabled:border-secondary-oro-300 disabled:text-secondary-oro-300 focus-visible:ring-secondary-oro-500',
      'hero-cta':
        'bg-primary-500 text-accent-400 hover:bg-riverForest active:bg-primary-700 focus-visible:ring-primary-500 rounded-[20px] h-[42px] min-w-[140px] px-6 py-3 gap-2 uppercase font-medium text-caption leading-tight tracking-[0.06em] font-sans',
    };

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const resolvedSizeClasses = variant === 'hero-cta' ? '' : sizeClasses[size];
    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${resolvedSizeClasses} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <SpinnerButton variant="white" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
