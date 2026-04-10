# Sendero - Project Documentation

**Last Updated:** April 2026
**Version:** 0.1.0 (Smoke Test)
**Status:** 🚧 **Active Development** - Waitlist MVP with Trails & Contact

---

## 🚀 Quick Reference

### Project Status at a Glance

| Component              | Status      | Description                                    |
| ---------------------- | ----------- | ---------------------------------------------- |
| **Landing Page**       | ✅ Complete | Hero, features, waitlist form, tour grid       |
| **Waitlist Form**      | ✅ Complete | Email capture with Google Sheets storage       |
| **Contact Page**       | ✅ Complete | Contact form with Supabase + Resend email      |
| **Trails Pages**       | ✅ Complete | Trail listing + detail page (Sendero del Tigre)|
| **About Page**         | ✅ Complete | About page                                     |
| **FAQ Page**           | ✅ Complete | FAQ with accordion                             |
| **Thank You Page**     | ✅ Complete | Confirmation with share functionality          |
| **Email (Resend)**     | ✅ Complete | Waitlist confirmation + contact notifications  |
| **Feedback System**    | ✅ Complete | Floating feedback button → Google Sheets       |
| **Password Protection**| ✅ Complete | Optional site-wide password gate (iron-session)|
| **Internationalization** | ✅ Complete | Trilingual support (EN, DE, ES)              |
| **CI/CD Pipeline**     | ✅ Complete | GitHub Actions, automated testing & deployment |
| **Testing**            | ✅ Complete | Jest unit + component tests, Playwright e2e    |

### Most-Used Commands

```bash
# Development
npm run dev                 # Start dev server (http://localhost:3000)
npm run build               # Build for production
npm run start               # Start production server
npm run lint                # Run ESLint
npm run type-check          # TypeScript check

# Testing
npm test                    # Run all Jest tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Run tests with coverage report
npm run test:e2e            # Run Playwright e2e tests
npm run test:e2e:ui         # Playwright with UI mode
npm run test:all            # Run Jest + Playwright tests
```

### Key Files & Directories

