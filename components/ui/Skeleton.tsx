import React from 'react';

/**
 * Skeleton Component
 *
 * A placeholder component for loading states.
 * Shows a shimmer animation while content is loading.
 * Respects user's prefers-reduced-motion preference.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-full" />
 * <Skeleton variant="circular" className="h-12 w-12" />
 * <Skeleton variant="rectangular" className="h-32 w-full" />
 * ```
 */

export interface SkeletonProps {
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';

  /** Additional CSS classes for custom sizing and spacing */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  className = '',
  'data-testid': testId,
}) => {
  // Base styles with shimmer animation
  const baseStyles = 'relative overflow-hidden bg-muted';

  // Variant styles
  const variantStyles = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  // Shimmer effect
  const shimmerStyles = `
    before:absolute
    before:inset-0
    before:-translate-x-full
    before:animate-shimmer
    before:bg-gradient-to-r
    before:from-transparent
    before:via-white/10
    before:to-transparent
  `;

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${shimmerStyles} ${className}`.trim();

  return (
    <div
      className={combinedClassName}
      role="status"
      aria-label="Loading"
      data-testid={testId}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * SkeletonCard Component
 *
 * A pre-built skeleton for card layouts.
 * Useful for loading states in card grids.
 *
 * @example
 * ```tsx
 * <SkeletonCard />
 * <SkeletonCard showImage={false} />
 * ```
 */

export interface SkeletonCardProps {
  /** Whether to show image skeleton */
  showImage?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  showImage = true,
  className = '',
  'data-testid': testId,
}) => {
  return (
    <div
      className={`space-y-4 rounded-lg border border-border bg-white p-6 ${className}`.trim()}
      data-testid={testId}
    >
      {showImage && <Skeleton variant="rounded" className="h-48 w-full" />}
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

/**
 * SkeletonText Component
 *
 * A pre-built skeleton for multi-line text content.
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} />
 * <SkeletonText lines={5} lastLineWidth="60%" />
 * ```
 */

export interface SkeletonTextProps {
  /** Number of text lines */
  lines?: number;

  /** Width of the last line (useful for partial sentences) */
  lastLineWidth?: string;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lastLineWidth = '80%',
  className = '',
  'data-testid': testId,
}) => {
  return (
    <div className={`space-y-2 ${className}`.trim()} data-testid={testId}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 ${
            index === lines - 1 ? `w-[${lastLineWidth}]` : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

/**
 * SkeletonAvatar Component
 *
 * A circular skeleton for avatar/profile images.
 *
 * @example
 * ```tsx
 * <SkeletonAvatar />
 * <SkeletonAvatar size="lg" />
 * ```
 */

export interface SkeletonAvatarProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'md',
  className = '',
  'data-testid': testId,
}) => {
  const sizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <Skeleton
      variant="circular"
      className={`${sizeStyles[size]} ${className}`.trim()}
      data-testid={testId}
    />
  );
};
