import React from 'react';

/**
 * Container Component
 *
 * A responsive container component with configurable max-width.
 * Provides consistent horizontal padding and centering across breakpoints.
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>Page content</h1>
 * </Container>
 *
 * <Container size="sm">
 *   <form>Narrow form</form>
 * </Container>
 *
 * <Container size="full">
 *   Full-width content
 * </Container>
 * ```
 */

export interface ContainerProps {
  /** Content to display inside the container */
  children: React.ReactNode;

  /** Maximum width of the container */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Whether to add responsive padding */
  noPadding?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = 'xl',
      noPadding = false,
      className = '',
    },
    ref
  ) => {
    // Base classes
    const baseClasses = 'mx-auto w-full';

    // Size classes (max-width)
    const sizeClasses = {
      sm: 'max-w-2xl',   // 672px - Forms, narrow content
      md: 'max-w-4xl',   // 896px - Articles, medium content
      lg: 'max-w-6xl',   // 1152px - Wide content
      xl: 'max-w-7xl',   // 1280px - Default, full site width
      full: 'max-w-full', // No max width
    };

    // Padding classes (responsive)
    const paddingClasses = noPadding ? '' : 'px-4 sm:px-6 lg:px-8';

    const combinedClassName = `${baseClasses} ${sizeClasses[size]} ${paddingClasses} ${className}`.trim();

    return (
      <div ref={ref} className={combinedClassName}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