```
📁 app/                     # Next.js App Router
  ├── [locale]/             # Locale-aware pages (en, de, es)
  │   ├── layout.tsx        # Locale layout with next-intl provider
  │   ├── page.tsx          # Landing page
  │   ├── about/            # About page
  │   ├── contact/          # Contact form page
  │   ├── faq/              # FAQ page
  │   ├── thank-you/        # Thank you page
  │   ├── trails/           # Trails listing + detail pages
  │   │   └── sendero-del-tigre/  # Individual trail page
  │   └── api/
  │       ├── waitlist/     # Waitlist API → Google Sheets + Resend email
  │       ├── contact/      # Contact API → Supabase + Resend email
  │       └── feedback/     # Feedback API → Google Sheets
  ├── api/auth/             # Auth routes (login/logout for password protection)
  ├── login/                # Login page (password protection)
  ├── layout.tsx            # Root layout
  └── globals.css           # Global styles

📁 messages/                # Translation files (i18n)
  ├── en.json               # English translations
  ├── de.json               # German translations
  └── es.json               # Spanish translations

📁 components/
  ├── ui/                   # Reusable UI components (Button, Input, Card, etc.)
  ├── layout/               # Header, Footer
  ├── LanguageSwitcher.tsx  # Language toggle (EN|DE|ES)
  └── features/
      ├── waitlist/         # WaitlistForm component
      ├── contact/          # ContactForm component
      ├── feedback/         # FeedbackModal, FloatingFeedbackButton
      ├── trails/           # Trail components (TrailCard, TrailMap, etc.)
      ├── trailsMap/        # Trails overview map (Leaflet)
      ├── tourGrid/         # Tour grid display
      ├── carousel/         # Image carousel
      └── faq/              # FAQ accordion

📁 lib/
  ├── auth/                 # Password protection (iron-session)
  ├── data/                 # Static data (trails.ts)
  ├── design-tokens/        # Colors, typography, shadows, radius, animations
  ├── email/                # Email templates (contactEmail.ts)
  ├── i18n/                 # Internationalization config
  ├── supabase/             # Supabase client
  ├── types/                # TypeScript types (database, feedback, trails)
  └── utils/                # Validation & utility functions

📁 supabase/
  ├── migrations/           # SQL migrations (001-008)
  └── functions/            # Edge functions (submit-feedback)

📁 e2e/                     # Playwright e2e tests
📁 __tests__/               # Jest unit & component tests
📁 .github/workflows/       # CI/CD pipelines
middleware.ts               # Locale detection, routing & password protection
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

- ✅ Beautiful, responsive landing page with tour grid
- ✅ Waitlist signup form (email → Google Sheets + Resend confirmation email)
- ✅ Contact form (→ Supabase + Resend notification email)
- ✅ Trail pages with maps (Leaflet/GPX), elevation charts, galleries
- ✅ Floating feedback widget (→ Google Sheets)
- ✅ Thank you page with social sharing
- ✅ Optional password protection (iron-session)
- ✅ About page, FAQ page
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
- ✅ Tour grid display
- ✅ Waitlist form integration
- ✅ Responsive design (mobile-first)

#### Waitlist Form
- ✅ Email input with validation
- ✅ Client-side and server-side validation
- ✅ Data stored via Google Sheets webhook (`GOOGLE_SHEETS_WEBHOOK_URL`)
- ✅ Confirmation email sent via Resend (non-blocking)
- ✅ Error handling and loading states

#### Contact Page & Form
- ✅ Contact form with name, email, subject, message
- ✅ Data stored in Supabase (`contact_submissions` table)
- ✅ Email notification sent to `info@senderobiketrails.com` via Resend
- ✅ Client-side and server-side validation

#### Trails Pages
- ✅ Trail listing page (`/trails`)
- ✅ Individual trail detail page (`/trails/sendero-del-tigre`)
- ✅ Trail maps using Leaflet + leaflet-gpx
- ✅ Elevation charts, waypoints timeline, galleries
- ✅ Trail booking CTA, testimonial band, experiences grid
- ✅ Trails overview map section on landing page

#### About & FAQ Pages
- ✅ About page (`/about`)
- ✅ FAQ page with accordion component (`/faq`)

#### Feedback System
- ✅ Floating feedback button (site-wide)
- ✅ Feedback modal with category + message
- ✅ Data sent to Google Sheets via webhook
- ✅ Supabase edge function for feedback (alternative path)

#### Email (Resend)
- ✅ **Waitlist confirmation** — HTML email sent to new signups from `RESEND_FROM_EMAIL` (fallback: `noreply@senderobiketrails.com`)
- ✅ **Contact form notification** — plain text email sent to `info@senderobiketrails.com` from `Sendero Contact Form <contact@senderobiketrails.com>` (hardcoded)
- ✅ Resend SDK v6.9.2 (`resend` npm package)
- ✅ Configured via `RESEND_API_KEY` env var; `RESEND_FROM_EMAIL` used by waitlist route only
- ✅ Non-blocking — email failures are logged but don't break form submissions

#### Password Protection
- ✅ Optional site-wide password gate using `iron-session`
- ✅ Login page at `/login`
- ✅ Auth routes (`/api/auth/login`, `/api/auth/logout`)
- ✅ Controlled via `PASSWORD_PROTECTION_ENABLED` env var
- ✅ Session-based with `SESSION_SECRET` env var

#### API & Database
- ✅ Supabase for contact submissions and feedback storage
- ✅ Google Sheets webhook for waitlist signups and feedback
- ✅ Supabase RLS policies (anonymous INSERT, block SELECT/UPDATE/DELETE)
- ✅ 8 SQL migrations (001-008)
- ✅ Supabase edge function for feedback with Linear integration

#### Thank You Page
- ✅ Confirmation message
- ✅ "What happens next" section
- ✅ Share functionality (clipboard, WhatsApp, Twitter/X, Facebook)
- ✅ Back to home button

#### Internationalization (i18n)
- ✅ Complete trilingual support (EN, DE, ES)
- ✅ Path-based routing (`/en`, `/de`, `/es`)
- ✅ Language switcher in header (EN | DE | ES)
- ✅ Automatic locale detection
- ✅ SEO-optimized with hreflang tags
- ✅ All UI components use translations
- ✅ Form validation messages in all languages

#### DevOps & Testing
- ✅ Jest unit + component tests (34 test files)
- ✅ Playwright e2e tests (`e2e/waitlist-flow.spec.ts`)
- ✅ GitHub Actions CI pipeline
- ✅ GitHub Actions deployment pipeline
- ✅ Vercel Analytics integration
- ✅ TypeScript type safety throughout

---

## 🏗️ Tech Stack

### Frontend - ✅ Implemented

- **Next.js 16** (App Router) - React framework with SSR
- **React 19+** - UI library
- **TypeScript 5+** - Type safety
- **Tailwind CSS 4+** - Utility-first styling
- **next-intl 4.x** - Internationalization
- **Leaflet + leaflet-gpx** - Interactive trail maps
- **Lucide React + React Icons** - Icon libraries
- **Vercel Analytics** - Web analytics

### Backend - ✅ Implemented

- **Supabase (PostgreSQL)** - Database (contact submissions, feedback)
- **Google Sheets (Apps Script webhook)** - Waitlist signups + feedback storage
- **Resend** - Transactional email (waitlist confirmation + contact notifications)
- **iron-session** - Optional password protection
- **Row-Level Security (RLS)** - Supabase data access control
- **Supabase Edge Functions** - Feedback → Linear integration

### DevOps - ✅ Implemented

- **Vercel** - Hosting and deployment
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Unit + component testing
- **Playwright** - End-to-end testing
- **ESLint** - Code linting
- **TypeScript** - Type checking

---

## 🌍 Internationalization (i18n)

### Supported Languages - ✅ Fully Implemented

The application supports **three languages** with complete translations:

- **English (EN)** - Default language, primary audience
- **German (DE)** - European travelers
- **Spanish (ES)** - Colombian locals and Latin American travelers

### Implementation Details

**Library:** `next-intl` (v4.x)
- Purpose-built for Next.js App Router
- Full TypeScript support
- Path-based routing (`/en`, `/de`, `/es`)
- Automatic locale detection from browser
- SEO-optimized with hreflang tags

**Architecture:**
```
app/[locale]/          # Locale-aware pages
messages/
  ├── en.json         # English translations (~105+ strings)
  ├── de.json         # German translations (~105+ strings)
  └── es.json         # Spanish translations (~105+ strings)
