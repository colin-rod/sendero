import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select } from '@/components/ui/Select';

describe('Select', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('renders select with options', () => {
      render(<Select options={mockOptions} />);

      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();

      expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select label="Choose an option" options={mockOptions} />);

      expect(screen.getByText('Choose an option')).toBeInTheDocument();
      // Label is present but not explicitly associated with select
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<Select options={mockOptions} />);

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  describe('Options', () => {
    it('renders all provided options', () => {
      render(<Select options={mockOptions} />);

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3);

      expect(options[0]).toHaveValue('option1');
      expect(options[1]).toHaveValue('option2');
      expect(options[2]).toHaveValue('option3');
    });

    it('renders option labels correctly', () => {
      render(<Select options={mockOptions} />);

      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveTextContent('Option 1');
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveTextContent('Option 2');
      expect(screen.getByRole('option', { name: 'Option 3' })).toHaveTextContent('Option 3');
    });
  });

  describe('Error State', () => {
    it('displays error message when error prop is provided', () => {
      render(<Select options={mockOptions} error="This field is required" />);

      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styles when error prop is provided', () => {
      render(<Select options={mockOptions} error="Error message" />);

      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-red-500', 'focus-visible:ring-red-500');
    });

    it('does not display error message when error prop is not provided', () => {
      render(<Select options={mockOptions} />);

      const errorElement = screen.queryByText(/error/i);
      expect(errorElement).not.toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('handles onChange event', () => {
      const handleChange = jest.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);

      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'option2' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('updates selected value', () => {
      render(<Select options={mockOptions} />);

      const select = screen.getByRole('combobox') as HTMLSelectElement;

      fireEvent.change(select, { target: { value: 'option2' } });

      expect(select.value).toBe('option2');
    });

    it('supports controlled component pattern', () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <Select options={mockOptions} value="option1" onChange={handleChange} />
      );

      let select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('option1');

      rerender(
        <Select options={mockOptions} value="option3" onChange={handleChange} />
      );

      select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('option3');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through native select attributes', () => {
      render(
        <Select
          options={mockOptions}
          name="test-select"
          id="select-id"
          disabled
        />
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('name', 'test-select');
      expect(select).toHaveAttribute('id', 'select-id');
      expect(select).toBeDisabled();
    });

    it('applies custom className', () => {
      render(<Select options={mockOptions} className="custom-class" />);

      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('custom-class');
    });

    it('applies default input class', () => {
      render(<Select options={mockOptions} />);

      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('input');
    });
  });

  describe('Accessibility', () => {
    it('renders label text', () => {
      render(<Select label="Test Label" options={mockOptions} />);

      expect(screen.getByText('Test Label')).toBeInTheDocument();
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('supports required attribute', () => {
      render(<Select options={mockOptions} required />);

      const select = screen.getByRole('combobox');
      expect(select).toBeRequired();
    });

    it('supports aria-label attribute', () => {
      render(<Select options={mockOptions} aria-label="Custom aria label" />);

      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-label', 'Custom aria label');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to select element', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);

      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it('allows access to select methods via ref', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);

      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.blur).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty options array', () => {
      render(<Select options={[]} />);

      const select = screen.getByRole('combobox');
      const options = screen.queryAllByRole('option');

      expect(select).toBeInTheDocument();
      expect(options).toHaveLength(0);
    });

    it('renders with single option', () => {
      const singleOption = [{ value: 'only', label: 'Only Option' }];
      render(<Select options={singleOption} />);

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('Only Option');
    });

    it('handles options with special characters', () => {
      const specialOptions = [
        { value: 'option-1', label: 'Option & Special <Characters>' },
        { value: 'option-2', label: 'Option "with" quotes' },
      ];

      render(<Select options={specialOptions} />);

      expect(screen.getByRole('option', { name: 'Option & Special <Characters>' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option "with" quotes' })).toBeInTheDocument();
    });
  });
});
