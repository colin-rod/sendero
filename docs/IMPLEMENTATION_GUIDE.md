# Design System Implementation Guide

**Quick Start Guide for Sendero Design System**

---

## 🚀 Quick Start (5 Minutes)

### 1. Enable Toast Notifications

Update your root layout to include the ToastProvider:

```tsx
// app/layout.tsx
import { ToastProvider } from '@/components/ui/Toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

### 2. Start Using Components

```tsx
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';

export function MyComponent() {
  const { success, error } = useToast();

  return (
    <Card variant="bordered">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <Badge variant="success">New</Badge>
      </CardHeader>
      <CardContent>
        <Button onClick={() => success('Hello!')}>
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## 📦 What's Included

### Design Tokens
All tokens are available at `/lib/design-tokens/`:
- ✅ Colors (primary, accent, semantic colors)
- ✅ Typography (responsive sizes, weights)
- ✅ Spacing (semantic spacing tokens)
- ✅ Shadows (elevation system)
- ✅ Radius (border radius scale)
- ✅ Animations (durations, easing, keyframes)

### Components (`/components/ui/`)
- ✅ **Button** - Primary, secondary, outline, ghost, danger variants
- ✅ **Card** - Flexible container with sub-components
- ✅ **Badge** - Badge, IconBadge, NumberBadge
- ✅ **Alert** - Success, error, warning, info variants
- ✅ **Toast** - Notification system with provider
- ✅ **Spinner** - Loading indicators
- ✅ **Skeleton** - Loading placeholders
- ✅ **Container** - Responsive layout container
- ✅ **Input, Select, Checkbox, RadioGroup** - Form components

### Layout Components
- ✅ **Header** - With mobile menu and skip-to-content link
- ✅ **Footer** - Site footer

### Accessibility Features
- ✅ Skip-to-content link
- ✅ ARIA labels throughout
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Respects prefers-reduced-motion
- ✅ WCAG 2.1 AA compliant colors

---

## 🎨 Using Design Tokens

### Import Tokens

```tsx
import { colors, typography, spacing, shadows } from '@/lib/design-tokens';

// Use in your code
const primaryColor = colors.primary[500];
const cardPadding = spacing.card.md;
```

### Use in Tailwind Classes

All tokens are automatically available as Tailwind utilities:

```tsx
// Colors
<div className="bg-primary-500 text-white">Primary background</div>
<div className="bg-accent-100 text-accent-700">Accent badge</div>
<div className="bg-error-50 text-error-900">Error alert</div>

// Shadows
<div className="shadow-elevation-raised">Raised card</div>
<div className="shadow-elevation-overlay">Modal</div>

// Border radius
<div className="rounded-component-card">Card</div>
<div className="rounded-component-button">Button</div>

// Animations
<div className="animate-fade-in">Fades in</div>
<div className="animate-slide-in-up">Slides up</div>
<div className="transition-colors duration-fast">Fast transition</div>
```

---

## 🧩 Component Examples

### Button Variants

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Learn More</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Dismiss</Button>
<Button variant="danger">Delete</Button>
```

### Button with Loading State

```tsx
const [loading, setLoading] = useState(false);

<Button
  variant="primary"
  loading={loading}
  onClick={async () => {
    setLoading(true);
    await saveData();
    setLoading(false);
  }}
>
  Save
</Button>
```

### Card Layouts

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

// Simple card
<Card>
  <p>Simple content</p>
</Card>

// Full card with all sections
<Card variant="bordered" padding="lg">
  <CardHeader>
    <CardTitle>Feature Name</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Description of the feature...</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Learn More</Button>
    <Button variant="outline">Dismiss</Button>
  </CardFooter>
</Card>

// Hoverable card
<Card hoverable onClick={() => navigate('/details')}>
  <CardTitle>Click me</CardTitle>
</Card>
```

### Badges

```tsx
import { Badge, IconBadge, NumberBadge } from '@/components/ui/Badge';
import { CheckIcon, BikeIcon } from 'lucide-react';

// Text badges
<Badge variant="success">Active</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Pending</Badge>

// Icon badge
<IconBadge variant="primary" size="lg">
  <BikeIcon className="h-5 w-5" />
</IconBadge>

// Number badge (for steps, counts)
<NumberBadge variant="primary" size="lg">
  1
</NumberBadge>

// Badge with icon
<Badge variant="success" icon={<CheckIcon className="h-3 w-3" />}>
  Verified
</Badge>
```

### Alerts

```tsx
import { Alert } from '@/components/ui/Alert';

<Alert variant="success">
  Your changes have been saved successfully!
</Alert>

<Alert variant="error" title="Error">
  Failed to save changes. Please try again.
</Alert>

<Alert variant="warning" dismissible onDismiss={() => console.log('dismissed')}>
  Your session will expire in 5 minutes.
</Alert>

<Alert variant="info" title="New Feature">
  Check out our new e-bike tours!
</Alert>
```

### Toast Notifications

```tsx
'use client';

import { useToast } from '@/components/ui/Toast';

export function MyComponent() {
  const { success, error, warning, info } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      success('Changes saved successfully!');
    } catch (err) {
      error('Failed to save changes');
    }
  };

  const handleWarning = () => {
    warning('Session expiring soon', 'Warning', 10000); // 10 seconds
  };

  return (
    <div>
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={handleWarning}>Show Warning</Button>
      <Button onClick={() => info('Did you know...?')}>Info</Button>
    </div>
  );
}
```

### Loading States

```tsx
import { Spinner, SpinnerFullPage } from '@/components/ui/Spinner';
import { Skeleton, SkeletonCard, SkeletonText } from '@/components/ui/Skeleton';

// Inline spinner
{loading && <Spinner size="lg" />}

// Full page loading
{pageLoading && <SpinnerFullPage message="Loading data..." />}

// Skeleton placeholders
{loading ? (
  <div className="grid gap-6 md:grid-cols-3">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
) : (
  <div className="grid gap-6 md:grid-cols-3">
    {data.map(item => <Card key={item.id}>...</Card>)}
  </div>
)}

// Text skeleton
<SkeletonText lines={3} />
```

### Containers

```tsx
import { Container } from '@/components/ui/Container';

// Default container (1280px max-width)
<Container>
  <h1>Page content</h1>
</Container>

// Narrow container for forms
<Container size="sm">
  <form>...</form>
</Container>

// Article container
<Container size="md">
  <article>...</article>
</Container>

// Full-width
<Container size="full">
  Full-width content
</Container>
```

---

## 🎯 Common Patterns

### Feature Card Grid

```tsx
import { Container } from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/Badge';
import { Bike, Leaf, Coffee } from 'lucide-react';

const features = [
  { icon: Bike, title: 'E-Bikes', description: 'Electric-assist bikes' },
  { icon: Leaf, title: 'Eco-Friendly', description: 'Sustainable tours' },
  { icon: Coffee, title: 'Coffee Tours', description: 'Farm experiences' },
];

export function Features() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <Container>
        <h2 className="mb-12 text-center">Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <Card key={i} hoverable>
              <CardHeader>
                <IconBadge variant="primary" size="lg">
                  <feature.icon className="h-5 w-5" />
                </IconBadge>
                <CardTitle as="h3">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### Form with Validation

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import { Card, CardContent } from '@/components/ui/Card';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { success, error } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitForm();
      success('Form submitted successfully!');
      setErrors({});
    } catch (err) {
      error('Failed to submit form');
      setErrors(err.errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="bordered" padding="lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name"
            required
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            required
            error={errors.email}
          />

          <Select
            label="Subject"
            options={[
              { value: 'general', label: 'General' },
              { value: 'support', label: 'Support' },
            ]}
            error={errors.subject}
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" loading={loading}>
              Submit
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Responsive Section

```tsx
import { Container } from '@/components/ui/Container';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-primary-50 to-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6">
              Discover Colombia's Coffee Region
              <span className="block text-primary-600">
                One Pedal at a Time
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Beginner-friendly tours...
            </p>
            <Button variant="primary" size="lg">
              Join Waitlist
            </Button>
          </div>
          <div>
            {/* Image or illustration */}
          </div>
        </div>
      </Container>
    </section>
  );
}
```

---

## ♿ Accessibility Checklist

When using the design system, ensure:

- [ ] All images have `alt` text
- [ ] Buttons have descriptive text or `aria-label`
- [ ] Forms have proper `label` associations
- [ ] Color contrast meets WCAG AA (use design system colors)
- [ ] Interactive elements are keyboard accessible
- [ ] Focus states are visible
- [ ] Headings follow hierarchy (h1 → h2 → h3)
- [ ] Skip-to-content link is present on pages
- [ ] `main` element has `id="main-content"`
- [ ] Loading states announce to screen readers
- [ ] Error messages are associated with form fields

---

## 🎨 Customization

### Extending Colors

Add custom colors to your design tokens:

```tsx
// lib/design-tokens/colors.ts
export const colors = {
  // ... existing colors
  custom: {
    50: '#...',
    500: '#...',
    // ...
  },
} as const;
```

Then update `tailwind.config.ts`:

```tsx
import { colors } from './lib/design-tokens/colors';

