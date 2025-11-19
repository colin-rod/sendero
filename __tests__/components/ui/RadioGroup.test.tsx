/**
 * Component Tests: RadioGroup
 *
 * Tests for the RadioGroup UI component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from '@/components/ui/RadioGroup';

describe('RadioGroup', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1', description: 'First option' },
    { value: 'option2', label: 'Option 2', description: 'Second option' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('should render all radio options', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      expect(screen.getByLabelText(/option 1/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/option 2/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/option 3/i)).toBeInTheDocument();
    });

    it('should render with group label', () => {
      render(<RadioGroup name="test" label="Choose an option" options={mockOptions} />);
      expect(screen.getByText(/choose an option/i)).toBeInTheDocument();
    });

    it('should not render group label when not provided', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      expect(container.querySelector('.label')).not.toBeInTheDocument();
    });

    it('should render option descriptions', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      expect(screen.getByText(/first option/i)).toBeInTheDocument();
      expect(screen.getByText(/second option/i)).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      const option3Container = screen.getByLabelText(/option 3/i).closest('div');
      expect(option3Container?.querySelector('.text-muted-foreground')).not.toBeInTheDocument();
    });

    it('should render no options selected by default', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).not.toBeChecked();
      });
    });

    it('should render selected option when value is provided', () => {
      render(<RadioGroup name="test" options={mockOptions} value="option2" />);

      const option2 = screen.getByLabelText(/option 2/i);
      expect(option2).toBeChecked();
    });
  });

  describe('Interactions', () => {
    it('should select option on click', async () => {
      const user = userEvent.setup();
      const ControlledRadioGroup = () => {
        const [value, setValue] = React.useState<string>('');
        return (
          <RadioGroup
            name="test"
            options={mockOptions}
            value={value}
            onChange={setValue}
          />
        );
      };
      render(<ControlledRadioGroup />);

      const option1 = screen.getByLabelText(/option 1/i);
      await user.click(option1);

      expect(option1).toBeChecked();
    });

    it('should deselect previous option when new option is selected', async () => {
      const user = userEvent.setup();
      const ControlledRadioGroup = () => {
        const [value, setValue] = React.useState<string>('');
        return (
          <RadioGroup
            name="test"
            options={mockOptions}
            value={value}
            onChange={setValue}
          />
        );
      };
      render(<ControlledRadioGroup />);

      const option1 = screen.getByLabelText(/option 1/i);
      const option2 = screen.getByLabelText(/option 2/i);

      await user.click(option1);
      expect(option1).toBeChecked();

      await user.click(option2);
      expect(option2).toBeChecked();
      expect(option1).not.toBeChecked();
    });

    it('should call onChange handler when option is selected', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<RadioGroup name="test" options={mockOptions} onChange={handleChange} />);

      const option1 = screen.getByLabelText(/option 1/i);
      await user.click(option1);

      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('should call onChange with correct value for each option', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<RadioGroup name="test" options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByLabelText(/option 1/i));
      expect(handleChange).toHaveBeenCalledWith('option1');

      await user.click(screen.getByLabelText(/option 2/i));
      expect(handleChange).toHaveBeenCalledWith('option2');

      await user.click(screen.getByLabelText(/option 3/i));
      expect(handleChange).toHaveBeenCalledWith('option3');
    });

    it('should select via label click', async () => {
      const user = userEvent.setup();
      const ControlledRadioGroup = () => {
        const [value, setValue] = React.useState<string>('');
        return (
          <RadioGroup
            name="test"
            options={mockOptions}
            value={value}
            onChange={setValue}
          />
        );
      };
      render(<ControlledRadioGroup />);

      const label = screen.getByText(/option 1/i);
      await user.click(label);

      const option1 = screen.getByLabelText(/option 1/i);
      expect(option1).toBeChecked();
    });

    it('should select via description click', async () => {
      const user = userEvent.setup();
      const ControlledRadioGroup = () => {
        const [value, setValue] = React.useState<string>('');
        return (
          <RadioGroup
            name="test"
            options={mockOptions}
            value={value}
            onChange={setValue}
          />
        );
      };
      render(<ControlledRadioGroup />);

      const description = screen.getByText(/first option/i);
      await user.click(description);

      const option1 = screen.getByLabelText(/option 1/i);
      expect(option1).toBeChecked();
    });
  });

  describe('Controlled component', () => {
    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const { rerender } = render(
        <RadioGroup name="test" options={mockOptions} value="option1" onChange={handleChange} />
      );

      const option1 = screen.getByLabelText(/option 1/i);
      expect(option1).toBeChecked();

      await user.click(screen.getByLabelText(/option 2/i));
      expect(handleChange).toHaveBeenCalledWith('option2');

      rerender(
        <RadioGroup name="test" options={mockOptions} value="option2" onChange={handleChange} />
      );
      expect(screen.getByLabelText(/option 2/i)).toBeChecked();
      expect(option1).not.toBeChecked();
    });

    it('should maintain value from props', () => {
      const { rerender } = render(
        <RadioGroup name="test" options={mockOptions} value="option1" />
      );
      expect(screen.getByLabelText(/option 1/i)).toBeChecked();

      rerender(<RadioGroup name="test" options={mockOptions} value="option3" />);
      expect(screen.getByLabelText(/option 3/i)).toBeChecked();
      expect(screen.getByLabelText(/option 1/i)).not.toBeChecked();
    });
  });

  describe('Error states', () => {
    it('should render error message', () => {
      render(<RadioGroup name="test" options={mockOptions} error="Please select an option" />);
      expect(screen.getByText(/please select an option/i)).toBeInTheDocument();
    });

    it('should not show error when no error prop', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      expect(container.querySelector('.text-red-500')).not.toBeInTheDocument();
    });

    it('should have error text color', () => {
      render(<RadioGroup name="test" options={mockOptions} error="Error message" />);
      const errorText = screen.getByText(/error message/i);
      expect(errorText).toHaveClass('text-red-500');
    });
  });

  describe('Radio button attributes', () => {
    it('should have unique IDs for each option', () => {
      render(<RadioGroup name="test-group" options={mockOptions} />);

      const option1 = screen.getByLabelText(/option 1/i);
      const option2 = screen.getByLabelText(/option 2/i);
      const option3 = screen.getByLabelText(/option 3/i);

      expect(option1).toHaveAttribute('id', 'test-group-option1');
      expect(option2).toHaveAttribute('id', 'test-group-option2');
      expect(option3).toHaveAttribute('id', 'test-group-option3');
    });

    it('should have same name for all options in group', () => {
      render(<RadioGroup name="group-name" options={mockOptions} />);

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('name', 'group-name');
      });
    });

    it('should have correct values', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      expect(screen.getByLabelText(/option 1/i)).toHaveAttribute('value', 'option1');
      expect(screen.getByLabelText(/option 2/i)).toHaveAttribute('value', 'option2');
      expect(screen.getByLabelText(/option 3/i)).toHaveAttribute('value', 'option3');
    });
  });

  describe('Styling', () => {
    it('should have proper radio button styling', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toHaveClass('h-4', 'w-4', 'border-border', 'text-primary-500');
      });
    });

    it('should have focus ring styles', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toHaveClass('focus:ring-2', 'focus:ring-primary-500');
      });
    });

    it('should have cursor pointer on labels', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);

      const labels = container.querySelectorAll('label[for^="test-"]');
      labels.forEach((label) => {
        expect(label).toHaveClass('cursor-pointer');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have radio role for all options', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const ControlledRadioGroup = () => {
        const [value, setValue] = React.useState<string>('');
        return (
          <RadioGroup
            name="test"
            options={mockOptions}
            value={value}
            onChange={setValue}
          />
        );
      };
      render(<ControlledRadioGroup />);

      const option1 = screen.getByLabelText(/option 1/i);
      option1.focus();
      expect(option1).toHaveFocus();

      await user.keyboard(' ');
      expect(option1).toBeChecked();
    });

    it('should navigate with arrow keys', async () => {
      const user = userEvent.setup();
      render(<RadioGroup name="test" options={mockOptions} value="option1" />);

      const option1 = screen.getByLabelText(/option 1/i);
      const option2 = screen.getByLabelText(/option 2/i);

      option1.focus();
      expect(option1).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(option2).toHaveFocus();
    });

    it('should associate labels with radio buttons', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      mockOptions.forEach((option) => {
        const radio = screen.getByLabelText(new RegExp(option.label, 'i'));
        expect(radio).toBeInTheDocument();
        expect(radio).toHaveAttribute('type', 'radio');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle empty options array', () => {
      const { container } = render(<RadioGroup name="test" options={[]} />);
      expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(0);
    });

    it('should handle single option', () => {
      const singleOption = [{ value: 'only', label: 'Only option' }];
      render(<RadioGroup name="test" options={singleOption} />);

      expect(screen.getByLabelText(/only option/i)).toBeInTheDocument();
    });

    it('should handle options without descriptions', () => {
      const optionsNoDesc = [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ];
      render(<RadioGroup name="test" options={optionsNoDesc} />);

      expect(screen.getByLabelText(/one/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/two/i)).toBeInTheDocument();
    });
  });
});
