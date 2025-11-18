## **roject Scoping Doc for Claude – Smoke Test “Hike & Bike Colombia”**

### **0\. Meta-Instructions for Claude**

You are helping me scaffold a **small, production-ready smoke test web app**.

Please work **step by step**, generating code and structure incrementally (not one giant blob):

1. First, confirm understanding and restate the architecture.

2. Then propose the **file structure**.

3. Then, in separate steps, generate:

   * Supabase schema (SQL and TypeScript types)

   * Next.js app shell and layout

   * Landing page

   * API integration with Supabase

   * Thank-you page

   * Simple design system (light)

   * Vercel Analytics integration

4. After each step, pause so I can copy/paste or ask for tweaks.

Keep the implementation **simple, clean, and beginner-friendly to maintain**.

---

## **1\. Goal of This Smoke Test**

We are testing **market interest** and **concept validation** for:

* Beginner-friendly, sustainable **hike & bike tours** in Colombia’s Coffee Region (Pereira-focused).

* Specific tour formats:

  * **Duration**: 1 day / weekend / 1 week

  * **Modes**: hike, bike, e-bike

  * **Special interest**: women-only tours, coffee farm experiences

* Target audience: **beginner and moderate cyclists**, eco-conscious travelers.

Primary KPI: **number \+ quality of sign-ups with preferences**.

No full app needed — just:

* A convincing **landing page** (light branding).

* A **sign-up form** (email \+ preferences).

* **Thank-you/Share page**.

* Data stored in **Supabase** (no auth).

* Deployed on **Vercel** with **Vercel Analytics**.

---

## **2\. Tech Stack / Constraints**

* **Frontend**: Next.js (App Router preferred, TypeScript).

* **Deployment**: Vercel.

* **Backend / DB**: Supabase (Postgres).

* **Auth**: **None** for now.

  * This is a simple waitlist; users just submit a form.

* **Analytics**: Vercel Analytics.

* **Styling**:

  * Use simple CSS or Tailwind CSS (you choose; propose one).

  * Light “design system” (tokens \+ basic components, see section 7).

* **Emails**: None for now. Just store in DB.

* **Environment variables**: Supabase URL \+ anon key, etc.

Assume I’ll provide **logo and imagery later** — use placeholders.

---

## **3\. Core User Flow**

**Flow:**

1. Visitor hits `/` (Landing Page).

2. Reads short pitch (beginner-friendly, sustainable hike & bike tours in Colombia).

3. Fills in sign-up form:

   * Email

   * Tour duration (1 day / weekend / 1 week)

   * Interest type(s)

   * Fitness level

   * Travel timeline

4. On submit:

   * Data is validated client-side.

   * Data is sent to an API route that inserts into Supabase.

   * On success, user is **redirected to `/thank-you`**.

5. `/thank-you` shows:

   * Confirmation message.

   * Short “what happens next”.

   * Simple “share” options:

     * Copy link

     * WhatsApp share link

     * Possibly generic “Share on X / Facebook” links (just basic URLs).

---

## **4\. Data Model – Supabase**

Create a **single table** in Supabase for this smoke test.

### **Table: `waitlist_signups`**

Fields:

* `id` – UUID, primary key, default `gen_random_uuid()`.

* `created_at` – `timestamptz`, default `now()`.

* `email` – `text`, **required**, unique constraint (one entry per email).

* `tour_duration` – `text`, enum-like values:

  * `"one_day"`, `"weekend"`, `"one_week"`.

* `interest_types` – `text[]` (array), possible values:

  * `"hike"`, `"bike"`, `"e_bike"`, `"women_only"`, `"coffee_farm"`.

* `fitness_level` – `text`, values:

  * `"beginner"`, `"moderate"`.

* `travel_timeline` – `text`, values:

  * `"next_3_months"`, `"next_6_months"`, `"later"`.

* `notes` – `text`, nullable (optional free text, we might add later).

**What I need from you (Claude):**

1. SQL to create this table.

