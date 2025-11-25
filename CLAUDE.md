# Sendero - Project Documentation

**Last Updated:** November 2024
**Version:** 0.1.0 (Smoke Test)
**Status:** 🚧 **Active Development** - Waitlist MVP

---

## 🚀 Quick Reference

### Project Status at a Glance

| Component              | Status      | Description                                    |
| ---------------------- | ----------- | ---------------------------------------------- |
| **Landing Page**       | ✅ Complete | Hero, features, waitlist form                  |
| **Waitlist Form**      | ✅ Complete | Multi-step form with validation                |
| **API Integration**    | ✅ Complete | Supabase integration for data storage          |
| **Thank You Page**     | ✅ Complete | Confirmation with share functionality          |
| **CI/CD Pipeline**     | ✅ Complete | GitHub Actions, automated testing & deployment |
| **Testing**            | ✅ Complete | Jest unit tests for validation logic           |
| **Supabase Setup**     | 📋 Pending  | Database needs to be configured                |
| **Production Deploy**  | 📋 Pending  | Ready for Vercel deployment                    |

### Most-Used Commands

```bash
# Development
npm run dev                 # Start dev server (http://localhost:3000)
npm run build               # Build for production
npm run start               # Start production server
npm run lint                # Run ESLint
npm run type-check          # TypeScript check

# Testing
npm test                    # Run all tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Run tests with coverage report
```

### Key Files & Directories

```
📁 app/                   # Next.js App Router
  ├── page.tsx            # Landing page
  ├── thank-you/          # Thank you page
  ├── api/waitlist/       # Waitlist API endpoint
  ├── layout.tsx          # Root layout with Analytics
  └── globals.css         # Global styles

📁 components/
  ├── ui/                 # Reusable UI components
  ├── layout/             # Header, Footer
  └── features/waitlist/  # WaitlistForm component

📁 lib/
  ├── supabase/           # Supabase client
  ├── types/              # TypeScript types
  └── utils/              # Validation utilities

📁 supabase/
  └── migrations/         # SQL migrations

📁 .github/workflows/     # CI/CD pipelines
📁 __tests__/             # Jest tests
```

### Need Help?

- 📘 **Setup Instructions** → See "Getting Started" section below
- 🗄️ **Database Schema** → See "Database Architecture" section
- 🚀 **Deployment Guide** → See "Deployment" section
- 🧪 **Testing Guide** → See "Testing Strategy" section

---

## 📋 Project Overview

**Sendero** is a waitlist landing page for beginner-friendly hike & bike tours in Colombia's Coffee Region (Pereira-focused). This is a **smoke test** to validate market interest before building the full product.

**Core Value Proposition:**

> "Discover Colombia's Coffee Region, one pedal at a time"

**Key Features:**

- ✅ Beautiful, responsive landing page
- ✅ Waitlist signup form with preferences
- ✅ Email capture with tour preferences (duration, interests, fitness level, travel timeline)
- ✅ Thank you page with social sharing
- ✅ Data stored in Supabase (PostgreSQL)
- ✅ Deployed on Vercel with Analytics
- ✅ Automated CI/CD pipeline

**Success Metrics:**

- Number of signups
- Quality of signups (preferences alignment)
- Share rate (viral coefficient)
- Conversion from waitlist to booking (future)

---

## 🎯 Current Implementation Status

### ✅ Fully Implemented

#### Landing Page
- ✅ Hero section with compelling headline
- ✅ Feature highlights (e-bikes, eco-conscious, coffee farms)
- ✅ "How It Works" 3-step process
- ✅ "Perfect For" benefit cards (6 personas)
- ✅ Waitlist form integration
- ✅ Responsive design (mobile-first)
- ✅ Placeholder images from placehold.co

#### Waitlist Form
- ✅ Email input with validation
- ✅ Tour duration selection (1 day / weekend / 1 week)
- ✅ Interest types multi-select (hike, bike, e-bike, women-only, coffee farm)
- ✅ Fitness level selection (beginner / moderate)
- ✅ Travel timeline selection (3 months / 6 months / later)
- ✅ Client-side validation
- ✅ Server-side validation
- ✅ Error handling (duplicate email, network errors)
- ✅ Loading states

#### API & Database
- ✅ Supabase schema with RLS policies
- ✅ API route for form submission (`POST /api/waitlist`)
- ✅ Type-safe database operations
- ✅ Duplicate email detection (409 status)
- ✅ Comprehensive error handling

