# Sendero Design System Documentation

Welcome to the Sendero Design System documentation! This directory contains comprehensive guides for using and implementing the design system.

---

## 📚 Documentation Overview

### 1. [Design System Guide](./DESIGN_SYSTEM.md) - **START HERE**
**Comprehensive reference for the entire design system**

- Design principles and philosophy
- Complete design token documentation
- All components with examples
- Animation and motion guidelines
- Accessibility standards
- Usage patterns and best practices

**When to use:** Building new features, understanding component APIs, reference documentation

---

### 2. [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
**Quick start guide with practical examples**

- 5-minute quick start
- Common patterns and recipes
- Copy-paste examples
- Troubleshooting tips

**When to use:** Starting a new feature, learning the system, finding quick examples

---

### 3. [Migration Guide](./MIGRATION_GUIDE.md)
**Step-by-step guide for updating existing code**

- Before/after comparisons
- Phase-by-phase migration plan
- Common issues and solutions
- Testing checklist

**When to use:** Updating existing components, refactoring old code

---

## 🚀 Quick Links

### Getting Started
- **New to the system?** Start with [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **Migrating existing code?** See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **Need detailed reference?** Check [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

### Common Tasks

| Task | Guide | Section |
|------|-------|---------|
| Create a button | Implementation Guide | Component Examples → Button |
| Build a card layout | Implementation Guide | Common Patterns → Feature Card Grid |
| Add loading states | Implementation Guide | Component Examples → Loading States |
| Show notifications | Implementation Guide | Component Examples → Toast |
| Use design tokens | Design System | Design Tokens |
| Ensure accessibility | Design System | Accessibility |
| Add animations | Design System | Animation & Motion |
| Migrate old code | Migration Guide | All sections |

---

## 🎨 Design System Features

### Design Tokens
✅ Semantic color system (primary, accent, semantic)
✅ Responsive typography scale
✅ Consistent spacing system
✅ Elevation system with shadows
✅ Border radius scale
✅ Animation timings and easing

### Components (14 total)
✅ Button with 5 variants
✅ Card with flexible layout
✅ Badge (3 types: Badge, IconBadge, NumberBadge)
✅ Alert for contextual feedback
✅ Toast notifications
✅ Spinner loading indicators
✅ Skeleton loading placeholders
✅ Container with size variants
✅ Form components (Input, Select, Checkbox, RadioGroup)
✅ Layout components (Header with mobile nav, Footer)

### Accessibility
✅ WCAG 2.1 AA compliant
✅ Keyboard navigation support
✅ Screen reader friendly
✅ Skip-to-content link
✅ ARIA labels throughout
✅ Respects prefers-reduced-motion

---

## 📖 Documentation Structure

```
docs/
├── README.md                    # This file - overview and navigation
├── DESIGN_SYSTEM.md             # Complete design system reference
├── IMPLEMENTATION_GUIDE.md      # Quick start and examples
└── MIGRATION_GUIDE.md           # Migrating existing code
```

---

## 💡 How to Use This Documentation

### Scenario 1: I'm building a new feature
1. Read the [Quick Start](./IMPLEMENTATION_GUIDE.md#-quick-start-5-minutes) (5 min)
2. Browse [Common Patterns](./IMPLEMENTATION_GUIDE.md#-common-patterns)
3. Reference [Component Examples](./IMPLEMENTATION_GUIDE.md#-component-examples) as needed
4. Check [Accessibility Checklist](./IMPLEMENTATION_GUIDE.md#-accessibility-checklist) before shipping

### Scenario 2: I'm updating existing code
1. Follow the [Migration Guide](./MIGRATION_GUIDE.md) step by step
2. Use the [Before/After Comparisons](./MIGRATION_GUIDE.md#9-updating-existing-pages)
3. Run through the [Testing Checklist](./MIGRATION_GUIDE.md#15-testing-after-migration)

### Scenario 3: I need to understand a component
1. Check [Design System > Components](./DESIGN_SYSTEM.md#components) for API reference
2. See [Implementation Guide](./IMPLEMENTATION_GUIDE.md#-component-examples) for examples
3. Look at component source code for advanced usage

### Scenario 4: I want to customize the design
1. Read [Design System > Design Tokens](./DESIGN_SYSTEM.md#design-tokens)
2. See [Implementation Guide > Customization](./IMPLEMENTATION_GUIDE.md#-customization)
3. Update tokens in `/lib/design-tokens/`

---

## 🎯 Common Questions

### Where are the design tokens?
Location: `/lib/design-tokens/`
Documentation: [Design System > Design Tokens](./DESIGN_SYSTEM.md#design-tokens)

### How do I use a component?
Quick examples: [Implementation Guide > Component Examples](./IMPLEMENTATION_GUIDE.md#-component-examples)
Full API: [Design System > Components](./DESIGN_SYSTEM.md#components)

### How do I show notifications?
Toast setup: [Implementation Guide > Quick Start](./IMPLEMENTATION_GUIDE.md#1-enable-toast-notifications)
Usage examples: [Implementation Guide > Toast](./IMPLEMENTATION_GUIDE.md#toast-notifications)

### How do I ensure accessibility?
Guidelines: [Design System > Accessibility](./DESIGN_SYSTEM.md#accessibility)
Checklist: [Implementation Guide > Accessibility Checklist](./IMPLEMENTATION_GUIDE.md#-accessibility-checklist)

### Can I customize colors?
Yes! See: [Implementation Guide > Customization](./IMPLEMENTATION_GUIDE.md#extending-colors)

### Where are the animations?
Reference: [Design System > Animation & Motion](./DESIGN_SYSTEM.md#animation--motion)
Examples: [Migration Guide > Animation Updates](./MIGRATION_GUIDE.md#14-animation-updates)

---

## 🏗️ Design System Architecture

```
Sendero Design System
│
├── Design Tokens (/lib/design-tokens/)
│   ├── colors.ts         → Semantic color palette
│   ├── typography.ts     → Font scale and weights
│   ├── spacing.ts        → Spacing scale
│   ├── shadows.ts        → Elevation system
│   ├── radius.ts         → Border radius
│   └── animations.ts     → Timing and easing
│
├── UI Components (/components/ui/)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Alert.tsx
│   ├── Toast.tsx
│   ├── Spinner.tsx
│   ├── Skeleton.tsx
│   ├── Container.tsx
│   └── [form components]
│
├── Layout Components (/components/layout/)
│   ├── Header.tsx        → With mobile nav
│   └── Footer.tsx
│
├── Configuration
│   ├── tailwind.config.ts → Imports design tokens
│   └── app/globals.css    → Base styles & utilities
│
└── Documentation (/docs/)
    ├── DESIGN_SYSTEM.md
    ├── IMPLEMENTATION_GUIDE.md
    └── MIGRATION_GUIDE.md
```

---

## ✅ Quick Checklist for New Features

Before shipping a new feature, ensure:

- [ ] Using components from `/components/ui/` (not custom div styling)
- [ ] Using design tokens (primary-500, not green-500)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are visible
- [ ] Loading states use Spinner or Skeleton
- [ ] Errors use Alert or Toast
- [ ] Forms have proper labels and error messages
- [ ] Images have alt text
- [ ] Tested with keyboard navigation
- [ ] Tested on mobile
- [ ] Build passes (`npm run build`)
- [ ] Type check passes (`npm run type-check`)

---

## 🔧 Troubleshooting

### Issue: Components not found
**Solution:** Check import paths use `@/components/ui/ComponentName`

### Issue: Styles not applying
**Solution:** Restart dev server, clear `.next` cache

### Issue: TypeScript errors
**Solution:** Run `npm run type-check` for details

### Issue: Colors look wrong
**Solution:** Use semantic tokens (primary-500 instead of green-500)

### Issue: Toast not showing
**Solution:** Ensure ToastProvider wraps app in layout.tsx

For more troubleshooting: [Implementation Guide > Troubleshooting](./IMPLEMENTATION_GUIDE.md#-troubleshooting)

---

## 📞 Support

### Resources
- **Design System Docs:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Quick Examples:** [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **Migration Help:** [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **Component Source:** `/components/ui/`
- **Design Tokens:** `/lib/design-tokens/`

### External Resources
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Docs](https://react.dev)

---

## 📊 Version History

### Version 1.0.0 (Current)
- ✅ Complete design token system
- ✅ 14 production-ready components
- ✅ Full accessibility support
- ✅ Comprehensive documentation
- ✅ Mobile navigation
- ✅ Toast notification system
- ✅ Loading states (Spinner/Skeleton)
- ✅ Animation system

---

## 🎓 Learning Path

### For Beginners
1. **Day 1:** Read [Implementation Guide Quick Start](./IMPLEMENTATION_GUIDE.md#-quick-start-5-minutes)
2. **Day 2:** Build a simple feature using Button and Card
3. **Day 3:** Add forms with validation using Input components
4. **Day 4:** Implement loading states and notifications
5. **Day 5:** Review [Accessibility Checklist](./IMPLEMENTATION_GUIDE.md#-accessibility-checklist)

### For Experienced Developers
1. **15 min:** Skim [Design System](./DESIGN_SYSTEM.md) for overview
2. **30 min:** Review [Common Patterns](./IMPLEMENTATION_GUIDE.md#-common-patterns)
3. **Start building:** Reference docs as needed
4. **Before shipping:** Run through checklists

---

## 🌟 Best Practices

1. **Always use components over custom divs**
   - ✅ `<Card>` instead of `<div className="rounded-lg bg-white...">`
   - ✅ `<Button>` instead of `<button className="...">`

2. **Use semantic color tokens**
   - ✅ `bg-primary-500` instead of `bg-green-500`
   - ✅ `bg-accent-500` instead of `bg-yellow-500`

3. **Compose components**
   - ✅ Use CardHeader, CardContent, CardFooter
   - ✅ Combine IconBadge with Card for feature cards

4. **Leverage design tokens**
   - ✅ Import from `/lib/design-tokens/` for consistency
   - ✅ Use semantic spacing (spacing.card.md)

5. **Accessibility first**
   - ✅ Always provide labels
   - ✅ Test keyboard navigation
   - ✅ Include alt text

---

**Ready to get started?**

👉 [Implementation Guide](./IMPLEMENTATION_GUIDE.md) - Start building!
📖 [Design System](./DESIGN_SYSTEM.md) - Full reference
🔄 [Migration Guide](./MIGRATION_GUIDE.md) - Update existing code

---

**Version:** 1.0.0
**Last Updated:** November 2024
**Maintained by:** Colin Rodriguez
