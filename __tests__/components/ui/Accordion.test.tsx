import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';

describe('Accordion Component', () => {
  const testItems = [
    {
      value: 'item-1',
      trigger: 'Question 1',
      content: 'Answer 1',
    },
    {
      value: 'item-2',
      trigger: 'Question 2',
      content: 'Answer 2',
    },
  ];

  describe('Single Type Accordion', () => {
    it('should render accordion with items', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText('Question 1')).toBeInTheDocument();
    });

    it('should expand item when clicked', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Question 1');
      await user.click(trigger);

      expect(screen.getByText('Answer 1')).toBeVisible();
    });

    it('should collapse expanded item when clicked again', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Question 1');

      // Expand
      await user.click(trigger);
      expect(screen.getByText('Answer 1')).toBeVisible();

      // Collapse
      await user.click(trigger);

      // Content should not be visible anymore (has opacity-0 in parent container)
      const content = screen.getByText('Answer 1');
      expect(content.parentElement?.parentElement).toHaveClass('opacity-0');
    });

    it('should only allow one item open at a time', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          {testItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );

      // Open first item
      const trigger1 = screen.getByText('Question 1');
      await user.click(trigger1);
      expect(screen.getByText('Answer 1')).toBeVisible();

      // Open second item
      const trigger2 = screen.getByText('Question 2');
      await user.click(trigger2);
      expect(screen.getByText('Answer 2')).toBeVisible();

      // First item content should have opacity-0 class when closed
      const content1 = screen.getByText('Answer 1');
      expect(content1.parentElement?.parentElement).toHaveClass('opacity-0');
    });

    it('should have default value expanded', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText('Answer 1')).toBeVisible();
    });
  });

  describe('Multiple Type Accordion', () => {
    it('should allow multiple items to be open', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="multiple">
          {testItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );

      // Open both items
      await user.click(screen.getByText('Question 1'));
      await user.click(screen.getByText('Question 2'));

      // Both should be visible
      expect(screen.getByText('Answer 1')).toBeVisible();
      expect(screen.getByText('Answer 2')).toBeVisible();
    });

    it('should support default values for multiple items', () => {
      render(
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
          {testItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );

      expect(screen.getByText('Answer 1')).toBeVisible();
      expect(screen.getByText('Answer 2')).toBeVisible();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: 'Question 1' });
      expect(trigger).toHaveAttribute('aria-expanded');
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: 'Question 1' });

      // Focus the trigger
      trigger.focus();
      expect(trigger).toHaveFocus();

      // Press Enter to expand
      await user.keyboard('{Enter}');
      expect(screen.getByText('Answer 1')).toBeVisible();
    });
  });

  describe('Styling', () => {
    it('should apply custom className to Accordion', () => {
      const { container } = render(
        <Accordion type="single" className="custom-accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const accordion = container.firstChild;
      expect(accordion).toHaveClass('custom-accordion');
    });

    it('should support custom className on items', () => {
      const { container } = render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="custom-item">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Find the AccordionItem div (which has the custom className)
      const itemDiv = container.querySelector('.custom-item');
      expect(itemDiv).toHaveClass('custom-item');
    });
  });
});