#### Thank You Page
- ✅ Confirmation message
- ✅ "What happens next" section
- ✅ Share functionality:
  - Copy link to clipboard
  - WhatsApp share
  - Twitter/X share
  - Facebook share
- ✅ Back to home button

#### DevOps & Testing
- ✅ Jest testing framework
- ✅ Unit tests for validation logic
- ✅ GitHub Actions CI pipeline
- ✅ GitHub Actions deployment pipeline
- ✅ Vercel Analytics integration
- ✅ TypeScript type safety throughout

### 📋 Pending Setup

- 📋 Supabase project creation
- 📋 Supabase environment variables configuration
- 📋 Vercel project setup
- 📋 GitHub repository initialization
- 📋 Domain configuration (optional)
- 📋 Custom logo and images

---

## 🏗️ Tech Stack

### Frontend - ✅ Implemented

- **Next.js 15+** (App Router) - React framework with SSR
- **React 19+** - UI library
- **TypeScript 5+** - Type safety
- **Tailwind CSS 4+** - Utility-first styling
- **Vercel Analytics** - Web analytics

### Backend - ✅ Implemented

- **Supabase (PostgreSQL 15+)** - Database and backend
- **Row-Level Security (RLS)** - Data access control
- **No authentication** - Public form submission only

### DevOps - ✅ Implemented

- **Vercel** - Hosting and deployment
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Unit testing
- **ESLint** - Code linting
- **TypeScript** - Type checking

---

## 🗄️ Database Architecture

### Table: `waitlist_signups`

**Fields:**

- `id` - UUID, primary key, auto-generated
- `created_at` - Timestamp, auto-generated
- `email` - Text, **required**, **unique**
- `tour_duration` - Enum: `one_day`, `weekend`, `one_week`
- `interest_types` - Array: `hike`, `bike`, `e_bike`, `women_only`, `coffee_farm`
- `fitness_level` - Enum: `beginner`, `moderate`
- `travel_timeline` - Enum: `next_3_months`, `next_6_months`, `later`
- `notes` - Text, nullable (for future use)

**Indexes:**

- Primary key on `id`
- Unique index on `email`
- Index on `created_at` (for sorting)

**RLS Policies:**

- ✅ **Allow anonymous INSERT** - Anyone can submit the form
- ✅ **Block all SELECT** - Data only visible in Supabase dashboard
- ✅ **Block UPDATE/DELETE** - Prevent data manipulation

**Security:**

- Email uniqueness enforced at database level
- RLS prevents unauthorized data access
- No sensitive data stored (just preferences)

**Migration File:**

See [supabase/migrations/001_create_waitlist_signups.sql](supabase/migrations/001_create_waitlist_signups.sql)

---

## 🌿 Git Workflow

### Branch Strategy

```
development (development)
└── main (production)
    └── feature/* (feature branches)
```

### Branch Purposes

- **`development`** - Development branch
  - Default branch for development
  - All feature branches merge here
  - CI runs on every push

- **`main`** - Production branch
  - Deploys to Vercel production
  - Only merge from `development` after testing
  - Full CI/CD pipeline runs on push

- **`feature/*`** - Feature branches
  - Format: `feature/description`
  - Examples: `feature/update-copy`, `feature/add-analytics`

### Development Workflow