lib/i18n/
  ├── config.ts       # Locale configuration
  ├── request.ts      # Request handler
  └── routing.ts      # Navigation helpers
middleware.ts         # Locale detection & routing
```

**Translation Coverage:**
- ✅ All UI components
- ✅ Form labels and validation messages
- ✅ Navigation and footers
- ✅ Error messages
- ✅ SEO metadata (titles, descriptions)
- ✅ Social sharing text
- ✅ Thank you page content

### **IMPORTANT: Multilingual Requirement for Frontend/CX**

**❗ CRITICAL RULE for Claude Code:**

**ALL frontend and customer-facing content MUST be implemented in all three languages (EN, DE, ES).**

This includes:
- ✅ Any new pages or routes
- ✅ Any new UI components
- ✅ Any user-facing text or copy
- ✅ Form labels, buttons, and messages
- ✅ Error messages and validation text
- ✅ Navigation items
- ✅ SEO metadata
- ✅ Email templates (future)
- ✅ Notifications (future)

**How to implement:**
1. Add English text to `messages/en.json`
2. Add German translation to `messages/de.json`
3. Add Spanish translation to `messages/es.json`
4. Use `useTranslations()` hook in components
5. Never hardcode user-facing strings

**Example:**
```tsx
// ❌ WRONG - Hardcoded string
<button>Submit</button>

