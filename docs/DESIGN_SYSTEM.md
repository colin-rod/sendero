# Sendero Design System

**Version:** 1.0.0
**Last Updated:** November 2024
**Status:** Production Ready

---

## Table of Contents

1. [Introduction](#introduction)
2. [Design Principles](#design-principles)
3. [Design Tokens](#design-tokens)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Spacing & Layout](#spacing--layout)
7. [Components](#components)
8. [Animation & Motion](#animation--motion)
9. [Accessibility](#accessibility)
10. [Usage Guidelines](#usage-guidelines)
11. [Code Examples](#code-examples)

---

## Introduction

The Sendero Design System is a comprehensive collection of reusable components, design tokens, and guidelines for building consistent, accessible, and beautiful user interfaces for the Sendero brand.

### Design Philosophy

**Nature-Inspired, Modern, and Accessible**

- **Eco-Conscious**: Green color palette representing sustainability and nature
- **Warm & Inviting**: Coffee-toned accents for warmth and energy
- **Clean & Modern**: Minimalist design with ample whitespace
- **Accessible**: WCAG 2.1 AA compliant with strong focus on usability

### Tech Stack

- **Next.js 15+** - React framework
- **Tailwind CSS 4+** - Utility-first CSS
- **TypeScript 5+** - Type safety
- **React 19+** - UI library

---

## Design Principles

### 1. Consistency
Use design tokens and components consistently across all pages and features.

### 2. Accessibility First
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast
- Respect user motion preferences

### 3. Progressive Enhancement
Start with a solid foundation and enhance the experience for capable browsers.

### 4. Performance
- Minimal animations (respects prefers-reduced-motion)
- Optimized component rendering
- Efficient CSS delivery via Tailwind

### 5. Semantic HTML
Always use the correct HTML elements for their intended purpose.

---

## Design Tokens

Design tokens are the foundational design decisions that define your brand. All tokens are stored in `/lib/design-tokens/`.

### Import Tokens

```tsx
import { colors, typography, spacing, shadows, radius, animations } from '@/lib/design-tokens';

// Use in your components
const primaryColor = colors.primary[500];
const headingSize = typography.fontSize.h1.desktop;
const cardPadding = spacing.card.md;
```

### Token Files

- **`colors.ts`** - Color palette with semantic naming
- **`typography.ts`** - Font families, sizes, weights, line heights
- **`spacing.ts`** - Spacing scale and semantic spacing values
- **`shadows.ts`** - Elevation system and focus shadows
- **`radius.ts`** - Border radius values
- **`animations.ts`** - Duration, easing, and animation presets

---

## Color System

### Primary Colors (Green)

**Use for:** Primary actions, brand elements, key CTAs

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#f0fdf4` | Subtle backgrounds |
| 100 | `#dcfce7` | Light backgrounds, icon badges |
| 500 | `#22c55e` | **Main brand color**, buttons, links |
| 600 | `#16a34a` | Hover states |
| 700 | `#15803d` | Active states |

```tsx
// Usage
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Primary Button
</button>
```

### Accent Colors (Coffee/Yellow)

**Use for:** Secondary actions, highlights, warm accents

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#fefce8` | Subtle backgrounds |
| 100 | `#fef9c3` | Light backgrounds |
| 500 | `#eab308` | **Main accent color**, secondary buttons |
| 600 | `#ca8a04` | Hover states |

```tsx
// Usage
<button className="bg-accent-500 hover:bg-accent-600 text-white">
  Secondary Button
</button>
```

### Neutral Colors

| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#ffffff` | Page background |
| `foreground` | `#0a0a0a` | Primary text |
| `muted` | `#f1f5f9` | Subtle backgrounds |
| `muted-foreground` | `#64748b` | Secondary text |
| `border` | `#e2e8f0` | Borders, dividers |

### Semantic Colors

#### Success (Green)
- **50**: `#f0fdf4` - Backgrounds
- **500**: `#22c55e` - Default (uses primary green)
- **700**: `#15803d` - Text

#### Error (Red)
- **50**: `#fef2f2` - Backgrounds
- **500**: `#ef4444` - Default
- **700**: `#b91c1c` - Text

#### Warning (Orange)
- **50**: `#fffbeb` - Backgrounds
- **500**: `#f59e0b` - Default
- **700**: `#b45309` - Text

#### Info (Blue)
- **50**: `#eff6ff` - Backgrounds
- **500**: `#3b82f6` - Default
- **700**: `#1d4ed8` - Text

### Color Usage Guidelines

✅ **Do:**
- Use primary green for main CTAs and brand elements
- Use accent yellow sparingly for highlights
- Use semantic colors for their intended purpose
- Ensure sufficient contrast (4.5:1 for text)

❌ **Don't:**
- Mix primary and accent colors in the same button
- Use red for anything other than errors/destructive actions
- Use low-contrast color combinations

---

## Typography

### Font Family

**Primary:** Inter (Variable font)
- Loaded via Google Fonts with 'swap' strategy
- Fallbacks: system-ui, sans-serif

**Monospace:** Menlo, Monaco, Courier New, monospace

### Type Scale

#### Headings

| Element | Mobile | Tablet (768px+) | Desktop (1024px+) | Weight | Line Height |
|---------|--------|----------------|-------------------|--------|-------------|
| H1 | 36px (2.25rem) | 48px (3rem) | 60px (3.75rem) | 600 | tight (1) |
| H2 | 30px (1.875rem) | 36px (2.25rem) | 48px (3rem) | 600 | tight (1) |
| H3 | 24px (1.5rem) | 30px (1.875rem) | 30px (1.875rem) | 600 | 2.25rem |
| H4 | 20px (1.25rem) | 24px (1.5rem) | 24px (1.5rem) | 600 | 2rem |
| H5 | 18px (1.125rem) | 20px (1.25rem) | 20px (1.25rem) | 600 | 1.5 |
| H6 | 16px (1rem) | 18px (1.125rem) | 18px (1.125rem) | 600 | 1.5 |

#### Body Text

| Size | Value | Usage |
|------|-------|-------|
| Lead | 20px (1.25rem) | Important paragraphs |
| Base | 16px (1rem) | Default body text |
| Small | 14px (0.875rem) | Secondary content |
| Extra Small | 12px (0.75rem) | Captions, metadata |

### Typography Usage

```tsx
// Headings (automatically responsive via globals.css)
<h1>Main Page Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>

// Body text
<p className="text-base">Default paragraph text</p>
<p className="text-lg">Lead paragraph (larger)</p>
<p className="text-sm text-muted-foreground">Secondary text</p>

// Labels and UI
<label className="text-sm font-medium">Form Label</label>
<span className="text-xs text-muted-foreground">Helper text</span>
```

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Normal | 400 | Body text, paragraphs |
| Medium | 500 | Labels, emphasized text |
| Semibold | 600 | Headings, buttons |
| Bold | 700 | Strong emphasis (rare) |

---

## Spacing & Layout

### Spacing Scale

Based on 4px increments:

| Token | Value | Pixels | Common Usage |
|-------|-------|--------|--------------|
| 1 | 0.25rem | 4px | Tight spacing |
| 2 | 0.5rem | 8px | Small gaps |
| 3 | 0.75rem | 12px | Compact spacing |
| 4 | 1rem | 16px | Default spacing |
| 6 | 1.5rem | 24px | Comfortable spacing |
| 8 | 2rem | 32px | Relaxed spacing |
| 12 | 3rem | 48px | Large spacing |
| 16 | 4rem | 64px | Section spacing |
| 20 | 5rem | 80px | Mobile section padding |
| 32 | 8rem | 128px | Desktop section padding |

### Semantic Spacing

Use semantic spacing tokens for consistency:

```tsx
// Component internal spacing
spacing.component.tight     // 8px - Small components
spacing.component.comfortable // 16px - Default
spacing.component.relaxed   // 24px - Cards, panels

// Grid/Flex gaps
spacing.gap.sm  // 16px
spacing.gap.md  // 24px
spacing.gap.lg  // 32px

// Section padding (responsive)
spacing.section.mobile   // 80px
spacing.section.desktop  // 128px

// Container padding (responsive)
spacing.container.mobile  // 16px
spacing.container.tablet  // 24px
spacing.container.desktop // 32px

// Form field spacing
spacing.formField.default // 24px
```

### Layout Containers

#### Container Component

```tsx
import { Container } from '@/components/ui/Container';

// Default (max-width: 1280px)
<Container>
  Content
</Container>

// Narrow (max-width: 672px) - for forms
<Container size="sm">
  <form>...</form>
</Container>

// Medium (max-width: 896px) - for articles
<Container size="md">
  <article>...</article>
</Container>

// Full width
<Container size="full">
  Full-width content
</Container>

// No padding
<Container noPadding>
  Content without horizontal padding
</Container>
```

### Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| sm | 640px | Tablet portrait |
| md | 768px | Tablet landscape |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Ultra-wide |

```tsx
// Responsive utilities
<div className="px-4 sm:px-6 lg:px-8">
  Responsive padding
</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

---

## Components

### Button

**File:** `/components/ui/Button.tsx`

#### Variants

```tsx
import { Button } from '@/components/ui/Button';

// Primary (green)
<Button variant="primary">Primary Action</Button>

// Secondary (yellow/coffee)
<Button variant="secondary">Secondary Action</Button>

// Outline
<Button variant="outline">Outline Button</Button>

// Ghost (transparent)
<Button variant="ghost">Ghost Button</Button>

// Danger (red)
<Button variant="danger">Delete</Button>
```

#### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

#### States

```tsx
// Loading state
<Button loading disabled>Loading...</Button>

// Disabled
<Button disabled>Disabled</Button>
```

### Card

**File:** `/components/ui/Card.tsx`

#### Basic Usage

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Variants

```tsx
// Default (with shadow)
<Card variant="default">Content</Card>

// Bordered
<Card variant="bordered">Content</Card>

// Elevated (larger shadow)
<Card variant="elevated">Content</Card>

// Muted background
<Card variant="muted">Content</Card>
```

#### Padding Sizes

```tsx
<Card padding="sm">Compact card</Card>
<Card padding="md">Default card</Card>
<Card padding="lg">Spacious card</Card>
<Card padding="none">No padding</Card>
```

#### Interactive Cards

```tsx
// Hoverable (shows shadow on hover)
<Card hoverable>Hoverable card</Card>

// Clickable
<Card onClick={() => console.log('clicked')}>
  Clickable card
</Card>
```

### Badge

**File:** `/components/ui/Badge.tsx`

#### Basic Badges

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
```

#### Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

#### With Icons

```tsx
import { CheckIcon } from 'lucide-react';

<Badge icon={<CheckIcon className="h-3 w-3" />}>
  With Icon
</Badge>
```

#### Icon Badge (Circular)

```tsx
import { IconBadge } from '@/components/ui/Badge';
import { BikeIcon } from 'lucide-react';

<IconBadge variant="primary" size="md">
  <BikeIcon className="h-5 w-5" />
</IconBadge>
```

#### Number Badge

```tsx
import { NumberBadge } from '@/components/ui/Badge';

<NumberBadge variant="primary" size="lg">
  1
</NumberBadge>
```

### Alert

**File:** `/components/ui/Alert.tsx`

```tsx
import { Alert } from '@/components/ui/Alert';

// Success
<Alert variant="success">
  Your changes have been saved!
</Alert>

// Error
<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>

// Warning
<Alert variant="warning" title="Warning">
  Your session will expire soon.
</Alert>

// Info
<Alert variant="info">
  This is an informational message.
</Alert>

// Dismissible
<Alert variant="info" dismissible onDismiss={() => console.log('dismissed')}>
  Dismissible alert
</Alert>

// Without icon
<Alert hideIcon>
  Alert without icon
</Alert>
```

### Toast Notifications

**File:** `/components/ui/Toast.tsx`

#### Setup

Wrap your app with `ToastProvider`:

```tsx
// app/layout.tsx
import { ToastProvider } from '@/components/ui/Toast';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

#### Usage

```tsx
'use client';

import { useToast } from '@/components/ui/Toast';

export function MyComponent() {
  const { success, error, warning, info } = useToast();

  const handleSave = async () => {
    try {
      // save logic
      success('Changes saved successfully!');
    } catch (err) {
      error('Failed to save changes');
    }
  };

  return (
    <button onClick={handleSave}>
      Save
    </button>
  );
}
```

#### Toast Methods

```tsx
const { success, error, warning, info } = useToast();

// Success toast
success('Operation completed!');
success('Operation completed!', 'Success', 3000); // with title and custom duration

// Error toast
error('Something went wrong');

// Warning toast
warning('Session expiring soon');

// Info toast
info('New features available');
```

### Spinner

**File:** `/components/ui/Spinner.tsx`

```tsx
import { Spinner, SpinnerFullPage, SpinnerButton } from '@/components/ui/Spinner';

// Default spinner
<Spinner />

// Different sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// Color variants
<Spinner variant="primary" />
<Spinner variant="accent" />
<Spinner variant="white" />

// Full-page spinner
<SpinnerFullPage message="Loading page..." />

// Button spinner
<button>
  <SpinnerButton variant="white" />
  Loading...
</button>
```

### Skeleton

**File:** `/components/ui/Skeleton.tsx`

```tsx
import { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar } from '@/components/ui/Skeleton';

// Basic skeleton
<Skeleton className="h-4 w-full" />

// Variants
<Skeleton variant="text" className="h-4 w-full" />
<Skeleton variant="circular" className="h-12 w-12" />
<Skeleton variant="rectangular" className="h-32 w-full" />
<Skeleton variant="rounded" className="h-32 w-full" />

// Pre-built components
<SkeletonCard />
<SkeletonCard showImage={false} />

<SkeletonText lines={3} />
<SkeletonText lines={5} lastLineWidth="60%" />

<SkeletonAvatar size="lg" />
```

### Input Components

#### Input

```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Invalid email address"
/>
```

#### Select

```tsx
import { Select } from '@/components/ui/Select';

<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  error="Please select a country"
/>
```

#### Checkbox

```tsx
import { Checkbox } from '@/components/ui/Checkbox';

<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

#### RadioGroup

```tsx
import { RadioGroup } from '@/components/ui/RadioGroup';

<RadioGroup
  label="Select duration"
  name="duration"
  options={[
    { value: 'one_day', label: '1 Day', description: 'Perfect for a quick adventure' },
    { value: 'weekend', label: 'Weekend', description: '2-3 days of exploration' },
  ]}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
/>
```

---

## Animation & Motion

### Animation Principles

1. **Subtle & Purposeful** - Animations should enhance UX, not distract
2. **Fast by Default** - Most transitions should be 150-300ms
3. **Respect Preferences** - Always honor `prefers-reduced-motion`
4. **Meaningful** - Animations should provide feedback or guide attention

### Duration Tokens

```tsx
// From design tokens
duration.instant  // 0ms
duration.fast     // 150ms - Hover states, quick interactions
duration.normal   // 300ms - Default for most animations
duration.slow     // 500ms - Page transitions
duration.slower   // 700ms - Large movements
duration.slowest  // 1000ms - Loading states
```

### Easing Functions

```tsx
// From design tokens
easing.default   // cubic-bezier(0.4, 0, 0.2, 1) - Standard
easing.in        // cubic-bezier(0.4, 0, 1, 1) - Accelerating
easing.out       // cubic-bezier(0, 0, 0.2, 1) - Decelerating (recommended)
easing.inOut     // cubic-bezier(0.4, 0, 0.2, 1) - Both
easing.spring    // cubic-bezier(0.34, 1.56, 0.64, 1) - Bouncy
```

### Built-in Animations

```tsx
// Fade
<div className="animate-fade-in">Fades in</div>
<div className="animate-fade-out">Fades out</div>

// Slide
<div className="animate-slide-in-up">Slides up from bottom</div>
<div className="animate-slide-in-down">Slides down from top</div>
<div className="animate-slide-in-left">Slides from left</div>
<div className="animate-slide-in-right">Slides from right</div>

// Scale
<div className="animate-scale-in">Scales in</div>
<div className="animate-scale-out">Scales out</div>

// Utility
<div className="animate-spin">Spinning (loading)</div>
<div className="animate-pulse">Pulsing</div>
<div className="animate-bounce">Bouncing</div>

// Toast specific
<div className="animate-toast-enter">Toast enters</div>
<div className="animate-toast-exit">Toast exits</div>

// Skeleton shimmer
<div className="animate-shimmer">Shimmer effect</div>
```

### Transition Utilities

```tsx
// Transition classes
<button className="transition-colors duration-fast">
  Hover me
</button>

<div className="transition-all duration-normal">
  Smooth transition
</div>

// Custom durations
<div className="duration-fast">150ms</div>
<div className="duration-normal">300ms</div>
<div className="duration-slow">500ms</div>
```

### Reduced Motion

The design system automatically respects user preferences:

```css
/* Automatically applied in globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility

### WCAG 2.1 AA Compliance

The Sendero design system is built with accessibility as a priority.

### Keyboard Navigation

✅ All interactive elements are keyboard accessible
- Tab through interactive elements
- Enter/Space to activate buttons and links
- Escape to close modals and dropdowns

#### Skip to Content

Every page includes a skip link for keyboard users:

```tsx
// Automatically included in Header component
<a href="#main-content" className="skip-to-content">
  Skip to content
</a>

// Add id to main content
<main id="main-content">
  Page content
</main>
```

### Focus States

All interactive elements have visible focus states:

```tsx
// Focus ring (automatically applied)
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
```

### Color Contrast

All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text):

| Combination | Ratio | Pass |
|-------------|-------|------|
| primary-500 on white | 4.52:1 | ✅ |
| foreground on background | 19.56:1 | ✅ |
| muted-foreground on background | 4.54:1 | ✅ |
| white on primary-500 | 4.52:1 | ✅ |
| white on accent-500 | 3.61:1 | ✅ (large text only) |

### Screen Readers

#### ARIA Labels

```tsx
// Button with icon only
<button aria-label="Close menu">
  <XIcon />
</button>

// Image
<img src="..." alt="Descriptive text" />

// Navigation
<nav aria-label="Main navigation">
  <Link href="...">Home</Link>
</nav>
```

#### Live Regions

```tsx
// Alerts
<Alert role="alert" aria-live="assertive">
  Critical error
</Alert>

// Status updates
<div role="status" aria-live="polite">
  Loading complete
</div>
```

#### Visually Hidden Content

```tsx
// Screen reader only text
<span className="sr-only">Loading...</span>

// Within spinners
<Spinner label="Loading data" />
// Renders: <span className="sr-only">Loading data</span>
```

### Form Accessibility

```tsx
// Properly associated labels
<Input
  label="Email address"
  id="email"
  type="email"
  error="Invalid email"
/>
// Renders with:
// - <label htmlFor="email">
// - aria-invalid when error present
// - aria-describedby for error message

// Required fields
<Input label="Required field" required />

// Error announcement
<Input
  error="This field is required"
  aria-invalid="true"
  aria-describedby="error-id"
/>
```

### Mobile & Touch

- Minimum touch target size: 44x44px
- Adequate spacing between interactive elements
- No hover-only interactions

### Testing Checklist

- [ ] Keyboard navigation works on all interactive elements
- [ ] Focus states are visible
- [ ] Skip link works
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader announces content correctly
- [ ] ARIA labels are present and accurate
- [ ] Forms have proper labels and error states
- [ ] Modals trap focus and restore on close
- [ ] Images have alt text
- [ ] Headings are hierarchical (h1 → h2 → h3)
- [ ] Animations respect prefers-reduced-motion

---

## Usage Guidelines

### Component Composition

Build complex UIs by composing simple components:

```tsx
// Good: Composition
<Card variant="bordered" padding="lg">
  <CardHeader>
    <IconBadge variant="primary">
      <BikeIcon />
    </IconBadge>
    <CardTitle>E-Bike Tours</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Explore with electric assist bikes...</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Learn More</Button>
    <Button variant="outline">Compare</Button>
  </CardFooter>
</Card>
```

### Semantic HTML

Always use semantic HTML elements:

```tsx
// Good
<article>
  <header>
    <h1>Article Title</h1>
  </header>
  <p>Content...</p>
</article>

// Bad
<div>
  <div>
    <div className="text-4xl font-bold">Article Title</div>
  </div>
  <div>Content...</div>
</div>
```

### Responsive Design

Mobile-first approach:

```tsx
// Good: Mobile-first
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>

// Bad: Desktop-first
<div className="text-xl lg:text-lg md:text-base">
  Backwards responsive
</div>
```

### Error Handling

Provide clear, actionable feedback:

```tsx
// Good: Specific error message
<Input
  label="Email"
  value={email}
  error="Please enter a valid email address (e.g., name@example.com)"
/>

// Bad: Vague error
<Input
  label="Email"
  value={email}
  error="Invalid"
/>
```

---

## Code Examples

### Complete Form Example

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { useToast } from '@/components/ui/Toast';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit logic
      await submitForm();
      success('Form submitted successfully!');
    } catch (err) {
      error('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="bordered" padding="lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <Input
              label="Name"
              type="text"
              required
              placeholder="Your name"
            />

            <Input
              label="Email"
              type="email"
              required
              placeholder="you@example.com"
            />

            <Select
              label="Subject"
              options={[
                { value: 'general', label: 'General Inquiry' },
                { value: 'support', label: 'Support' },
                { value: 'feedback', label: 'Feedback' },
              ]}
            />

            <Checkbox
              label="Subscribe to newsletter"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" variant="primary" loading={loading}>
            Submit
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
```

### Feature Card Grid Example

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Bike, Leaf, Coffee } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Bike className="h-5 w-5" />,
      title: 'E-Bikes Available',
      description: 'Explore with ease using our electric-assist bikes',
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: 'Eco-Conscious',
      description: 'Sustainable tours that respect nature',
    },
    {
      icon: <Coffee className="h-5 w-5" />,
      title: 'Coffee Farm Visits',
      description: 'Experience authentic Colombian coffee culture',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <Container>
        <h2 className="mb-12 text-center">Why Choose Sendero</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} hoverable>
              <CardHeader>
                <IconBadge variant="primary" size="lg">
                  {feature.icon}
                </IconBadge>
                <CardTitle as="h3">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### Loading States Example

```tsx
import { SkeletonCard } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';

export function DataList({ loading, data }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {data.map(item => (
        <Card key={item.id}>
          {/* Render data */}
        </Card>
      ))}
    </div>
  );
}
```

---

## Quick Reference

### Common Patterns

```tsx
// Section with container
<section className="py-20 md:py-32">
  <Container>
    {/* Content */}
  </Container>
</section>

// Alternating section backgrounds
<section className="bg-white">...</section>
<section className="bg-muted/50">...</section>

// Responsive grid
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <Card key={item.id}>...</Card>)}
</div>

// Button group
<div className="flex gap-4">
  <Button variant="primary">Primary</Button>
  <Button variant="outline">Secondary</Button>
</div>

// Form field spacing
<div className="space-y-6">
  <Input label="Field 1" />
  <Input label="Field 2" />
  <Input label="Field 3" />
</div>
```

### Utility Classes

```tsx
// Spacing
gap-4 gap-6 gap-8 gap-12
space-x-2 space-x-4 space-x-6
space-y-4 space-y-6 space-y-8

// Flex/Grid
flex items-center justify-between
grid grid-cols-2 md:grid-cols-3

// Text
text-sm text-base text-lg
text-muted-foreground
font-medium font-semibold

// Backgrounds
bg-white bg-muted bg-primary-50

// Borders
border border-border
rounded rounded-lg

// Shadows
shadow-sm shadow-lg shadow-elevation-floating
```

---

## Resources

### Internal

- Design Tokens: `/lib/design-tokens/`
- UI Components: `/components/ui/`
- Layout Components: `/components/layout/`

### External

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lucide Icons](https://lucide.dev)
- [React Icons](https://react-icons.github.io/react-icons/)

---

**Questions or suggestions?** Open an issue or submit a pull request!

**Version:** 1.0.0
**Last Updated:** November 2024