1. **Create feature branch from `development`:**

   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature
   ```

2. **Make changes and commit**
3. **Push and create PR to `development`**
4. **CI runs: lint, type-check, tests, build**
5. **Merge to `development`**
6. **When ready for production: merge `development` → `main`**
7. **Deployment pipeline runs and deploys to Vercel**

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

**On every push to `development` or `main`:**

1. ✅ Lint (ESLint)
2. ✅ Type Check (TypeScript)
3. ✅ Unit Tests (Jest)
4. ✅ Build Check (Next.js)

**On push to `main` branch:**

5. ✅ All CI checks (above)
6. ✅ Deploy to Vercel production

### Vercel Deployment

| Branch         | Environment | Auto-Deploy | Status     |
| -------------- | ----------- | ----------- | ---------- |
| `main`         | Production  | ✅ Yes      | 📋 Pending |
| `development`  | Preview     | ✅ Yes      | 📋 Pending |
| `feature/*`    | Preview     | ✅ Yes      | 📋 Pending |

**Required GitHub Secrets:**

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## 🧪 Testing Strategy

### Testing Stack

- ✅ **Jest** - Test runner
- ✅ **React Testing Library** - Component testing (ready for use)
- ✅ **@testing-library/jest-dom** - DOM matchers

### Test Coverage

**Current Coverage:**

- ✅ Validation logic: 100% (all functions tested)

**Coverage Thresholds:**

- Statements: 70%
- Branches: 70%
- Functions: 70%
- Lines: 70%

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Files:**

- [__tests__/unit/validation.test.ts](__tests__/unit/validation.test.ts) - Validation logic tests

---

## 🎨 Design System

**Design Theme:** Warm, adventurous, golden - inspired by Colombian sunshine and coffee culture

### Colors

**Primary (Golden Yellow):**
- Warmth, energy, adventure
- `#e2b71f` (primary-500) - Main brand color
- `#ca9a1b` (primary-600) - Hover states
- Full scale: 50-950 shades available

**Accent (Light Cream):**
- Soft, warm, approachable
- `#fff0bb` (accent-400) - Secondary color
- Complements the golden primary

**Neutral Palette:**
- Background: `#f1f1f1` (Light Gray)
- Foreground: `#1b1b1b` (Gravel Black)
- Muted: `#f1f1f1` with `#616161` text (Steel Gray)
- Border: `#e2e8f0`

**Gray Scale (from Figma):**
- Comprehensive 50-950 scale
- Gravel Black (`#1b1b1b`) to Light Gray (`#f1f1f1`)
- Steel Gray (`#616161`) for muted text

**Semantic Colors:**
- Error: `#ef4444` (red-500)
- Success: `#22c55e` (green-500)
- Warning: `#f59e0b` (amber-500)
- Info: `#3b82f6` (blue-500)

### Typography

- **Font:** Work Sans (Google Fonts)
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

**Typography Specifications (from Figma, November 2024):**

| Style | Size (px) | Tailwind Class | Weight | Line Height | Usage |
|-------|-----------|----------------|--------|-------------|-------|
| **H1** | 48px | `text-5xl` | 700 (bold) | Default | Main page headings, hero titles |
| **H2** | 36px | `text-4xl` | 700 (bold) | Default | Section headings |
| **H3** | 24px | `text-2xl` | 500 (medium) | Default | Sub-section headings |
| **H4** | 14px | `text-sm` | 600 (semibold) | Default | Secondary headings, footer headings |
| **Body** | 16px | `text-base` | 400 (normal) | `leading-4` (16px) | Primary body text |
| **Label** | 12px | `text-xs` | 600 (semibold) | Default | Form labels, metadata |

**Implementation:**

```tsx
// Using Tailwind utilities
<h1 className="text-5xl font-bold">Header 1</h1>
<h2 className="text-4xl font-bold">Header 2</h2>
<h3 className="text-2xl font-medium">Header 3</h3>
<h4 className="text-sm font-semibold">Header 4</h4>
<p className="text-base font-normal leading-4">Body text</p>
<label className="text-xs font-semibold">LABEL</label>

// Using custom CSS classes (recommended)
<h1 className="text-h1">Header 1</h1>
<h2 className="text-h2">Header 2</h2>
<h3 className="text-h3">Header 3</h3>
<h4 className="text-h4">Header 4</h4>
<p className="text-body">Body text</p>
<label className="text-label">LABEL</label>
```

### Design Tokens Architecture

**Centralized Token System:**

The project uses a sophisticated design token architecture in `/lib/design-tokens/`:

- `colors.ts` - Complete color palette with semantic naming
- `typography.ts` - Typography scale, font families, weights, and line heights
- `shadows.ts` - Shadow definitions
- `radius.ts` - Border radius tokens
- `animations.ts` - Animation presets

**Benefits:**

- ✅ Single source of truth for design values
- ✅ Type-safe design tokens
- ✅ Consistent theming across components
- ✅ Easy to update and maintain
- ✅ Figma design system integration

**Usage:**

All tokens are imported into [tailwind.config.ts](tailwind.config.ts) and available as Tailwind utilities:

```tsx
// Use semantic tokens
<button className="bg-primary-500 text-foreground hover:bg-primary-600">
  Join Waitlist
</button>

// Use gray scale
<p className="text-gray-600">Supporting text</p>

// Use semantic colors
<span className="text-error">Error message</span>
```

### Components

**UI Components:**

- Button (primary, secondary, outline variants)
- Input (with label and error states)
- Select
- Checkbox
- RadioGroup
- Container

**Layout Components:**

- Header (sticky navigation)
- Footer (links and info)

**Component Principles:**

- No hardcoded colors - all use design tokens
- Consistent spacing using Tailwind's spacing scale
- Accessibility-first (WCAG AA compliant)
- Mobile-responsive by default

**Design Token Files:**

See [lib/design-tokens/colors.ts](lib/design-tokens/colors.ts), [tailwind.config.ts](tailwind.config.ts), and [app/globals.css](app/globals.css)

---

## 🏁 Getting Started

### Prerequisites

- **Node.js 20+** (LTS) - Currently using v22.17.0
- **npm 10+** - Currently using 10.9.2
- **Git**
- **Supabase account** (free tier)
- **Vercel account** (free tier)

### Initial Setup

```bash
# Clone repository (after creating it)
git clone https://github.com/your-username/sendero.git
cd sendero

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Supabase Setup

1. **Create a Supabase project:**
   - Go to https://app.supabase.com
   - Click "New Project"
   - Choose a name, database password, and region

2. **Run the migration:**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/migrations/001_create_waitlist_signups.sql`
   - Paste and run the SQL

3. **Get your credentials:**
   - Go to Project Settings → API
   - Copy `Project URL` and `anon public` key
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     ```

### Run Locally

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Verify Everything Works

1. ✅ Landing page loads
2. ✅ Fill out the waitlist form
3. ✅ Submit and redirect to thank you page
4. ✅ Check Supabase dashboard - new row in `waitlist_signups`

---

## 🚢 Deployment

### Vercel Setup

1. **Create Vercel project:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Configure project settings

2. **Add environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_SITE_URL` (your production URL)

3. **Configure deployment branch:**
   - Set production branch to `deployment`
   - Enable automatic deployments

4. **Add Vercel secrets to GitHub:**
   - Go to GitHub repository → Settings → Secrets
   - Add:
     - `VERCEL_TOKEN` (from Vercel account settings)
     - `VERCEL_ORG_ID` (from Vercel project settings)
     - `VERCEL_PROJECT_ID` (from Vercel project settings)

### Deployment Workflow

```bash
# 1. Test locally
npm run build
npm run start

# 2. Push to main
git add .
git commit -m "feat: ready for production"
git push origin main

# 3. Merge to deployment
git checkout deployment
git merge main
git push origin deployment

# 4. GitHub Actions will automatically:
#    - Run all CI checks
#    - Build the app
#    - Deploy to Vercel production
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics - ✅ Enabled

- Core Web Vitals monitoring
- Real User Monitoring (RUM)
- Page view tracking
- Performance metrics

**Dashboard:** Available in Vercel project dashboard

### Future Enhancements

- 📋 PostHog (product analytics)
- 📋 Sentry (error monitoring)
- 📋 Custom events tracking (form submissions, shares)

---

## 🔮 Future Enhancements

### Phase 1 - Current (Smoke Test)

- ✅ Landing page
- ✅ Waitlist form
- ✅ Thank you page
- ✅ Supabase integration
- ✅ CI/CD pipeline

### Phase 2 - Email Automation

- 📋 Confirmation emails (Resend or SendGrid)
- 📋 Welcome sequence
- 📋 Updates to waitlist members

### Phase 3 - Content & SEO

- 📋 Blog/content section
- 📋 SEO optimization
- 📋 Meta tags and OG images
- 📋 Custom domain

### Phase 4 - Conversion

- 📋 Booking system
- 📋 Payment integration (Stripe)
- 📋 Tour calendar
- 📋 Admin dashboard

---

## 📚 Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Tools

- [GitHub Repository](https://github.com/colin-rod/sendero)
- [Vercel Dashboard](https://vercel.com) (📋 to be configured)
- [Supabase Dashboard](https://app.supabase.com) (📋 to be configured)

---

## 🚨 Known Issues & Notes

### Current Limitations

- No authentication (by design - public waitlist)
- No email confirmation (manual for now)
- Placeholder images (need custom photos)
- No logo (placeholder text only)

### Technical Notes

- Using Next.js App Router (not Pages Router)
- Supabase RLS blocks all reads from API (secure)
- Form validation happens both client-side and server-side
- Environment variables must be prefixed with `NEXT_PUBLIC_` for browser access

---

## 📞 Support & Contact

For questions or issues:

- **GitHub Issues:** Create an issue in the repository
- **Email:** (Add your email here)

---

**Version:** 0.1.0 (Smoke Test)
**Last Updated:** November 2024
**Status:** Ready for deployment

---

_Built with ❤️ by Colin Rodriguez with AI pair programming (Claude)_
