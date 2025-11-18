# Sendero - Quick Start Guide

Get your waitlist up and running in under 15 minutes.

## 🎯 Prerequisites

- ✅ GitHub repo: https://github.com/colin-rod/sendero
- ✅ Supabase project: https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu
- ⏳ Node.js 20+ installed
- ⏳ Vercel account (free)

## ⚡ 3-Step Quick Start

### Step 1: Get Supabase Credentials (2 min)

1. Open: https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu/settings/api
2. Copy the **anon public** key
3. Paste it into `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
   ```

### Step 2: Create Database (2 min)

1. Open: https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu/sql/new
2. Copy ALL contents from `supabase/migrations/001_create_waitlist_signups.sql`
3. Paste and click "Run"

### Step 3: Test Locally (2 min)

```bash
npm install
npm run dev
```

Visit http://localhost:3000 and test the form!

## 🚀 Deploy to Production (10 min)

### Quick Deploy

```bash
# Push to GitHub
git add .
git commit -m "feat: initial Sendero waitlist"
git push origin main

# Create deployment branch
git checkout -b deployment
git push -u origin deployment
```

### Set Up Vercel

1. Go to: https://vercel.com/new
2. Import `colin-rod/sendero`
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL=https://vasyimaemvirnrgekzmu.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key`
   - `NEXT_PUBLIC_SITE_URL=your-vercel-url`
4. Set production branch to `deployment`
5. Deploy!

## ✅ Verify Everything Works

- [ ] Visit your Vercel URL
- [ ] Submit the form
- [ ] Check Supabase for new row
- [ ] Test share buttons on thank-you page

## 📊 View Your Signups

https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu/editor/waitlist_signups

## 🎨 Customize

Edit these files to customize:
- `app/page.tsx` - Landing page content
- `tailwind.config.ts` - Colors and design
- Replace images: Search for `placehold.co` in the code

## 📚 Full Documentation

- [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - Complete setup guide
- [CLAUDE.md](CLAUDE.md) - Technical documentation
- [README.md](README.md) - Project overview

## 🆘 Common Issues

**"Invalid Supabase URL"**
- Make sure `.env.local` has the correct credentials
- Restart dev server: `Ctrl+C` then `npm run dev`

**"Table doesn't exist"**
- Run the SQL migration in Supabase dashboard
- Check table exists: [Table Editor](https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu/editor)

**Form not submitting**
- Check browser console for errors
- Verify Supabase credentials are correct
- Make sure RLS policies were created (in the migration)

## 🎉 You're Live!

Once deployed, share your link:
- Twitter/X
- WhatsApp
- Email
- Social media

Track signups in your Supabase dashboard and watch your waitlist grow! 📈

---

**Questions?** See [CLAUDE.md](CLAUDE.md) for detailed docs.
