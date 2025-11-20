import React from 'react';

/**
 * Badge Component
 *
 * A small label component for displaying status, categories, or counts.
 * Commonly used for tags, labels, and status indicators.
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="lg">Error</Badge>
 * <Badge variant="primary" icon={<Icon />}>With Icon</Badge>
 * ```
 */

export interface BadgeProps {
  /** Content to display in the badge */
  children: React.ReactNode;

  /** Visual variant */
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'info';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Optional icon to display before the text */
  icon?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      icon,
      className = '',
      'data-testid': testId,
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-fast';

    // Size styles
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-0.5 text-xs gap-1.5',
      lg: 'px-3 py-1 text-sm gap-2',
    };

    // Variant styles
    const variantStyles = {
      default: 'bg-muted text-muted-foreground',
      primary: 'bg-primary-100 text-primary-700',
      accent: 'bg-accent-100 text-accent-700',
      success: 'bg-success-100 text-success-700',
      error: 'bg-error-100 text-error-700',
      warning: 'bg-warning-100 text-warning-700',
      info: 'bg-info-100 text-info-700',
    };

    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

    return (
      <span
        ref={ref}
        className={combinedClassName}
        data-testid={testId}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * IconBadge Component
 *
 * A circular badge designed specifically for wrapping icons.
 * Commonly used in feature cards and icon highlights.
 *
 * @example
 * ```tsx
 * <IconBadge>
 *   <BikeIcon className="h-5 w-5" />
 * </IconBadge>
 *
 * <IconBadge variant="accent" size="lg">
 *   <CoffeeIcon className="h-6 w-6" />
 * </IconBadge>
 * ```
 */

export interface IconBadgeProps {
  /** Icon element to display */
  children: React.ReactNode;

  /** Visual variant */
  variant?: 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'info' | 'muted';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const IconBadge = React.forwardRef<HTMLDivElement, IconBadgeProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      'data-testid': testId,
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'flex items-center justify-center rounded-full shrink-0';

    // Size styles
    const sizeStyles = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };

    // Variant styles
    const variantStyles = {
      primary: 'bg-primary-100 text-primary-600',
      accent: 'bg-accent-100 text-accent-600',
      success: 'bg-success-100 text-success-600',
      error: 'bg-error-100 text-error-600',
      warning: 'bg-warning-100 text-warning-600',
      info: 'bg-info-100 text-info-600',
      muted: 'bg-muted text-muted-foreground',
    };

    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

    return (
      <div
        ref={ref}
        className={combinedClassName}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

IconBadge.displayName = 'IconBadge';

/**
 * NumberBadge Component
 *
 * A circular badge for displaying numbers (step indicators, counts, etc.).
 * Commonly used in numbered lists and step indicators.
 *
 * @example
 * ```tsx
 * <NumberBadge>1</NumberBadge>
 * <NumberBadge variant="accent" size="lg">2</NumberBadge>
 * <NumberBadge variant="primary">42</NumberBadge>
 * ```
 */

export interface NumberBadgeProps {
  /** Number to display */
  children: React.ReactNode;

  /** Visual variant */
  variant?: 'primary' | 'accent' | 'muted';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const NumberBadge = React.forwardRef<HTMLDivElement, NumberBadgeProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'lg',
      className = '',
      'data-testid': testId,
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'flex items-center justify-center rounded-full shrink-0 font-semibold';

    // Size styles
    const sizeStyles = {
      sm: 'h-6 w-6 text-xs',
      md: 'h-8 w-8 text-sm',
      lg: 'h-12 w-12 text-2xl',
      xl: 'h-16 w-16 text-3xl',
    };

    // Variant styles
    const variantStyles = {
      primary: 'bg-primary-500 text-gray-900',
      accent: 'bg-accent-500 text-gray-900',
      muted: 'bg-muted text-foreground',
    };

    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

    return (
      <div
        ref={ref}
        className={combinedClassName}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

NumberBadge.displayName = 'NumberBadge';
