import React from 'react';

/**
 * Spinner Component
 *
 * An animated loading indicator for asynchronous operations.
 * Respects user's prefers-reduced-motion preference.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" />
 * <Spinner variant="accent" label="Loading..." />
 * ```
 */

export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Color variant */
  variant?: 'primary' | 'accent' | 'white' | 'current';

  /** Accessible label for screen readers */
  label?: string;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  label = 'Loading',
  className = '',
  'data-testid': testId,
}) => {
  // Size styles
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
    xl: 'h-12 w-12 border-4',
  };

  // Variant styles (border color)
  const variantStyles = {
    primary: 'border-primary-200 border-t-primary-600',
    accent: 'border-accent-200 border-t-accent-600',
    white: 'border-white/20 border-t-white',
    current: 'border-current/20 border-t-current',
  };

  const combinedClassName = `inline-block animate-spin rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  return (
    <div
      className={combinedClassName}
      role="status"
      aria-label={label}
      data-testid={testId}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
};

/**
 * SpinnerFullPage Component
 *
 * A full-page loading spinner centered in the viewport.
 * Useful for page-level loading states.
 *
 * @example
 * ```tsx
 * <SpinnerFullPage />
 * <SpinnerFullPage label="Loading page..." />
 * ```
 */

export interface SpinnerFullPageProps {
  /** Size of the spinner */
  size?: 'md' | 'lg' | 'xl';

  /** Color variant */
  variant?: 'primary' | 'accent';

  /** Accessible label for screen readers */
  label?: string;

  /** Additional message to display below the spinner */
  message?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const SpinnerFullPage: React.FC<SpinnerFullPageProps> = ({
  size = 'lg',
  variant = 'primary',
  label = 'Loading',
  message,
  'data-testid': testId,
}) => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      data-testid={testId}
    >
      <Spinner size={size} variant={variant} label={label} />
      {message && (
        <p className="mt-4 text-sm text-muted-foreground">
          {message}
        </p>
      )}
    </div>
  );
};

/**
 * SpinnerButton Component
 *
 * A small spinner designed for inline use within buttons.
 * Automatically sized to match button text.
 *
 * @example
 * ```tsx
 * <button>
 *   <SpinnerButton />
 *   Loading...
 * </button>
 * ```
 */

export interface SpinnerButtonProps {
  /** Color variant */
  variant?: 'white' | 'current';

  /** Accessible label for screen readers */
  label?: string;

  /** Additional CSS classes */
  className?: string;
}

export const SpinnerButton: React.FC<SpinnerButtonProps> = ({
  variant = 'current',
  label = 'Loading',
  className = '',
}) => {
  return (
    <Spinner
      size="sm"
      variant={variant}
      label={label}
      className={`mr-2 ${className}`.trim()}
    />
  );
};
