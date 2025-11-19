# GitHub Secrets Setup Guide

This project requires several GitHub Secrets to be configured for CI/CD pipelines to work properly.

## Required Secrets

### For CI/CD Build (Optional - uses placeholders if not set)

The CI workflow (`ci.yml`) will use placeholder values for building if these aren't set. For production deployment, you must add real values.

### For Production Deployment (Required)

Go to your GitHub repository:
**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the following secrets:

#### Supabase Configuration

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Get from: [Supabase Dashboard](https://app.supabase.com) → Your Project → Settings → API
   - Format: `https://xxxxxxxxxxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Get from: [Supabase Dashboard](https://app.supabase.com) → Your Project → Settings → API
   - Look for: "anon public" key
   - Format: Long string starting with `eyJ...`

3. **NEXT_PUBLIC_SITE_URL**
   - Your production URL
   - Example: `https://sendero.vercel.app` or your custom domain

#### Vercel Configuration (for deployment)

4. **VERCEL_TOKEN**
   - Get from: [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token with deployment permissions

5. **VERCEL_ORG_ID**
   - Get from: Vercel Project Settings → General
   - Or run: `vercel project ls` in your terminal

6. **VERCEL_PROJECT_ID**
   - Get from: Vercel Project Settings → General
   - Or check `.vercel/project.json` after linking project

## Current Status

- ✅ CI workflow uses placeholder values for builds (tests will still run)
- ⚠️ Deployment workflow requires real secrets to be set up
- ⚠️ Set up these secrets before merging to `main` branch

## Local Development

For local development, copy `.env.example` to `.env.local` and add your values:

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

## Testing the Setup

After adding secrets:
1. Push to `development` branch - CI should build successfully
2. Merge to `main` branch - Deployment workflow should deploy to Vercel

## Troubleshooting

**Build fails with "Missing env variable":**
- Make sure all three Supabase secrets are added to GitHub
- Check that secret names match exactly (case-sensitive)
- Verify secrets are not expired

**Deployment fails:**
- Verify all Vercel secrets (TOKEN, ORG_ID, PROJECT_ID) are correct
- Check Vercel token has not expired
- Ensure Vercel project is linked to the repository
