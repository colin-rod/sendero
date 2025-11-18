import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * Alert Component
 *
 * A contextual feedback component for displaying important messages.
 * Supports multiple variants for different message types.
 *
 * @example
 * ```tsx
 * <Alert variant="success">
 *   Your changes have been saved!
 * </Alert>
 *
 * <Alert variant="error" title="Error">
 *   Something went wrong. Please try again.
 * </Alert>
 *
 * <Alert variant="info" dismissible onDismiss={() => console.log('dismissed')}>
 *   This is an informational message.
 * </Alert>
 * ```
 */

export interface AlertProps {
  /** Content to display in the alert */
  children: React.ReactNode;

  /** Alert variant */
  variant?: 'success' | 'error' | 'warning' | 'info';

  /** Optional title */
  title?: string;

  /** Whether the alert can be dismissed */
  dismissible?: boolean;

  /** Callback when alert is dismissed */
  onDismiss?: () => void;

  /** Additional CSS classes */
  className?: string;

  /** Custom icon (overrides default variant icon) */
  icon?: React.ReactNode;

  /** Hide the icon */
  hideIcon?: boolean;

  /** Test ID for testing */
  'data-testid'?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = 'info',
      title,
      dismissible = false,
      onDismiss,
      className = '',
      icon,
      hideIcon = false,
      'data-testid': testId,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    // Base styles
    const baseStyles = 'rounded-lg border p-4 transition-opacity duration-normal';

    // Variant styles
    const variantStyles = {
      success: 'border-success-200 bg-success-50 text-success-900',
      error: 'border-error-200 bg-error-50 text-error-900',
      warning: 'border-warning-200 bg-warning-50 text-warning-900',
      info: 'border-info-200 bg-info-50 text-info-900',
    };

    // Icon variants
    const iconVariants = {
      success: <FaCheckCircle className="h-5 w-5 text-success-600" />,
      error: <FaTimesCircle className="h-5 w-5 text-error-600" />,
      warning: <FaExclamationCircle className="h-5 w-5 text-warning-600" />,
      info: <FaInfoCircle className="h-5 w-5 text-info-600" />,
    };

    const displayIcon = icon || iconVariants[variant];

    const handleDismiss = () => {
      setIsVisible(false);
      if (onDismiss) {
        // Delay callback to allow fade-out animation
        setTimeout(onDismiss, 300);
      }
    };

    if (!isVisible) {
      return null;
    }

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${!isVisible ? 'opacity-0' : 'opacity-100'} ${className}`.trim();

    // ARIA role
    const role = variant === 'error' ? 'alert' : 'status';

    return (
      <div
        ref={ref}
        className={combinedClassName}
        role={role}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
        data-testid={testId}
      >
        <div className="flex items-start gap-3">
          {!hideIcon && (
            <div className="shrink-0 pt-0.5">
              {displayIcon}
            </div>
          )}

          <div className="flex-1">
            {title && (
              <h5 className="mb-1 font-semibold">
                {title}
              </h5>
            )}
            <div className={title ? 'text-sm' : ''}>
              {children}
            </div>
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="shrink-0 rounded p-1 transition-colors duration-fast hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
              aria-label="Dismiss alert"
            >
              <FaTimesCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * AlertList Component
 *
 * A container for stacking multiple alerts with proper spacing.
 *
 * @example
 * ```tsx
 * <AlertList>
 *   <Alert variant="success">Success message</Alert>
 *   <Alert variant="error">Error message</Alert>
 * </AlertList>
 * ```
 */

export interface AlertListProps {
  /** Alert components to display */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export const AlertList: React.FC<AlertListProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {children}
    </div>
  );
};
