# Sendero - Hike & Bike Colombia

Beginner-friendly, sustainable hike & bike tours in Colombia's Coffee Region.

[![CI](https://github.com/flowlian/sendero/actions/workflows/ci.yml/badge.svg)](https://github.com/flowlian/sendero/actions/workflows/ci.yml)
[![Deploy](https://github.com/flowlian/sendero/actions/workflows/deploy.yml/badge.svg)](https://github.com/flowlian/sendero/actions/workflows/deploy.yml)

---

## 🚴 About Sendero

Sendero offers beginner-friendly hike and bike tours through Colombia's stunning Coffee Region (Pereira). We specialize in:

- 🚴‍♀️ **E-bike tours** for all fitness levels
- 🌱 **Eco-conscious** sustainable tourism
- ☕ **Coffee farm** experiences
- 👩‍👩‍👧 **Women-only** group tours
- 🥾 **Hiking** through cloud forests and mountains

This repository contains the waitlist landing page for our upcoming tour launch.

---

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database
- **Vercel** - Hosting
- **Jest** - Testing

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Add your Supabase credentials to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

---

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

---

## 🗄️ Database Setup

1. Create a Supabase project at [app.supabase.com](https://app.supabase.com)
2. Run the migration from `supabase/migrations/001_create_waitlist_signups.sql`
3. Get your project URL and anon key from Project Settings → API
4. Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/flowlian/sendero)

1. Click the button above or manually import to Vercel
2. Add environment variables in Vercel project settings
3. Deploy!

The `deployment` branch automatically deploys to production.

---

## 🧪 Testing

Tests are written with Jest and React Testing Library.

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

---

## 📂 Project Structure

```
sendero/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── thank-you/         # Thank you page
│   └── api/waitlist/      # API endpoint
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Header, Footer
│   └── features/waitlist/ # Waitlist form
├── lib/
│   ├── supabase/          # Supabase client
│   ├── types/             # TypeScript types
│   └── utils/             # Utilities
├── supabase/
│   └── migrations/        # Database migrations
├── __tests__/             # Jest tests
└── .github/workflows/     # CI/CD pipelines
```

---

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Please open an issue to discuss proposed changes.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 📞 Contact

Have questions about our tours or this project?

- **Website:** Coming soon!
- **Email:** (Add your email)

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

_Discover Colombia's Coffee Region, one pedal at a time._ 🚴‍♀️☕🌿
