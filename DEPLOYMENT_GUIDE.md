# Vercel Deployment Guide

## Prerequisites

- GitHub repository: https://github.com/colin-rod/sendero ✅
- Supabase project: vasyimaemvirnrgekzmu ✅
- Code pushed to main branch ✅

## Step 1: Create Vercel Project

1. Go to https://vercel.com/new
2. Import your GitHub repository: `colin-rod/sendero`
3. Vercel will auto-detect Next.js settings

## Step 2: Configure Environment Variables

In the Vercel project settings, add these environment variables:

### Required Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://vasyimaemvirnrgekzmu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhc3lpbWFlbXZpcm5yZ2Vrem11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDAyNDgsImV4cCI6MjA3OTAxNjI0OH0.flWvTrXZhYdx82mLC-iuzDUyV8IX9gKV66SIIttUX_4
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

**Note:** Update `NEXT_PUBLIC_SITE_URL` with your actual Vercel URL after deployment.

## Step 3: Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Visit your deployed site!

## Step 4: Update Site URL

After deployment:

1. Copy your Vercel URL (e.g., `sendero-abc123.vercel.app`)
2. Go to Vercel project settings → Environment Variables
3. Update `NEXT_PUBLIC_SITE_URL` to your actual domain
4. Redeploy from Vercel dashboard

## Step 5: Set Up Custom Domain (Optional)

1. Go to Vercel project settings → Domains
2. Add your custom domain (e.g., `sendero.com`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

## Step 6: Configure GitHub Actions (Optional)

To enable automatic deployments via GitHub Actions:

1. Get your Vercel token: https://vercel.com/account/tokens
2. Get your Vercel Org ID and Project ID:
   ```bash
   npx vercel link
   cat .vercel/project.json
   ```
3. Add these secrets to GitHub repository settings:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: From project.json
   - `VERCEL_PROJECT_ID`: From project.json

Now every push to `deployment` branch will automatically deploy to Vercel!

## Verification Checklist

- [ ] Site is live and accessible
- [ ] Form submission works
- [ ] Thank-you page redirects correctly
- [ ] Social sharing buttons work
- [ ] Data appears in Supabase dashboard
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] All images load correctly

## Troubleshooting

### Build Fails

- Check environment variables are set correctly
- Review build logs in Vercel dashboard
- Ensure all dependencies are in package.json

### Form Doesn't Work in Production

- Verify Supabase environment variables
- Check browser console for errors
- Ensure RLS policies are correctly set (run migration 006)
- Check Supabase logs for 401 errors

### Social Sharing Broken

- Update `NEXT_PUBLIC_SITE_URL` to production URL
- Redeploy after updating environment variable

## Next Steps

1. Test the live site thoroughly
2. Replace placeholder images with real photos
3. Add custom domain
4. Set up analytics monitoring
5. Share the link and start collecting signups! 🚀
