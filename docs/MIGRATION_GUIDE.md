# Migration Guide: Updating Existing Code to Use the Design System

This guide helps you migrate existing Sendero code to use the new design system components and tokens.

---

## 🔄 Quick Migration Checklist

- [ ] Update Button components to use semantic tokens
- [ ] Replace inline card styles with Card component
- [ ] Replace icon wrappers with IconBadge/NumberBadge
- [ ] Update form components with new variants
- [ ] Add ToastProvider to root layout
- [ ] Replace loading indicators with Spinner/Skeleton
- [ ] Update Container usage for new size variants
- [ ] Add skip-to-content link (already in Header)
- [ ] Ensure main content has `id="main-content"` (already done)

---

## 1. Button Component Migration

### Before (Old)
```tsx
<button className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
  Click me
</button>
```

### After (New)
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary">
  Click me
</Button>
```

### Changes
- ✅ `bg-green-500` → `variant="primary"` (uses semantic token)
- ✅ `bg-yellow-500` → `variant="secondary"` (uses semantic token)
- ✅ Built-in loading state support
- ✅ New variants: `ghost`, `danger`

---

## 2. Card Component Migration

### Before (Old)
```tsx
<div className="rounded-lg bg-white p-6 shadow-sm">
  <h3 className="font-semibold">Title</h3>
  <p>Content</p>
</div>
```

### After (New)
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>
```

### Benefits
- ✅ Semantic structure
- ✅ Multiple variants (bordered, elevated, muted)
- ✅ Consistent padding options
- ✅ Hoverable and clickable support

---

## 3. Icon Badge Migration

### Before (Old)
```tsx
<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
  <BikeIcon className="h-5 w-5 text-primary-600" />
</div>
```

### After (New)
```tsx
import { IconBadge } from '@/components/ui/Badge';

<IconBadge variant="primary" size="md">
  <BikeIcon className="h-5 w-5" />
</IconBadge>
```

### Benefits
- ✅ Cleaner syntax
- ✅ Consistent sizing
- ✅ Multiple color variants
- ✅ Automatic color application to children

---

## 4. Number Badge Migration (Step Indicators)

### Before (Old)
```tsx
<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-3xl text-white">
  1
</div>
```

### After (New)
```tsx
import { NumberBadge } from '@/components/ui/Badge';

<NumberBadge variant="primary" size="xl">
  1
</NumberBadge>
```

### Benefits
- ✅ Consistent sizing across the app
- ✅ Semantic variants
- ✅ Less code to write

---

## 5. Container Migration

### Before (Old)
```tsx
<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  Content
</div>
```

### After (New)
```tsx
import { Container } from '@/components/ui/Container';

// Default (max-w-7xl)
<Container>
  Content
</Container>

// Narrow for forms
<Container size="sm">
  <form>...</form>
</Container>
```

### Benefits
- ✅ Size variants (sm, md, lg, xl, full)
- ✅ Optional `noPadding` prop
- ✅ Consistent API

---

## 6. Loading States Migration

### Before (Old)
```tsx
{loading && <div className="text-center">Loading...</div>}
```

### After (New)
```tsx
import { Spinner, Skeleton, SkeletonCard } from '@/components/ui';

// Inline spinner
{loading && <Spinner />}

// Full page
{pageLoading && <SpinnerFullPage message="Loading..." />}

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
```

### Benefits
- ✅ Better UX with skeleton screens
- ✅ Screen reader support
- ✅ Multiple size variants
- ✅ Respects reduced-motion

---

## 7. Error/Success Messages Migration

### Before (Old)
```tsx
{error && (
  <div className="rounded border border-red-200 bg-red-50 p-4 text-red-900">
    {error}
  </div>
)}
```

### After (New)

**Option 1: Alert (for persistent messages)**
```tsx
import { Alert } from '@/components/ui/Alert';

{error && (
  <Alert variant="error" dismissible onDismiss={() => setError(null)}>
    {error}
  </Alert>
)}
```

**Option 2: Toast (for temporary notifications)**
```tsx
import { useToast } from '@/components/ui/Toast';

const { success, error } = useToast();

// In your handler
try {
  await saveData();
  success('Saved successfully!');
} catch (err) {
  error('Failed to save');
}
```

### Benefits
- ✅ Consistent styling
- ✅ Icons included
- ✅ Dismissible option
- ✅ Screen reader support
- ✅ Auto-dismiss for toasts

---

## 8. Form Input Migration

