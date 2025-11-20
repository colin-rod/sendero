import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with default variant and padding', () => {
      render(<Card data-testid="card">Default card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-sm', 'p-6');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Card variant="default" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('shadow-sm');
    });

    it('renders bordered variant', () => {
      render(<Card variant="bordered" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('border', 'border-border');
    });

    it('renders elevated variant', () => {
      render(<Card variant="elevated" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('shadow-lg');
    });

    it('renders muted variant', () => {
      render(<Card variant="muted" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('border', 'border-border', 'bg-muted/50');
    });
  });

  describe('Padding', () => {
    it('renders with no padding', () => {
      render(<Card padding="none" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('p-0');
    });

    it('renders with small padding', () => {
      render(<Card padding="sm" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('p-4');
    });

    it('renders with medium padding', () => {
      render(<Card padding="md" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('p-6');
    });

    it('renders with large padding', () => {
      render(<Card padding="lg" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('p-8');
    });
  });

  describe('Hoverable', () => {
    it('applies hover styles when hoverable is true', () => {
      render(<Card hoverable data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('transition-shadow', 'duration-fast', 'hover:shadow-elevation-floating', 'cursor-pointer');
    });

    it('does not apply hover styles when hoverable is false', () => {
      render(<Card hoverable={false} data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Interactive (onClick)', () => {
    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick} data-testid="card">Clickable card</Card>);

      const card = screen.getByTestId('card');
      fireEvent.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick} data-testid="card">Clickable</Card>);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('handles Enter key press', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick} data-testid="card">Clickable</Card>);

      const card = screen.getByTestId('card');
      fireEvent.keyDown(card, { key: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles Space key press', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick} data-testid="card">Clickable</Card>);

      const card = screen.getByTestId('card');
      fireEvent.keyDown(card, { key: ' ' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not handle other key presses', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick} data-testid="card">Clickable</Card>);

      const card = screen.getByTestId('card');
      fireEvent.keyDown(card, { key: 'a' });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies focus styles when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick} data-testid="card">Clickable</Card>);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2');
    });
  });

  describe('Custom role', () => {
    it('uses custom role when provided', () => {
      render(<Card role="article" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveAttribute('role', 'article');
    });

    it('custom role overrides default button role', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick} role="link" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveAttribute('role', 'link');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });

    it('applies base styles', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg', 'bg-white');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});

describe('CardHeader', () => {
  it('renders children content', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies default margin bottom', () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    const header = container.firstChild;
    expect(header).toHaveClass('mb-4');
  });

  it('applies custom className', () => {
    const { container } = render(<CardHeader className="custom-class">Header</CardHeader>);
    const header = container.firstChild;
    expect(header).toHaveClass('custom-class', 'mb-4');
  });
});

describe('CardTitle', () => {
  it('renders children content', () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title.tagName).toBe('H3');
  });

  it('renders as custom heading level', () => {
    render(<CardTitle as="h2">Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title.tagName).toBe('H2');
  });

  it('applies font-semibold class', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText('Title')).toHaveClass('font-semibold');
  });

  it('applies custom className', () => {
    render(<CardTitle className="custom-class">Title</CardTitle>);
    expect(screen.getByText('Title')).toHaveClass('custom-class', 'font-semibold');
  });
});

describe('CardContent', () => {
  it('renders children content', () => {
    render(<CardContent>Content text</CardContent>);
    expect(screen.getByText('Content text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<CardContent className="custom-class">Content</CardContent>);
    const content = container.firstChild;
    expect(content).toHaveClass('custom-class');
  });
});

describe('CardFooter', () => {
  it('renders children content', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    const footer = container.firstChild;
    expect(footer).toHaveClass('mt-6', 'flex', 'items-center', 'gap-2');
  });

  it('applies custom className', () => {
    const { container } = render(<CardFooter className="custom-class">Footer</CardFooter>);
    const footer = container.firstChild;
    expect(footer).toHaveClass('custom-class', 'mt-6');
  });
});

describe('Card Composition', () => {
  it('renders complete card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          This is the card content.
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is the card content.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});