2. Suggested **RLS policy**:

   * Since we have **no auth**, simplest is to **disable RLS** or add an “insert only” permissive policy.

   * Suggest the most straightforward, secure-enough approach for this test.

3. TypeScript types for this table (e.g. `WaitlistSignup`).

---

## **5\. Pages & Routing**

Use the **App Router** if possible.

### **Routes**

1. `/` – **Landing Page**

   * Hero section:

     * Clear headline: beginner-friendly, sustainable hike & bike tours in Colombia’s Coffee Region.

     * Subheadline: emphasize e-bikes, women-only groups, coffee farm immersion.

     * Primary CTA: “Join the Waitlist”.

   * Brief section “How it works” (3 steps).

   * Section on who it’s for (beginners, moderate, eco-conscious travelers).

   * Sign-up form (can be on the hero or separate section on the same page).

2. `/thank-you`

   * Simple message:

     * “You’re on the list\! We’ll be in touch when tours open up.”

   * Short copy on next steps.

   * Basic share options:

     * A “Copy link” button to copy the site URL.

     * A WhatsApp share link (e.g. `https://wa.me/?text=Check%20out%20this%20new%20beginner-friendly%20hike%20%26%20bike%20tour%20in%20Colombia%3A%20<URL>`).

     * Optional simple links for X / Facebook share.

   * “Back to home” link.

3. Optional: `/privacy` or `/about` as static placeholder pages (not strictly necessary but nice if easy).

---

## **6\. Forms & API Interaction**

### **Frontend form fields**

On the landing page:

* **Email** (text input, required, email validation).

* **Tour duration** (radio or select):

  * 1 day

  * Weekend

  * 1 week

* **Interest types** (multi-select via checkboxes):

  * Hike

  * Bike

  * E-bike

  * Women-only

  * Coffee farm

* **Fitness level** (radio):

  * Beginner

  * Moderate

* **Travel timeline** (radio or select):

  * Next 3 months

  * Next 6 months

  * Later

**Form behavior:**

* Client-side validation:

  * Email must not be empty and must look like a real email.

  * Tour duration, fitness level, timeline must be selected.

* On submit:

  * Disable submit button while processing.

  * Call an internal API route.

  * If success → redirect to `/thank-you`.

  * If error (e.g., duplicate email) → show inline error.

### **API route**

Create an API route, e.g.:

* `POST /api/waitlist`  
   Body JSON:

{  
  email: string;  
  tourDuration: "one\_day" | "weekend" | "one\_week";  
  interestTypes: ("hike" | "bike" | "e\_bike" | "women\_only" | "coffee\_farm")\[\];  
  fitnessLevel: "beginner" | "moderate";  
  travelTimeline: "next\_3\_months" | "next\_6\_months" | "later";  
}

Behavior:

* Validate payload server-side (never trust client).

* Insert into `waitlist_signups`.

* Handle unique email conflict:

  * Return 409 with clear message.

* Return 200 / 201 on success.

**What I need from you:**

* Implementation of the API route using Supabase’s JS client.

* Example of Supabase client initialization:

  * For server-side: using `@supabase/supabase-js` with env vars.

---

## **7\. Light Design System (Placeholder)**

Create a **simple design system** we can later refine.

### **Design goals**

* Clean, modern, calm.

* Convey:

  * “Nature”, “green”, “trust”, “approachable”.

* No heavy visual framework complexity.

### **What I’d like you to define**

1. **Design tokens** (in TS or CSS):

   * Colors:

     * `--color-primary` (a green tone)

     * `--color-accent` (maybe a warm coffee/brown or soft yellow)

     * `--color-bg`

     * `--color-text`

     * `--color-muted`

     * `--color-border`

   * Typography:

     * Base font stack (e.g. system or Google font placeholder).

     * Heading sizes and weights.

     * Body text size and line height.

   * Spacing scale (e.g., `4, 8, 12, 16, 24, 32`).