### Before (Old)
```tsx
<div>
  <label className="text-sm font-medium">Email</label>
  <input
    type="email"
    className="mt-1 w-full rounded border px-3 py-2"
  />
  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
</div>
```

### After (New)
```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  error={error}
/>
```

### Benefits
- ✅ Automatic label association
- ✅ Built-in error styling
- ✅ ARIA attributes included
- ✅ Consistent styling

---

## 9. Updating Existing Pages

### Example: Landing Page Hero Section

**Before:**
```tsx
<section className="relative bg-gradient-to-b from-primary-50 to-white py-20 md:py-32">
  <Container>
    <div className="flex items-center space-x-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
        <Bike className="h-5 w-5 text-primary-600" />
      </div>
      <span className="text-sm font-medium">E-Bikes Available</span>
    </div>
  </Container>
</section>
```

**After:**
```tsx
import { Container } from '@/components/ui/Container';
import { IconBadge } from '@/components/ui/Badge';

<section className="relative bg-gradient-to-b from-primary-50 to-white py-20 md:py-32">
  <Container>
    <div className="flex items-center gap-2">
      <IconBadge variant="primary" size="md">
        <Bike className="h-5 w-5" />
      </IconBadge>
      <span className="text-sm font-medium">E-Bikes Available</span>
    </div>
  </Container>
</section>
```

---

## 10. Updating "Perfect For" Cards

### Before (Old)
```tsx
<div className="rounded-lg bg-white p-6 shadow-sm">
  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
    <Globe className="h-6 w-6 text-primary-600" />
  </div>
  <h3 className="mb-2 text-xl font-semibold">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### After (New)
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/Badge';

<Card hoverable>
  <CardHeader>
    <IconBadge variant="primary" size="lg">
      <Globe className="h-6 w-6" />
    </IconBadge>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Description</p>
  </CardContent>
</Card>
```

---

## 11. Waitlist Form Updates

### Replace Inline Alerts with Alert Component

**Before:**
```tsx
{error && (
  <div className="rounded-md bg-red-50 p-4">
    <p className="text-sm text-red-800">{error}</p>
  </div>
)}
```

**After:**
```tsx
import { Alert } from '@/components/ui/Alert';

{error && (
  <Alert variant="error">
    {error}
  </Alert>
)}
```

### Add Toast for Success Feedback

**Before:**
```tsx
// Success redirects immediately
router.push('/thank-you');
```

**After:**
```tsx
import { useToast } from '@/components/ui/Toast';

const { success } = useToast();

// Show toast before redirect
success('Successfully joined the waitlist!');
setTimeout(() => router.push('/thank-you'), 1000);
```

---

## 12. Add ToastProvider to Layout

**Update:** `app/layout.tsx`

```tsx
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

---

## 13. Color Token Updates

### Replace Hard-coded Colors

**Find and replace across your codebase:**

| Old | New | Notes |
|-----|-----|-------|
| `bg-green-500` | `bg-primary-500` | Primary brand color |
| `text-green-600` | `text-primary-600` | Primary text |
| `hover:bg-green-600` | `hover:bg-primary-600` | Primary hover |
| `bg-yellow-500` | `bg-accent-500` | Accent color |
| `bg-red-500` | `bg-error-500` | Error color |
| `bg-gray-100` | `bg-muted` | Muted background |
| `text-gray-600` | `text-muted-foreground` | Secondary text |

---

## 14. Animation Updates

### Add Entrance Animations

**Before:**
```tsx
<div className="fixed top-4 right-4">
  Notification
</div>
```

**After:**
```tsx
<div className="fixed top-4 right-4 animate-slide-in-right">
  Notification
</div>
```

**Available animations:**
- `animate-fade-in`
- `animate-slide-in-up`
- `animate-slide-in-down`
- `animate-slide-in-left`
- `animate-slide-in-right`
- `animate-scale-in`

---

## 15. Testing After Migration

### Checklist

- [ ] **Build passes:** `npm run build`
- [ ] **Type check passes:** `npm run type-check`
- [ ] **Lint passes:** `npm run lint`
- [ ] **Visual regression:** Check all pages for visual consistency
- [ ] **Keyboard navigation:** Tab through all interactive elements
- [ ] **Screen reader:** Test with VoiceOver/NVDA
- [ ] **Mobile responsive:** Test on mobile devices
- [ ] **Loading states:** Verify spinners and skeletons work
- [ ] **Error states:** Verify alerts and toasts display correctly
- [ ] **Form validation:** Check error messages appear properly
- [ ] **Reduced motion:** Test with `prefers-reduced-motion` enabled

### Quick Visual Test

```bash
# Start dev server
npm run dev

