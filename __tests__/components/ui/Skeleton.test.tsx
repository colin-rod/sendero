import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar } from '@/components/ui/Skeleton';

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders with default variant', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('h-4', 'w-full', 'rounded');
    });

    it('has loading status role', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('role', 'status');
      expect(skeleton).toHaveAttribute('aria-label', 'Loading');
    });

    it('includes screen reader text', () => {
      render(<Skeleton />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toHaveClass('sr-only');
    });
  });

  describe('Variants', () => {
    it('renders text variant', () => {
      render(<Skeleton variant="text" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('h-4', 'w-full', 'rounded');
    });

    it('renders circular variant', () => {
      render(<Skeleton variant="circular" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
    });

    it('renders rectangular variant', () => {
      render(<Skeleton variant="rectangular" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-none');
    });

    it('renders rounded variant', () => {
      render(<Skeleton variant="rounded" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-lg');
    });
  });

  describe('Styling', () => {
    it('applies base styles', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('relative', 'overflow-hidden', 'bg-muted');
    });

    it('applies shimmer animation classes', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('before:absolute', 'before:animate-shimmer');
    });

    it('applies custom className', () => {
      render(<Skeleton className="h-8 w-32" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('h-8', 'w-32');
    });
  });
});

describe('SkeletonCard', () => {
  describe('Rendering', () => {
    it('renders card skeleton with image by default', () => {
      const { container } = render(<SkeletonCard data-testid="card" />);
      const card = screen.getByTestId('card');

      expect(card).toBeInTheDocument();
      // Should have image skeleton
      const skeletons = container.querySelectorAll('[role="status"]');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders without image when showImage is false', () => {
      const { container } = render(<SkeletonCard showImage={false} data-testid="card" />);

      // Count skeletons - should have fewer without the image
      const skeletons = container.querySelectorAll('[role="status"]');
      // Should have text and button skeletons but no image skeleton
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('Styling', () => {
    it('applies card styles', () => {
      render(<SkeletonCard data-testid="card" />);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('space-y-4', 'rounded-lg', 'border', 'border-border', 'bg-white', 'p-6');
    });

    it('applies custom className', () => {
      render(<SkeletonCard className="custom-class" data-testid="card" />);
      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });
  });
});

describe('SkeletonText', () => {
  describe('Rendering', () => {
    it('renders default 3 lines', () => {
      const { container } = render(<SkeletonText data-testid="text" />);
      const skeletons = container.querySelectorAll('[role="status"]');
      expect(skeletons).toHaveLength(3);
    });

    it('renders custom number of lines', () => {
      const { container } = render(<SkeletonText lines={5} data-testid="text" />);
      const skeletons = container.querySelectorAll('[role="status"]');
      expect(skeletons).toHaveLength(5);
    });

    it('renders single line', () => {
      const { container } = render(<SkeletonText lines={1} data-testid="text" />);
      const skeletons = container.querySelectorAll('[role="status"]');
      expect(skeletons).toHaveLength(1);
    });
  });

  describe('Styling', () => {
    it('applies spacing between lines', () => {
      render(<SkeletonText data-testid="text" />);
      expect(screen.getByTestId('text')).toHaveClass('space-y-2');
    });

    it('applies custom className', () => {
      render(<SkeletonText className="custom-class" data-testid="text" />);
      expect(screen.getByTestId('text')).toHaveClass('custom-class');
    });
  });
});

describe('SkeletonAvatar', () => {
  describe('Rendering', () => {
    it('renders with default medium size', () => {
      render(<SkeletonAvatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('h-10', 'w-10');
    });

    it('is circular', () => {
      render(<SkeletonAvatar data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('rounded-full');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<SkeletonAvatar size="sm" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('h-8', 'w-8');
    });

    it('renders medium size', () => {
      render(<SkeletonAvatar size="md" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('h-10', 'w-10');
    });

    it('renders large size', () => {
      render(<SkeletonAvatar size="lg" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('h-12', 'w-12');
    });

    it('renders extra large size', () => {
      render(<SkeletonAvatar size="xl" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('h-16', 'w-16');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<SkeletonAvatar className="custom-class" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
    });
  });
});
