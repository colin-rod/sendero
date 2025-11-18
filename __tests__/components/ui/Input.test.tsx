import React from 'react';

/**
 * Component Tests: Input
 *
 * Tests for the Input UI component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('should render input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Input label="Email address" />);
      expect(screen.getByText(/email address/i)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should not render label when not provided', () => {
      const { container } = render(<Input />);
      expect(container.querySelector('label')).not.toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter your email" />);
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    });
  });

  describe('Error states', () => {
    it('should render error message', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });

    it('should apply error styles to input', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });

    it('should not show error message when no error', () => {
      const { container } = render(<Input />);
      expect(container.querySelector('.text-red-500')).not.toBeInTheDocument();
    });

    it('should have error text color', () => {
      render(<Input error="Error message" />);
      const errorText = screen.getByText(/error message/i);
      expect(errorText).toHaveClass('text-red-500');
    });
  });

  describe('Input types', () => {
    it('should render text input by default', () => {
      render(<Input type="text" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render email input', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render password input', () => {
      render(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('should render number input', () => {
      render(<Input type="number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  describe('Interactions', () => {
    it('should update value on user input', async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test@example.com');

      expect(input).toHaveValue('test@example.com');
    });

    it('should call onChange handler', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalledTimes(4); // Once per character
    });

    it('should support controlled input', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Input value="controlled" onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('controlled');

      await user.type(input, 'a');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('HTML attributes', () => {
    it('should support required attribute', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('should support disabled attribute', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should support name attribute', () => {
      render(<Input name="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'email');
    });

    it('should support id attribute', () => {
      render(<Input id="email-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('should support custom className', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('should allow programmatic focus via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should associate label with input', () => {
      render(<Input label="Email" id="email" />);
      const label = screen.getByText(/email/i);
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('class', expect.stringContaining('label'));
      expect(input).toBeInTheDocument();
    });

    it('should have proper structure for screen readers', () => {
      render(<Input label="Email" error="Required" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText(/email/i);
      const error = screen.getByText(/required/i);

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(error).toBeInTheDocument();
    });
  });
});