// ✅ CORRECT - Translated
const t = useTranslations('form');
<button>{t('buttons.submit')}</button>
```

**Backend/Internal Code:**
- Server logs, internal comments, and development-only content can be in English
- Database field names and API endpoints remain in English
- Error logs and debugging info can be English-only

**When adding new features:**
- Plan for translations from the start
- Update all three translation files simultaneously
- Test in all three languages before committing
- Ensure no UI text is hardcoded in English

### Language Switcher

**Location:** Header component (always visible)
**UI:** EN | DE | ES buttons
**Behavior:**
- Switches language without page reload
- Maintains current page path
- Stores preference in cookies
- Updates metadata and hreflang tags

### Translation Notes

**Spanish (ES):**
- Uses Latin American Spanish (not European Spanish)
- Target audience: Colombian locals + Latin American travelers
- "Sendero" is already Spanish (means "trail/path")
- "Región Cafetera" for "Coffee Region"

**German (DE):**
- Uses standard German (Hochdeutsch)
- Target audience: European travelers
- Professional translations for marketing copy

**English (EN):**
- Primary language and default
- US English spelling and conventions
- Source of truth for all translations

---

## 🗄️ Database & Data Storage Architecture

### Data Storage Strategy

The app uses a **hybrid storage approach**:

- **Google Sheets** (via Apps Script webhook) — Waitlist signups and feedback
- **Supabase (PostgreSQL)** — Contact form submissions and feedback (with RLS)

### Google Sheets Integration

Waitlist signups and feedback are sent to Google Sheets via `GOOGLE_SHEETS_WEBHOOK_URL`:
- Waitlist route sends `{ email }` to the webhook
- Feedback route sends `{ type: 'feedback', category, message }` to the webhook

### Supabase Tables

#### Table: `contact_submissions` (migration 007)

- `email` - Text, required
- `name` - Text, required
- `subject` - Text, nullable
- `message` - Text, required
- `locale` - Text (en/de/es)

#### Table: `waitlist_signups` (migration 001)

- `id` - UUID, primary key, auto-generated
- `created_at` - Timestamp, auto-generated
- `email` - Text, **required**, **unique**
- `tour_duration` - Enum: `one_day`, `weekend`, `one_week`
- `interest_types` - Array: `hike`, `bike`, `e_bike`, `women_only`, `coffee_farm`
- `fitness_level` - Enum: `beginner`, `moderate`
- `travel_timeline` - Enum: `next_3_months`, `next_6_months`, `later`
- `notes` - Text, nullable

*Note: The waitlist API route currently writes to Google Sheets, not Supabase. This table/schema exists from the original implementation.*

#### Feedback Storage (migration 008)

Used by the Supabase edge function (`supabase/functions/submit-feedback/`), which also integrates with Linear for issue tracking.

**RLS Policies:**

- ✅ **Allow anonymous INSERT** - Anyone can submit forms
- ✅ **Block all SELECT** - Data only visible in Supabase dashboard
- ✅ **Block UPDATE/DELETE** - Prevent data manipulation

**Migrations:** `supabase/migrations/001` through `008`

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

### 🤖 Git Workflow for Claude Code (AI Assistant)

**IMPORTANT INSTRUCTIONS FOR CLAUDE:**

When the user requests to commit and deploy changes:

1. ✅ **DO**: Stage relevant files with `git add`
2. ✅ **DO**: Create a commit with descriptive message
3. ✅ **DO**: Push to `development` branch: `git push origin development`
4. ❌ **DO NOT**: Merge to `main` branch
5. ❌ **DO NOT**: Push to `main` branch
6. ❌ **DO NOT**: Switch to `main` branch

**Rationale:** The user will manually review changes in `development` and merge to `main` via GitHub UI or local Git when ready for production deployment.

**Example workflow:**
```bash
# ✅ Correct workflow
git add [files]
git commit -m "feat: description"
git push origin development

# ❌ NEVER do this
git checkout main
git merge development
git push origin main
```

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
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `GOOGLE_SHEETS_WEBHOOK_URL`
- `PASSWORD_PROTECTION_ENABLED` (optional)
- `SITE_PASSWORD` (optional, required if password protection enabled)
- `SESSION_SECRET` (optional, required if password protection enabled)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

**Linear Integration (Supabase Edge Function env vars — configured in Supabase Dashboard):**
- `LINEAR_API_KEY`
- `LINEAR_PROJECT_ID`
- `LINEAR_FEEDBACK_TEAM_ID`
- `LINEAR_BUG_REPORT_LABEL_ID`
- `LINEAR_FEATURE_REQUEST_LABEL_ID`
- `LINEAR_GENERAL_LABEL_ID`
- `LINEAR_UX_ISSUE_LABEL_ID`

---

## 🧪 Testing Strategy

### Testing Stack

- ✅ **Jest** - Unit + component test runner
- ✅ **React Testing Library** - Component testing
- ✅ **@testing-library/jest-dom** - DOM matchers
- ✅ **Playwright** - End-to-end testing

### Running Tests

```bash
# Jest tests
npm test                    # Run all Jest tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report

# Playwright e2e
npm run test:e2e            # Run e2e tests
npm run test:e2e:ui         # Playwright UI mode
npm run test:e2e:headed     # Headed browser mode

