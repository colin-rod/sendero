import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Alert, AlertList } from '@/components/ui/Alert';

describe('Alert', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(<Alert>Test alert message</Alert>);
      expect(screen.getByText('Test alert message')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<Alert title="Alert Title">Alert content</Alert>);
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
      expect(screen.getByText('Alert content')).toBeInTheDocument();
    });

    it('renders with default info variant', () => {
      render(<Alert data-testid="alert">Default alert</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-info-200', 'bg-info-50', 'text-info-900');
    });
  });

  describe('Variants', () => {
    it('renders success variant correctly', () => {
      render(<Alert variant="success" data-testid="alert">Success message</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-success-200', 'bg-success-50', 'text-success-900');
    });

    it('renders error variant correctly', () => {
      render(<Alert variant="error" data-testid="alert">Error message</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-error-200', 'bg-error-50', 'text-error-900');
    });

    it('renders warning variant correctly', () => {
      render(<Alert variant="warning" data-testid="alert">Warning message</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-warning-200', 'bg-warning-50', 'text-warning-900');
    });

    it('renders info variant correctly', () => {
      render(<Alert variant="info" data-testid="alert">Info message</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-info-200', 'bg-info-50', 'text-info-900');
    });
  });

  describe('Icons', () => {
    it('renders default icon for each variant', () => {
      const { container } = render(<Alert variant="success">Success</Alert>);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('hides icon when hideIcon is true', () => {
      const { container } = render(<Alert hideIcon>No icon alert</Alert>);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      const CustomIcon = () => <span data-testid="custom-icon">★</span>;
      render(<Alert icon={<CustomIcon />}>Custom icon alert</Alert>);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Dismissible', () => {
    it('does not show dismiss button by default', () => {
      render(<Alert>Not dismissible</Alert>);
      expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument();
    });

    it('shows dismiss button when dismissible is true', () => {
      render(<Alert dismissible>Dismissible alert</Alert>);
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument();
    });

    it('removes alert when dismiss button is clicked', async () => {
      render(<Alert dismissible data-testid="alert">Dismissible alert</Alert>);
      const dismissButton = screen.getByLabelText('Dismiss alert');

      fireEvent.click(dismissButton);

      await waitFor(() => {
        expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
      });
    });

    it('calls onDismiss callback when dismissed', async () => {
      const onDismiss = jest.fn();
      render(<Alert dismissible onDismiss={onDismiss}>Dismissible alert</Alert>);

      const dismissButton = screen.getByLabelText('Dismiss alert');
      fireEvent.click(dismissButton);

      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledTimes(1);
      }, { timeout: 500 });
    });
  });

  describe('Accessibility', () => {
    it('has alert role for error variant', () => {
      render(<Alert variant="error" data-testid="alert">Error</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveAttribute('role', 'alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('has status role for non-error variants', () => {
      render(<Alert variant="success" data-testid="alert">Success</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveAttribute('role', 'status');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('dismiss button has accessible label', () => {
      render(<Alert dismissible>Alert</Alert>);
      const dismissButton = screen.getByLabelText('Dismiss alert');
      expect(dismissButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<Alert className="custom-class" data-testid="alert">Alert</Alert>);
      expect(screen.getByTestId('alert')).toHaveClass('custom-class');
    });

    it('applies base styles', () => {
      render(<Alert data-testid="alert">Alert</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('rounded-lg', 'border', 'p-4');
    });

    it('applies smaller text when title is present', () => {
      render(<Alert title="Title">Content</Alert>);
      const content = screen.getByText('Content');
      expect(content).toHaveClass('text-sm');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Alert</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});

describe('AlertList', () => {
  it('renders multiple alerts', () => {
    render(
      <AlertList>
        <Alert>Alert 1</Alert>
        <Alert>Alert 2</Alert>
        <Alert>Alert 3</Alert>
      </AlertList>
    );

    expect(screen.getByText('Alert 1')).toBeInTheDocument();
    expect(screen.getByText('Alert 2')).toBeInTheDocument();
    expect(screen.getByText('Alert 3')).toBeInTheDocument();
  });

  it('applies spacing classes', () => {
    const { container } = render(
      <AlertList>
        <Alert>Alert 1</Alert>
        <Alert>Alert 2</Alert>
      </AlertList>
    );

    const listContainer = container.firstChild;
    expect(listContainer).toHaveClass('space-y-4');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AlertList className="custom-list-class">
        <Alert>Alert</Alert>
      </AlertList>
    );

    const listContainer = container.firstChild;
    expect(listContainer).toHaveClass('custom-list-class');
  });
});
