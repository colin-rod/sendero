import React from 'react';

/**
 * Container Component
 *
 * The site frame: every section, the header and the footer use it, so content
 * lines up with the logo at every breakpoint. Width and padding come from
 * `layout` in lib/design-tokens (1280px frame, Figma 24/40/64px gutter).
 *
 * Constrain copy inside it with the text measures instead of narrower
 * containers: `max-w-text` for paragraphs, `max-w-heading` for headings.
 *
 * @example
 * ```tsx
 * <Container>
 *   <h2 className="text-h2 max-w-heading">Section title</h2>
 *   <p className="max-w-text">Body copy</p>
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

  /** `frame` (default) is the 1280px site frame; `full` drops the max width */
  size?: 'frame' | 'full';

  /** Whether to add the responsive gutter */
  noPadding?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = 'frame',
      noPadding = false,
      className = '',
    },
    ref
  ) => {
    // Base classes
    const baseClasses = 'mx-auto w-full';

    // Size classes (max-width)
    const sizeClasses = {
      frame: 'max-w-7xl', // 1280px - layout.frame
      full: 'max-w-full', // No max width
    };

    // Gutter (layout.gutter): 24px mobile, 40px tablet, 64px desktop
    const paddingClasses = noPadding ? '' : 'px-6 sm:px-10 lg:px-16';

    const combinedClassName = `${baseClasses} ${sizeClasses[size]} ${paddingClasses} ${className}`.trim();

    return (
      <div ref={ref} className={combinedClassName}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
