# Sendero Setup Checklist

Use this checklist to complete your deployment setup.

## ✅ Step-by-Step Setup

### 1. Supabase Configuration (5 minutes)

- [ ] Go to [Supabase API Settings](https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu/settings/api)
- [ ] Copy your **Project URL**: `https://vasyimaemvirnrgekzmu.supabase.co`
- [ ] Copy your **anon public** key
- [ ] Update `.env.local` file with the anon key (URL is already set)

### 2. Run Database Migration (2 minutes)

- [ ] Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu/sql/new)
- [ ] Copy the entire contents of `supabase/migrations/001_create_waitlist_signups.sql`
- [ ] Paste and click "Run"
- [ ] Verify the table was created: [Table Editor](https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu/editor)

### 3. Test Locally (5 minutes)

```bash
# Make sure you updated .env.local with your Supabase anon key first!

# Install dependencies (if not already done)
npm install

# Start dev server
npm run dev
```

- [ ] Open http://localhost:3000
- [ ] Fill out the waitlist form with test data
- [ ] Submit the form
- [ ] Verify redirect to thank-you page
- [ ] Check Supabase dashboard - confirm new row in `waitlist_signups` table

### 4. Initialize Git Repository (2 minutes)

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Sendero waitlist landing page

- Next.js 15 with TypeScript and Tailwind CSS
- Supabase integration for waitlist signups
- Waitlist form with validation
- Thank you page with social sharing
- CI/CD pipeline with GitHub Actions
- Jest testing setup
- Comprehensive documentation

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Add remote (if not already added)
git remote add origin https://github.com/colin-rod/sendero.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5. Create Deployment Branch (1 minute)

```bash
# Create deployment branch from main
git checkout -b deployment
git push -u origin deployment

# Switch back to main for development
git checkout main
```

### 6. Set Up Vercel (10 minutes)

- [ ] Go to [Vercel Dashboard](https://vercel.com/new)
- [ ] Click "Import Project"
- [ ] Select your GitHub repository: `colin-rod/sendero`
- [ ] Configure project settings:
  - **Framework Preset**: Next.js
  - **Root Directory**: `./`
  - **Build Command**: `npm run build`
  - **Output Directory**: `.next`

- [ ] Add Environment Variables in Vercel:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://vasyimaemvirnrgekzmu.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
  NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
  ```

- [ ] Set **Production Branch** to `deployment`
- [ ] Click "Deploy"

### 7. Configure GitHub Secrets for CI/CD (5 minutes)

Go to: https://github.com/colin-rod/sendero/settings/secrets/actions

Add these secrets:

**Supabase:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = `https://vasyimaemvirnrgekzmu.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)
- [ ] `NEXT_PUBLIC_SITE_URL` = (your Vercel URL)

**Vercel (for automated deployment):**
- [ ] `VERCEL_TOKEN` = Get from [Vercel Account Settings](https://vercel.com/account/tokens)
- [ ] `VERCEL_ORG_ID` = Get from Vercel project settings (.vercel/project.json)
- [ ] `VERCEL_PROJECT_ID` = Get from Vercel project settings (.vercel/project.json)

### 8. Test the Full Deployment (5 minutes)

```bash
# Make a small change to test CI/CD
git checkout main
echo "# Test" >> test.txt
git add test.txt
git commit -m "test: verify CI/CD pipeline"
git push origin main

# Merge to deployment to trigger production deploy
git checkout deployment
git merge main
git push origin deployment
```

- [ ] Check GitHub Actions: https://github.com/colin-rod/sendero/actions
- [ ] Verify all CI checks pass (lint, type-check, tests, build)
- [ ] Verify Vercel deployment succeeded
- [ ] Visit your production URL
- [ ] Test the waitlist form on production
- [ ] Verify data appears in Supabase

### 9. Optional: Custom Domain (10 minutes)

If you have a custom domain:

- [ ] Go to Vercel Project Settings → Domains
- [ ] Add your custom domain
- [ ] Update DNS records as instructed by Vercel
- [ ] Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables
- [ ] Update GitHub secret `NEXT_PUBLIC_SITE_URL`

### 10. Final Checks

- [ ] Landing page loads correctly
- [ ] Form submission works
- [ ] Thank you page displays
- [ ] Social sharing works (copy link, WhatsApp, Twitter, Facebook)
- [ ] Data appears in Supabase dashboard
- [ ] Duplicate email shows error message
- [ ] Mobile responsive design works
- [ ] Vercel Analytics is tracking visits

## 🎉 You're Done!

Your Sendero waitlist is now live! Here's what you have:

✅ Production-ready landing page
✅ Functional waitlist form
✅ Data storage in Supabase
✅ Automated CI/CD pipeline
✅ Testing infrastructure
✅ Comprehensive documentation

## 📊 Monitoring Your Waitlist

- **View Signups**: [Supabase Table Editor](https://supabase.com/dashboard/project/vasyimaemvirnrgekzmu/editor/waitlist_signups)
- **Analytics**: Vercel Analytics dashboard in your project
- **CI/CD Status**: https://github.com/colin-rod/sendero/actions

## 🚀 Next Steps

1. **Add Custom Content**:
   - Replace placeholder images with real photos of Colombia
   - Add your logo
   - Update copy as needed

2. **Marketing**:
   - Share the link on social media
   - Add to your email signature
   - Consider running ads

3. **Monitor & Iterate**:
   - Check analytics weekly
   - Review signup data for patterns
   - A/B test different copy/images

## 📞 Need Help?

- **Documentation**: See [CLAUDE.md](CLAUDE.md)
- **Issues**: Create an issue on GitHub
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs

---

Good luck with your Sendero launch! 🚴‍♀️☕🌿
