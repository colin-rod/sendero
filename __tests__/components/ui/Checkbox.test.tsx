import React from 'react';

/**
 * Component Tests: Checkbox
 *
 * Tests for the Checkbox UI component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '@/components/ui/Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('should render checkbox with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText(/accept terms/i)).toBeInTheDocument();
    });

    it('should render unchecked by default', () => {
      render(<Checkbox label="Option" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('should render checked when checked prop is true', () => {
      render(<Checkbox label="Option" checked readOnly />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
  });

  describe('Interactions', () => {
    it('should toggle checked state on click', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Toggle me" />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('should call onChange handler when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Checkbox label="Option" onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should pass checked state to onChange handler', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Checkbox label="Option" onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            checked: true,
          }),
        })
      );
    });

    it('should toggle via label click', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click label" />);

      const label = screen.getByText(/click label/i);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      await user.click(label);
      expect(checkbox).toBeChecked();
    });
  });

  describe('Controlled component', () => {
    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const { rerender } = render(
        <Checkbox label="Controlled" checked={false} onChange={handleChange} />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalled();

      rerender(<Checkbox label="Controlled" checked={true} onChange={handleChange} />);
      expect(checkbox).toBeChecked();
    });
  });

  describe('HTML attributes', () => {
    it('should support disabled attribute', () => {
      render(<Checkbox label="Disabled" disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should not toggle when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Checkbox label="Disabled" disabled onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(checkbox).not.toBeChecked();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should support name attribute', () => {
      render(<Checkbox label="Option" name="terms" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'terms');
    });

    it('should support value attribute', () => {
      render(<Checkbox label="Option" value="agreed" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'agreed');
    });

    it('should support custom className', () => {
      render(<Checkbox label="Option" className="custom-class" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('custom-class');
    });
  });

  describe('Styling', () => {
    it('should have proper checkbox styling classes', () => {
      render(<Checkbox label="Styled" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-4', 'w-4', 'rounded', 'border-border');
    });

    it('should have primary color when checked', () => {
      render(<Checkbox label="Checked" checked readOnly />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('text-primary-500');
    });

    it('should have focus ring styles', () => {
      render(<Checkbox label="Focusable" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('focus:ring-2', 'focus:ring-primary-500');
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox label="Option" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('should allow programmatic focus via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox label="Option" ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have checkbox role', () => {
      render(<Checkbox label="Accessible" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Keyboard" />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      expect(checkbox).toHaveFocus();

      await user.keyboard(' ');
      expect(checkbox).toBeChecked();

      await user.keyboard(' ');
      expect(checkbox).not.toBeChecked();
    });

    it('should associate label with checkbox', () => {
      render(<Checkbox label="Associated label" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText(/associated label/i);

      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });
  });
});
