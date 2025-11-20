import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Container } from '@/components/ui/Container';

describe('Container', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(<Container>Test Content</Container>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders with default size (xl)', () => {
      const { container } = render(<Container>Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('max-w-7xl');
    });

    it('applies default padding', () => {
      const { container } = render(<Container>Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Container size="sm">Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('max-w-2xl');
    });

    it('renders medium size', () => {
      const { container } = render(<Container size="md">Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('max-w-4xl');
    });

    it('renders large size', () => {
      const { container } = render(<Container size="lg">Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('max-w-6xl');
    });

    it('renders extra large size', () => {
      const { container } = render(<Container size="xl">Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('max-w-7xl');
    });

    it('renders full size', () => {
      const { container } = render(<Container size="full">Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('max-w-full');
    });
  });

  describe('Padding', () => {
    it('includes padding by default', () => {
      const { container } = render(<Container>Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });

    it('removes padding when noPadding is true', () => {
      const { container } = render(<Container noPadding>Content</Container>);
      const div = container.firstChild;
      expect(div).not.toHaveClass('px-4');
      expect(div).not.toHaveClass('sm:px-6');
      expect(div).not.toHaveClass('lg:px-8');
    });

    it('includes padding when noPadding is false', () => {
      const { container } = render(<Container noPadding={false}>Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Base Styles', () => {
    it('applies base centering classes', () => {
      const { container } = render(<Container>Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('mx-auto', 'w-full');
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className', () => {
      const { container } = render(<Container className="custom-class">Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('custom-class');
    });

    it('combines custom className with base classes', () => {
      const { container } = render(<Container className="bg-red-500">Content</Container>);
      const div = container.firstChild;
      expect(div).toHaveClass('bg-red-500', 'mx-auto', 'w-full');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows access to DOM methods via ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);
      expect(ref.current?.querySelector).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = render(<Container />);
      const div = container.firstChild;
      expect(div).toBeInTheDocument();
      expect(div).toBeEmptyDOMElement();
    });

    it('handles multiple children', () => {
      render(
        <Container>
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
        </Container>
      );

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <Container>
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Container>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });
});