# Open in browser
# Navigate to: http://localhost:3000

# Test checklist:
# 1. Click all buttons (primary, secondary, outline)
# 2. Open mobile menu (resize to mobile)
# 3. Submit waitlist form with errors
# 4. Submit waitlist form successfully
# 5. Tab through the page with keyboard
# 6. Check console for errors
```

---

## 16. Performance Checks

### Before and After Comparison

```bash
# Build for production
npm run build

# Check bundle size
# Compare before/after migration

# Expected changes:
# ✅ Similar or smaller bundle size (tree-shaking)
# ✅ Better TypeScript autocomplete
# ✅ Cleaner code (less inline styles)
```

---

## 17. Common Migration Issues

### Issue: Colors look different

**Cause:** Using old color tokens (green-500 vs primary-500)

**Solution:** Replace all instances of `green-*` with `primary-*` and `yellow-*` with `accent-*`

```bash
# Find all instances
grep -r "green-500" app/ components/

# Replace
# green-500 → primary-500
# yellow-500 → accent-500
```

### Issue: Buttons don't have loading state

**Cause:** Using old Button component

**Solution:** Update Button import and add `loading` prop

```tsx
<Button loading={isLoading} variant="primary">
  Save
</Button>
```

### Issue: Icons in badges have wrong color

**Cause:** Manually setting icon color

**Solution:** Remove color class from icon, let IconBadge handle it

```tsx
// Before
<IconBadge>
  <BikeIcon className="h-5 w-5 text-primary-600" />
</IconBadge>

// After
<IconBadge variant="primary">
  <BikeIcon className="h-5 w-5" />
</IconBadge>
```

### Issue: Toast notifications don't appear

**Cause:** Missing ToastProvider

**Solution:** Add ToastProvider to root layout (see step 12)

---

## 18. Gradual Migration Strategy

You don't have to migrate everything at once. Here's a recommended order:

### Phase 1: Foundation (Day 1)
1. ✅ Add ToastProvider to layout
2. ✅ Update Button components (most visible)
3. ✅ Test build and type-check

### Phase 2: Components (Day 2)
4. ✅ Replace card patterns with Card component
5. ✅ Replace icon wrappers with IconBadge
6. ✅ Replace number badges with NumberBadge
7. ✅ Test visual consistency

### Phase 3: Feedback (Day 3)
8. ✅ Replace inline errors with Alert component
9. ✅ Add Toast notifications for actions
10. ✅ Add loading states (Spinner/Skeleton)
11. ✅ Test user flows

### Phase 4: Polish (Day 4)
12. ✅ Update all color tokens (green → primary)
13. ✅ Add entrance animations
14. ✅ Final accessibility audit
15. ✅ Performance check

---

## 19. Quick Reference: Component Mapping

| Old Pattern | New Component | File |
|-------------|---------------|------|
| Inline card div | `<Card>` | `/components/ui/Card.tsx` |
| Circular icon wrapper | `<IconBadge>` | `/components/ui/Badge.tsx` |
| Number circle | `<NumberBadge>` | `/components/ui/Badge.tsx` |
| Text badge | `<Badge>` | `/components/ui/Badge.tsx` |
| Loading text | `<Spinner>` | `/components/ui/Spinner.tsx` |
| Empty state | `<Skeleton>` | `/components/ui/Skeleton.tsx` |
| Error div | `<Alert>` | `/components/ui/Alert.tsx` |
| Success message | `useToast()` | `/components/ui/Toast.tsx` |

---

## 20. Getting Help

### Resources
- **Design System Docs:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Implementation Guide:** [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **Component Examples:** See docs above

### Before/After Examples
See the complete examples in the Implementation Guide for:
- Feature card grids
- Forms with validation
- Loading states
- Responsive sections

---

**Migration Status Tracker**

Track your migration progress:

```markdown
## Migration Progress

- [ ] ToastProvider added to layout
- [ ] All Buttons updated to use semantic tokens
- [ ] Cards replaced with Card component
- [ ] Icon badges replaced with IconBadge
- [ ] Number badges replaced with NumberBadge
- [ ] Alert component integrated
- [ ] Toast notifications added
- [ ] Loading states updated (Spinner/Skeleton)
- [ ] Color tokens updated (green → primary)
- [ ] Build passes
- [ ] Type check passes
- [ ] Visual QA complete
- [ ] Accessibility audit complete
```

---

**Version:** 1.0.0
**Last Updated:** November 2024
