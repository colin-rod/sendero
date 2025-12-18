'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Container } from '@/components/ui/Container';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('auth');

  const returnUrl = searchParams.get('return') || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use absolute URL to ensure correct routing
      const apiUrl = `${window.location.origin}/api/auth/login`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, returnUrl }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect to return URL or home
        router.push(data.returnUrl || '/');
        router.refresh(); // Force route refresh
      } else {
        setError(t('errors.invalidPassword'));
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t('errors.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-h1 mb-8 text-center">{t('title')}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={t('passwordLabel')}
            placeholder={t('passwordPlaceholder')}
            error={error}
            autoFocus
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading || !password}
          >
            {loading ? t('loggingIn') : t('loginButton')}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          {t('helpText')}
        </p>
      </div>
    </Container>
  );
}
