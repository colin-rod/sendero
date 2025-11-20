import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spinner, SpinnerFullPage, SpinnerButton } from '@/components/ui/Spinner';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('has loading status role', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveAttribute('role', 'status');
    });

    it('has default aria-label', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });

    it('uses custom label', () => {
      render(<Spinner label="Processing..." data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveAttribute('aria-label', 'Processing...');
      expect(screen.getByText('Processing...')).toHaveClass('sr-only');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Spinner size="sm" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('h-4', 'w-4', 'border-2');
    });

    it('renders medium size', () => {
      render(<Spinner size="md" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('h-6', 'w-6', 'border-2');
    });

    it('renders large size', () => {
      render(<Spinner size="lg" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('h-8', 'w-8', 'border-3');
    });

    it('renders extra large size', () => {
      render(<Spinner size="xl" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('h-12', 'w-12', 'border-4');
    });
  });

  describe('Variants', () => {
    it('renders primary variant', () => {
      render(<Spinner variant="primary" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('border-primary-200', 'border-t-primary-600');
    });

    it('renders accent variant', () => {
      render(<Spinner variant="accent" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('border-accent-200', 'border-t-accent-600');
    });

    it('renders white variant', () => {
      render(<Spinner variant="white" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('border-white/20', 'border-t-white');
    });

    it('renders current variant', () => {
      render(<Spinner variant="current" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('border-current/20', 'border-t-current');
    });
  });

  describe('Styling', () => {
    it('applies animation classes', () => {
      render(<Spinner data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('animate-spin', 'rounded-full');
    });

    it('applies custom className', () => {
      render(<Spinner className="custom-class" data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('custom-class');
    });

    it('applies inline-block display', () => {
      render(<Spinner data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('inline-block');
    });
  });
});

describe('SpinnerFullPage', () => {
  describe('Rendering', () => {
    it('renders spinner centered on page', () => {
      render(<SpinnerFullPage data-testid="full-page" />);
      const container = screen.getByTestId('full-page');
      expect(container).toHaveClass('flex', 'min-h-screen', 'flex-col', 'items-center', 'justify-center');
    });

    it('renders with default props', () => {
      const { container } = render(<SpinnerFullPage data-testid="full-page" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
    });

    it('displays message when provided', () => {
      render(<SpinnerFullPage message="Please wait..." data-testid="full-page" />);
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('does not display message when not provided', () => {
      const { container } = render(<SpinnerFullPage data-testid="full-page" />);
      const messageElement = container.querySelector('p');
      expect(messageElement).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('passes size to Spinner', () => {
      const { container } = render(<SpinnerFullPage size="xl" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass('h-12', 'w-12');
    });

    it('passes variant to Spinner', () => {
      const { container } = render(<SpinnerFullPage variant="accent" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass('border-accent-200');
    });

    it('passes label to Spinner', () => {
      const { container } = render(<SpinnerFullPage label="Loading page..." />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveAttribute('aria-label', 'Loading page...');
    });
  });

  describe('Styling', () => {
    it('applies muted text color to message', () => {
      render(<SpinnerFullPage message="Loading..." />);
      const message = screen.getByText('Loading...');
      expect(message).toHaveClass('text-muted-foreground');
    });
  });
});

describe('SpinnerButton', () => {
  describe('Rendering', () => {
    it('renders as small spinner', () => {
      const { container } = render(<SpinnerButton />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass('h-4', 'w-4');
    });

    it('applies margin-right for inline use', () => {
      const { container } = render(<SpinnerButton />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass('mr-2');
    });
  });

  describe('Variants', () => {
    it('uses current variant by default', () => {
      const { container } = render(<SpinnerButton />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass('border-current/20', 'border-t-current');
    });

    it('renders white variant', () => {
      const { container } = render(<SpinnerButton variant="white" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass('border-white/20', 'border-t-white');
    });
  });

  describe('Props', () => {
    it('passes label to Spinner', () => {
      const { container } = render(<SpinnerButton label="Processing..." />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveAttribute('aria-label', 'Processing...');
    });

    it('applies custom className', () => {
      const { container } = render(<SpinnerButton className="custom-class" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass('custom-class');
    });
  });
});