# All tests
npm run test:all            # Jest + Playwright
```

**Test Files (34 Jest + 1 Playwright):**

- `__tests__/unit/` — Validation, contact email, difficulty, feedback, trails, translations
- `__tests__/api/` — Waitlist, contact, logout API route tests
- `__tests__/components/ui/` — Button, Input, Card, Checkbox, Select, etc.
- `__tests__/components/features/` — Carousel, ContactForm, FAQ, Feedback, TourGrid, TrailsMap
- `__tests__/components/layout/` — Footer
- `__tests__/components/home/` — HomePageSections
- `e2e/waitlist-flow.spec.ts` — Playwright e2e test

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

- **Font:** Helvetica Neue
- **Weights:** Regular, Medium, Bold, Condensed Black

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
- `spacing.ts` - Spacing scale
- `animations.ts` - Animation presets
- `index.ts` - Barrel export

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

- Accordion, Alert, Badge, Button, Card, Checkbox
- Container, Dialog, Input, RadioGroup, Select
- Skeleton, Spinner, Textarea, Toast

**Layout Components:**

- Header (sticky navigation)
- Footer (links and info)

**Feature Components:**

- WaitlistForm, ContactForm, FeedbackModal, FloatingFeedbackButton
- TrailCard, TrailMap, TrailHero, TrailGallery, ElevationChart
- TrailBookingCTA, TrailStory, WaypointsTimeline, BackToTrails, ExperiencesGrid
- TrailsOverviewMap, TrailsMapSection
- TourGrid, CarouselSection, FAQAccordion

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

2. **Run the migrations:**
   - Go to SQL Editor in Supabase dashboard
   - Run all migrations from `supabase/migrations/` (001 through 008) in order

3. **Get your credentials:**
   - Go to Project Settings → API
   - Copy `Project URL` and `anon public` key
   - Add to `.env.local` (see `.env.example` for full list):
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     RESEND_API_KEY=your-resend-api-key
     GOOGLE_SHEETS_WEBHOOK_URL=your-apps-script-webhook-url
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
4. ✅ Check Google Sheets for new waitlist row

---

## 🚢 Deployment

### Vercel Setup

1. **Create Vercel project:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Configure project settings

2. **Add environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_SITE_URL` (your production URL)
     - `RESEND_API_KEY`
     - `RESEND_FROM_EMAIL`
     - `GOOGLE_SHEETS_WEBHOOK_URL`
     - `PASSWORD_PROTECTION_ENABLED` (optional)
     - `SITE_PASSWORD` (optional)
     - `SESSION_SECRET` (optional)

3. **Configure deployment branch:**
   - Set production branch to `main`
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

## 📧 Email & DNS Infrastructure

### Domain & DNS
- **Domain registrar:** Porkbun
- **DNS:** Porkbun (powered by Cloudflare)
- **Email forwarding:** Porkbun email forwarding (MX → `fwd1.porkbun.com`, `fwd2.porkbun.com`)
- **Transactional email:** Resend (via Amazon SES, DKIM configured via `resend._domainkey` CNAME)

### Email Addresses
- **`julian@senderobiketrails.com`** — Primary business email, forwarded to Gmail via Porkbun
- **`noreply@senderobiketrails.com`** — Default sender for waitlist confirmation emails (via Resend)
- **`contact@senderobiketrails.com`** — Sender for contact form notification emails (via Resend)
- **`info@senderobiketrails.com`** — Recipient for contact form notifications (hardcoded in contact API route)

### DNS Records (Key Entries)
- **A record:** `senderobiketrails.com` → Vercel
- **CNAME:** `dev.senderobiketrails.com` / `www.senderobiketrails.com` → Vercel
- **MX:** Porkbun forwarding (`fwd1.porkbun.com`, `fwd2.porkbun.com`)
- **SPF:** `v=spf1 include:_spf.google.com include:spf.resend.com include:spf.porkbun.com ~all`
- **DKIM:** `resend._domainkey` CNAME for Resend
- **DMARC:** `v=DMARC1; p=none;`
- **Resend sending subdomain:** `send.senderobiketrails.com` → Amazon SES

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

### Phase 1 - Smoke Test ✅ Complete

- ✅ Landing page with tour grid
- ✅ Waitlist form (Google Sheets + Resend)
- ✅ Contact form (Supabase + Resend)
- ✅ Thank you page
- ✅ Trail pages with maps
- ✅ About & FAQ pages
- ✅ Feedback system
- ✅ Password protection
- ✅ CI/CD pipeline

### Phase 2 - Email Automation

- ✅ Waitlist confirmation emails (Resend)
- ✅ Contact form notifications (Resend)
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

- No user authentication (by design - public forms + optional password gate)
- Waitlist data goes to Google Sheets only (not Supabase)
- Only one trail detail page exists (Sendero del Tigre)

### Technical Notes

- Using Next.js 16 App Router (not Pages Router)
- Supabase RLS blocks all reads from API (secure)
- Form validation happens both client-side and server-side
- Environment variables must be prefixed with `NEXT_PUBLIC_` for browser access
- Resend emails are non-blocking — failures don't break form submissions
- Google Sheets webhook URL is required for waitlist and feedback routes
- Password protection is opt-in via `PASSWORD_PROTECTION_ENABLED` env var
- Trail maps use Leaflet with GPX file support

---

## 📞 Support & Contact

For questions or issues:

- **GitHub Issues:** Create an issue in the repository
- **Email:** julian@senderobiketrails.com

---

**Version:** 0.1.0 (Smoke Test)
**Last Updated:** April 2026
**Status:** Active development

---

_Built with ❤️ by Colin Rodriguez with AI pair programming (Claude)_
