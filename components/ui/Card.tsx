import React from 'react';

/**
 * Card Component
 *
 * A flexible container component for grouping related content.
 * Supports multiple variants for different use cases.
 *
 * @example
 * ```tsx
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * <Card variant="bordered" padding="lg">
 *   <h3>Bordered Card</h3>
 * </Card>
 *
 * <Card variant="elevated" hoverable>
 *   <h3>Hoverable Card</h3>
 * </Card>
 * ```
 */

export interface CardProps {
  /** Content to display inside the card */
  children: React.ReactNode;

  /** Card variant */
  variant?: 'default' | 'bordered' | 'elevated' | 'muted';

  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /** Whether the card should have a hover effect */
  hoverable?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Click handler for interactive cards */
  onClick?: () => void;

  /** ARIA role for semantic meaning */
  role?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      className = '',
      onClick,
      role,
      'data-testid': testId,
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'rounded-lg bg-white';

    // Variant styles
    const variantStyles = {
      default: 'shadow-sm',
      bordered: 'border border-border',
      elevated: 'shadow-lg',
      muted: 'border border-border bg-muted/50',
    };

    // Padding styles
    const paddingStyles = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    // Hover styles
    const hoverStyles = hoverable
      ? 'transition-shadow duration-fast hover:shadow-elevation-floating cursor-pointer'
      : '';

    // Interactive styles
    const interactiveStyles = onClick
      ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
      : '';

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${interactiveStyles} ${className}`.trim();

    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={combinedClassName}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={role || (onClick ? 'button' : undefined)}
        tabIndex={onClick ? 0 : undefined}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader Component
 *
 * Semantic header section for cards
 */
export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`.trim()}>
      {children}
    </div>
  );
};

/**
 * CardTitle Component
 *
 * Styled title for card headers
 */
export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  as: Component = 'h3'
}) => {
  return (
    <Component className={`font-semibold ${className}`.trim()}>
      {children}
    </Component>
  );
};

/**
 * CardContent Component
 *
 * Content area for cards
 */
export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

/**
 * CardFooter Component
 *
 * Footer section for cards (typically for actions)
 */
export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`mt-6 flex items-center gap-2 ${className}`.trim()}>
      {children}
    </div>
  );
};
