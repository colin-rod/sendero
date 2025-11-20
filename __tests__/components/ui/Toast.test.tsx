import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToastProvider, useToast } from '@/components/ui/Toast';

// Test component to access toast context
const TestComponent = ({ onReady }: { onReady?: (context: ReturnType<typeof useToast>) => void }) => {
  const toast = useToast();

  React.useEffect(() => {
    if (onReady) {
      onReady(toast);
    }
  }, [toast, onReady]);

  return (
    <div>
      <button onClick={() => toast.success('Success message')}>Success</button>
      <button onClick={() => toast.error('Error message')}>Error</button>
      <button onClick={() => toast.warning('Warning message')}>Warning</button>
      <button onClick={() => toast.info('Info message')}>Info</button>
      <button onClick={() => toast.success('With title', 'Title')}>With Title</button>
    </div>
  );
};

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Provider Setup', () => {
    it('renders children', () => {
      render(
        <ToastProvider>
          <div>Test Content</div>
        </ToastProvider>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('provides toast context to children', () => {
      let contextValue: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { contextValue = ctx; }} />
        </ToastProvider>
      );

      expect(contextValue).not.toBeNull();
      expect(contextValue?.success).toBeInstanceOf(Function);
      expect(contextValue?.error).toBeInstanceOf(Function);
      expect(contextValue?.warning).toBeInstanceOf(Function);
      expect(contextValue?.info).toBeInstanceOf(Function);
    });
  });

  describe('Toast Creation', () => {
    it('creates success toast', () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.success('Success message');
      });

      expect(toastContext?.toasts).toHaveLength(1);
      expect(toastContext?.toasts[0].variant).toBe('success');
      expect(toastContext?.toasts[0].message).toBe('Success message');
    });

    it('creates error toast', () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.error('Error message');
      });

      expect(toastContext?.toasts).toHaveLength(1);
      expect(toastContext?.toasts[0].variant).toBe('error');
      expect(toastContext?.toasts[0].message).toBe('Error message');
    });

    it('creates warning toast', () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.warning('Warning message');
      });

      expect(toastContext?.toasts).toHaveLength(1);
      expect(toastContext?.toasts[0].variant).toBe('warning');
      expect(toastContext?.toasts[0].message).toBe('Warning message');
    });

    it('creates info toast', () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.info('Info message');
      });

      expect(toastContext?.toasts).toHaveLength(1);
      expect(toastContext?.toasts[0].variant).toBe('info');
      expect(toastContext?.toasts[0].message).toBe('Info message');
    });

    it('creates toast with title', () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.success('Message', 'Title');
      });

      expect(toastContext?.toasts[0].title).toBe('Title');
      expect(toastContext?.toasts[0].message).toBe('Message');
    });
  });

  describe('Toast Management', () => {
    it('adds multiple toasts', () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.success('First');
        toastContext?.error('Second');
        toastContext?.info('Third');
      });

      expect(toastContext?.toasts).toHaveLength(3);
    });

    it('removes toast by id', () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.success('First');
        toastContext?.success('Second');
      });

      const firstToastId = toastContext?.toasts[0].id!;

      act(() => {
        toastContext?.removeToast(firstToastId);
      });

      expect(toastContext?.toasts).toHaveLength(1);
      expect(toastContext?.toasts[0].message).toBe('Second');
    });

    it('auto-dismisses toast after default duration', async () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.success('Auto dismiss');
      });

      expect(toastContext?.toasts).toHaveLength(1);

      // Fast-forward time by 5000ms (default duration)
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      await waitFor(() => {
        expect(toastContext?.toasts).toHaveLength(0);
      });
    });

    it('auto-dismisses toast after custom duration', async () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.success('Custom duration', undefined, 3000);
      });

      expect(toastContext?.toasts).toHaveLength(1);

      // Fast-forward time by 3000ms
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(toastContext?.toasts).toHaveLength(0);
      });
    });

    it('does not auto-dismiss when duration is 0', async () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.success('Persistent', undefined, 0);
      });

      expect(toastContext?.toasts).toHaveLength(1);

      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      // Toast should still be there
      expect(toastContext?.toasts).toHaveLength(1);
    });
  });

  describe('Toast IDs', () => {
    it('generates unique IDs for each toast', () => {
      let toastContext: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onReady={(ctx) => { toastContext = ctx; }} />
        </ToastProvider>
      );

      act(() => {
        toastContext?.success('First');
        toastContext?.success('Second');
        toastContext?.success('Third');
      });

      const ids = toastContext?.toasts.map(t => t.id) || [];
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(3);
    });
  });
});

describe('useToast Hook', () => {
  it('throws error when used outside ToastProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const TestComponentWithoutProvider = () => {
      useToast();
      return null;
    };

    expect(() => {
      render(<TestComponentWithoutProvider />);
    }).toThrow('useToast must be used within a ToastProvider');

    consoleSpy.mockRestore();
  });

  it('returns toast context when used within ToastProvider', () => {
    let contextValue: ReturnType<typeof useToast> | null = null;

    render(
      <ToastProvider>
        <TestComponent onReady={(ctx) => { contextValue = ctx; }} />
      </ToastProvider>
    );

    expect(contextValue).toBeDefined();
    expect(contextValue?.toasts).toEqual([]);
    expect(typeof contextValue?.addToast).toBe('function');
    expect(typeof contextValue?.removeToast).toBe('function');
  });
});