export default {
  theme: {
    extend: {
      colors: {
        // ... existing
        custom: colors.custom,
      },
    },
  },
};
```

### Creating New Components

Follow the established patterns:

```tsx
import React from 'react';

export interface MyComponentProps {
  /** Description */
  variant?: 'default' | 'custom';

  /** Content */
  children: React.ReactNode;

  /** Additional classes */
  className?: string;
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = 'default', children, className = '' }, ref) => {
    const baseStyles = 'base classes';
    const variantStyles = {
      default: 'default styles',
      custom: 'custom styles',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()}
      >
        {children}
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

---

## 📚 Resources

- **Complete Documentation**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Design Tokens**: `/lib/design-tokens/`
- **Components**: `/components/ui/`
- **Tailwind Config**: `/tailwind.config.ts`

---

## 🐛 Troubleshooting

### TypeScript Errors

```bash
npm run type-check
```

### Styles Not Applying

1. Ensure Tailwind is processing the file (check `content` in `tailwind.config.ts`)
2. Restart dev server: `npm run dev`
3. Clear `.next` cache: `rm -rf .next && npm run dev`

### Toast Notifications Not Working

Ensure `ToastProvider` is wrapping your app in the root layout.

### Animations Not Working

Check if user has `prefers-reduced-motion` enabled. The design system respects this setting.

---

**Questions?** Refer to [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation.

**Version:** 1.0.0
