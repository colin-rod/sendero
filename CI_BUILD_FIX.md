# CI Build Error Fix

## Problem

The GitHub Actions CI pipeline was failing with the error:
```
Error: Missing env variable: NEXT_PUBLIC_SUPABASE_URL
```

This happened because the Next.js build process requires Supabase environment variables, but they weren't configured in the GitHub Actions workflow.

## Root Cause

The Supabase client (`lib/supabase/client.ts`) validates environment variables at module load time and throws an error if they're missing:

```typescript
if (!supabaseUrl) {
  throw new Error('Missing env variable: NEXT_PUBLIC_SUPABASE_URL');
}
```

This validation happens during the build process, even though the actual Supabase connection isn't used until runtime.

## Solution

Updated the CI workflow (`.github/workflows/ci.yml`) to provide placeholder environment variables for the build step:

```yaml
- name: Build Next.js app
  run: npm run build
  env:
    NEXT_PUBLIC_SUPABASE_URL: 'https://placeholder.supabase.co'
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'placeholder-anon-key-for-build-only'
    NEXT_PUBLIC_SITE_URL: 'https://sendero.vercel.app'
```

These placeholder values allow the build to succeed without requiring real Supabase credentials in CI.

## Why This Works

1. **Build-time vs Runtime**: The environment variables are embedded into the JavaScript bundle at build time but only used at runtime
2. **Placeholder Values**: The placeholder values satisfy the validation check during build
3. **No Actual Connection**: The build process doesn't make any real Supabase connections, so fake values are safe
4. **Tests Use Mocks**: The Jest tests already mock the Supabase client, so they don't need real credentials

## For Production Deployment

The deployment workflow (`.github/workflows/deploy.yml`) still requires real GitHub Secrets to be configured:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

See `.github/SECRETS_SETUP.md` for detailed setup instructions.

## Files Changed

- `.github/workflows/ci.yml` - Added placeholder env vars to build step
- `.github/workflows/deploy.yml` - Added comments about required secrets
- `.github/SECRETS_SETUP.md` - New guide for setting up GitHub Secrets

## Verification

Build tested locally with placeholder values:
```bash
NEXT_PUBLIC_SUPABASE_URL='https://placeholder.supabase.co' \
NEXT_PUBLIC_SUPABASE_ANON_KEY='placeholder-anon-key-for-build-only' \
NEXT_PUBLIC_SITE_URL='https://sendero.vercel.app' \
npm run build
```

Result: ✅ Build succeeds

## Alternative Approaches Considered

1. **Make env vars optional in Supabase client** - Would require code changes and might hide real configuration issues
2. **Use GitHub Secrets with fallbacks** - GitHub Actions expression syntax doesn't support `||` operator cleanly
3. **Mock the Supabase client for builds** - Overly complex and could hide real issues

The chosen approach (placeholder values) is simple, explicit, and works reliably.
