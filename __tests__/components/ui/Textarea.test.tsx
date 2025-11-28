import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '@/components/ui/Textarea';

describe('Textarea Component', () => {
  it('should render with placeholder', () => {
    render(<Textarea placeholder="Enter your message" />);
    expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<Textarea label="Message" placeholder="Enter message" />);
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('should render with error message', () => {
    render(<Textarea error="This field is required" placeholder="Enter text" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should apply error styles when error is present', () => {
    render(<Textarea error="Error message" placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toHaveClass('border-red-500');
  });

  it('should handle text input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Textarea
        placeholder="Enter text"
        onChange={handleChange}
      />
    );

    const textarea = screen.getByPlaceholderText('Enter text');
    await user.type(textarea, 'Hello World');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should support controlled component', () => {
    const { rerender } = render(
      <Textarea value="Initial value" onChange={() => {}} />
    );

    let textarea = screen.getByDisplayValue('Initial value');
    expect(textarea).toBeInTheDocument();

    rerender(<Textarea value="Updated value" onChange={() => {}} />);

    textarea = screen.getByDisplayValue('Updated value');
    expect(textarea).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeDisabled();
  });

  it('should apply custom className', () => {
    render(<Textarea className="custom-class" placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toHaveClass('custom-class');
  });

  it('should apply custom rows when specified', () => {
    render(<Textarea rows={6} placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toHaveAttribute('rows', '6');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} placeholder="Enter text" />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('should render with required attribute', () => {
    render(<Textarea required placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeRequired();
  });

  it('should render with maxLength attribute', () => {
    render(<Textarea maxLength={100} placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toHaveAttribute('maxLength', '100');
  });
});