2. **Basic components**:

   * `Button`

   * `Input`

   * `Select` / Radio group / Checkbox styles

   * `Container` (for max width layout)

   * Basic `Card` style for sections

You can:

* Implement via **CSS modules** or **Tailwind**.

* If Tailwind, configure basic theme in `tailwind.config.ts` and show how to apply.

---

## **8\. File / Folder Structure (Proposed)**

Please propose and then implement something like:

/  
  app/  
    layout.tsx  
    page.tsx               // landing page  
    thank-you/  
      page.tsx  
    api/  
      waitlist/route.ts    // POST handler  
  lib/  
    supabaseClient.ts  
    types.ts  
  components/  
    ui/  
      Button.tsx  
      Input.tsx  
      Select.tsx  
      Checkbox.tsx  
      RadioGroup.tsx  
      Container.tsx  
    Layout.tsx  
    WaitlistForm.tsx  
  styles/  
    globals.css  
    design-tokens.css (if not Tailwind)  
  env.d.ts                 // env type definitions

You can adjust, but keep it **simple and idiomatic**.

---

## **9\. Vercel & Analytics**

* Integrate **Vercel Analytics** following the standard Next.js App Router pattern.

* Show where to place `<Analytics />` in the layout.

* Assume I will later configure Vercel project \+ environment variables.

---

## **10\. Acceptance Criteria**

The smoke test is “done” when:

1. App builds and runs locally (`npm run dev`) with no TypeScript errors.

2. When deployed on Vercel:

   * `/` loads fast and is responsive (mobile-friendly).

   * Form submission inserts a new row into `waitlist_signups` in Supabase.

   * On success, the user is redirected to `/thank-you`.

   * `/thank-you` displays share options (copy link, WhatsApp share).

3. Duplicate email submissions show a clear error (e.g., “This email is already on the list”).

4. Vercel Analytics is wired up.

5. Basic styling is applied (not ugly default HTML), using the defined design tokens.

6. No auth flows are present.

---

## **11\. CI/CD Requirements**

### **Git Workflow**

* **Branches:**
  * `main` – Development branch (default)
  * `deployment` – Production deployment branch
  * `feature/*` – Feature branches

### **Deployment Pipeline**

* Push to `deployment` branch triggers:
  1. Lint checks
  2. TypeScript type checking
  3. Run tests (Jest)
  4. Build verification
  5. Deploy to Vercel production

* On successful deployment:
  1. Run post-deployment smoke tests (optional)

### **Testing Requirements**

* **Unit tests** for form validation logic
* **Component tests** for WaitlistForm
* **API route tests** for `/api/waitlist`
* Tests run on every PR and before deployment

---

## **12\. Step-by-Step Plan for You, Claude**

Please follow this order:

1. Restate the architecture and confirm tech choices (Next.js \+ App Router, Supabase, etc.).

2. Propose and finalize the **file structure**.

3. Generate:

   * SQL migration for `waitlist_signups` \+ RLS decisions.

   * TypeScript types for the waitlist entries.

4. Implement:

   * `lib/supabaseClient.ts` with proper server-side client.

   * Next.js `layout.tsx` with design system base and Vercel Analytics.

5. Implement the **Landing Page**:

   * Layout, hero, sections, and `WaitlistForm` component (no functionality yet).

6. Implement the **WaitlistForm** component:

   * Controlled inputs, validation, POST call to `/api/waitlist`.

7. Implement `/api/waitlist/route.ts`:

   * Input validation

   * Insert into Supabase

   * Error handling for duplicates

   * Response contracts

8. Implement `/thank-you` page:

   * Confirmation message

   * Share buttons (copy link, WhatsApp, etc.)

9. Set up **CI/CD pipeline**:

   * GitHub Actions workflow
   * Jest testing setup
   * Deployment to Vercel on `deployment` branch

10. Final pass:

   * Ensure TypeScript types are used and correct.

   * Suggest `.env` variables and how they are referenced.

   * Provide brief instructions:

     * How to run locally

     * How to configure Supabase env vars

     * How to deploy to Vercel

