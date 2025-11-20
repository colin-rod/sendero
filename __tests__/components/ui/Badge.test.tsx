import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge, IconBadge, NumberBadge } from '@/components/ui/Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders with default variant and size', () => {
      render(<Badge data-testid="badge">Default</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-muted', 'text-muted-foreground');
      expect(badge).toHaveClass('px-2.5', 'py-0.5', 'text-xs');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Badge variant="default" data-testid="badge">Default</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-muted', 'text-muted-foreground');
    });

    it('renders primary variant', () => {
      render(<Badge variant="primary" data-testid="badge">Primary</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-primary-100', 'text-primary-700');
    });

    it('renders accent variant', () => {
      render(<Badge variant="accent" data-testid="badge">Accent</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-accent-100', 'text-accent-700');
    });

    it('renders success variant', () => {
      render(<Badge variant="success" data-testid="badge">Success</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-success-100', 'text-success-700');
    });

    it('renders error variant', () => {
      render(<Badge variant="error" data-testid="badge">Error</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-error-100', 'text-error-700');
    });

    it('renders warning variant', () => {
      render(<Badge variant="warning" data-testid="badge">Warning</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-warning-100', 'text-warning-700');
    });

    it('renders info variant', () => {
      render(<Badge variant="info" data-testid="badge">Info</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-info-100', 'text-info-700');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Badge size="sm" data-testid="badge">Small</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders medium size', () => {
      render(<Badge size="md" data-testid="badge">Medium</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('px-2.5', 'py-0.5', 'text-xs');
    });

    it('renders large size', () => {
      render(<Badge size="lg" data-testid="badge">Large</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('px-3', 'py-1', 'text-sm');
    });
  });

  describe('Icon', () => {
    it('renders with icon', () => {
      const Icon = () => <span data-testid="icon">★</span>;
      render(<Badge icon={<Icon />}>With Icon</Badge>);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders without icon', () => {
      const { container } = render(<Badge>No Icon</Badge>);
      expect(container.querySelector('[data-testid="icon"]')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<Badge className="custom-class" data-testid="badge">Badge</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('custom-class');
    });

    it('applies base styles', () => {
      render(<Badge data-testid="badge">Badge</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('inline-flex', 'items-center', 'justify-center', 'rounded-full');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});

describe('IconBadge', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(<IconBadge data-testid="icon-badge">🚴</IconBadge>);
      expect(screen.getByTestId('icon-badge')).toHaveTextContent('🚴');
    });

    it('renders with default variant and size', () => {
      render(<IconBadge data-testid="icon-badge">Icon</IconBadge>);
      const badge = screen.getByTestId('icon-badge');
      expect(badge).toHaveClass('bg-primary-100', 'text-primary-600');
      expect(badge).toHaveClass('h-10', 'w-10');
    });
  });

  describe('Variants', () => {
    it('renders primary variant', () => {
      render(<IconBadge variant="primary" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-primary-100', 'text-primary-600');
    });

    it('renders accent variant', () => {
      render(<IconBadge variant="accent" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-accent-100', 'text-accent-600');
    });

    it('renders success variant', () => {
      render(<IconBadge variant="success" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-success-100', 'text-success-600');
    });

    it('renders error variant', () => {
      render(<IconBadge variant="error" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-error-100', 'text-error-600');
    });

    it('renders warning variant', () => {
      render(<IconBadge variant="warning" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-warning-100', 'text-warning-600');
    });

    it('renders info variant', () => {
      render(<IconBadge variant="info" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-info-100', 'text-info-600');
    });

    it('renders muted variant', () => {
      render(<IconBadge variant="muted" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-muted', 'text-muted-foreground');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<IconBadge size="sm" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('h-8', 'w-8');
    });

    it('renders medium size', () => {
      render(<IconBadge size="md" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('h-10', 'w-10');
    });

    it('renders large size', () => {
      render(<IconBadge size="lg" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('h-12', 'w-12');
    });

    it('renders extra large size', () => {
      render(<IconBadge size="xl" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('h-16', 'w-16');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<IconBadge className="custom-class" data-testid="badge">Icon</IconBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('custom-class');
    });

    it('applies base styles', () => {
      render(<IconBadge data-testid="badge">Icon</IconBadge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('flex', 'items-center', 'justify-center', 'rounded-full', 'shrink-0');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<IconBadge ref={ref}>Icon</IconBadge>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});

describe('NumberBadge', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(<NumberBadge>42</NumberBadge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders with default variant and size', () => {
      render(<NumberBadge data-testid="badge">1</NumberBadge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-primary-500', 'text-white');
      expect(badge).toHaveClass('h-12', 'w-12', 'text-2xl');
    });
  });

  describe('Variants', () => {
    it('renders primary variant', () => {
      render(<NumberBadge variant="primary" data-testid="badge">1</NumberBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-primary-500', 'text-white');
    });

    it('renders accent variant', () => {
      render(<NumberBadge variant="accent" data-testid="badge">2</NumberBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-accent-500', 'text-white');
    });

    it('renders muted variant', () => {
      render(<NumberBadge variant="muted" data-testid="badge">3</NumberBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-muted', 'text-foreground');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<NumberBadge size="sm" data-testid="badge">1</NumberBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('h-6', 'w-6', 'text-xs');
    });

    it('renders medium size', () => {
      render(<NumberBadge size="md" data-testid="badge">2</NumberBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('h-8', 'w-8', 'text-sm');
    });

    it('renders large size', () => {
      render(<NumberBadge size="lg" data-testid="badge">3</NumberBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('h-12', 'w-12', 'text-2xl');
    });

    it('renders extra large size', () => {
      render(<NumberBadge size="xl" data-testid="badge">4</NumberBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('h-16', 'w-16', 'text-3xl');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<NumberBadge className="custom-class" data-testid="badge">1</NumberBadge>);
      expect(screen.getByTestId('badge')).toHaveClass('custom-class');
    });

    it('applies base styles', () => {
      render(<NumberBadge data-testid="badge">1</NumberBadge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('flex', 'items-center', 'justify-center', 'rounded-full', 'shrink-0', 'font-semibold');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<NumberBadge ref={ref}>1</NumberBadge>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
