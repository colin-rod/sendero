const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    // Exclude page components (hard to test with i18n locale routing)
    '!app/**/page.tsx',
    '!app/**/layout.tsx',
    // Exclude design tokens (just data exports, no logic to test)
    '!lib/design-tokens/**',
    // Exclude i18n config (just configuration files)
    '!lib/i18n/**',
    // Exclude other config-only files
    '!lib/types/**',
    // Exclude components that depend on i18n (require complex mocking)
    '!components/layout/**',
    '!components/features/waitlist/**',
    '!components/LanguageSwitcher.tsx',
    '!components/HeroEmailCapture.tsx',
    '!components/HeroVideo.tsx',
    // Exclude Supabase client (just a client initialization)
    '!lib/supabase/**',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
