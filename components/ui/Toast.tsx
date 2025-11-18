'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * Toast Types
 */

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string, duration?: number) => void;
  error: (message: string, title?: string, duration?: number) => void;
  warning: (message: string, title?: string, duration?: number) => void;
  info: (message: string, title?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * useToast Hook
 *
 * Hook to access toast functionality.
 *
 * @example
 * ```tsx
 * const { success, error } = useToast();
 *
 * const handleSave = () => {
 *   try {
 *     // save logic
 *     success('Changes saved successfully!');
 *   } catch (err) {
 *     error('Failed to save changes');
 *   }
 * };
 * ```
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * ToastProvider Component
 *
 * Provider component for toast notifications.
 * Wrap your app with this component to enable toasts.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */

export interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { ...toast, id };

      setToasts((prev) => [...prev, newToast]);

      // Auto-dismiss after duration
      const duration = toast.duration ?? 5000;
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title?: string, duration?: number) => {
      addToast({ variant: 'success', message, title, duration });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, title?: string, duration?: number) => {
      addToast({ variant: 'error', message, title, duration });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, title?: string, duration?: number) => {
      addToast({ variant: 'warning', message, title, duration });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, title?: string, duration?: number) => {
      addToast({ variant: 'info', message, title, duration });
    },
    [addToast]
  );

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * ToastContainer Component
 *
 * Container that renders toast notifications.
 * Positioned fixed in the top-right corner.
 */

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

/**
 * ToastItem Component
 *
 * Individual toast notification.
 */

interface ToastItemProps {
  toast: Toast;
  onDismiss: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = React.useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    // Delay actual removal to allow exit animation
    setTimeout(onDismiss, 200);
  };

  // Base styles
  const baseStyles = 'rounded-lg border bg-white p-4 shadow-lg transition-all duration-normal';

  // Animation classes
  const animationStyles = isExiting ? 'animate-toast-exit' : 'animate-toast-enter';

  // Variant styles
  const variantStyles = {
    success: 'border-success-200',
    error: 'border-error-200',
    warning: 'border-warning-200',
    info: 'border-info-200',
  };

  // Icon variants
  const iconVariants = {
    success: <FaCheckCircle className="h-5 w-5 text-success-600" />,
    error: <FaTimesCircle className="h-5 w-5 text-error-600" />,
    warning: <FaExclamationCircle className="h-5 w-5 text-warning-600" />,
    info: <FaInfoCircle className="h-5 w-5 text-info-600" />,
  };

  const combinedClassName = `${baseStyles} ${variantStyles[toast.variant]} ${animationStyles}`.trim();

  return (
    <div
      className={combinedClassName}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          {iconVariants[toast.variant]}
        </div>

        <div className="flex-1 text-sm">
          {toast.title && (
            <p className="font-semibold text-foreground">
              {toast.title}
            </p>
          )}
          <p className={`text-muted-foreground ${toast.title ? 'mt-1' : ''}`}>
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 rounded p-1 text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Dismiss notification"
        >
          <FaTimesCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
