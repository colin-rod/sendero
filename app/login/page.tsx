'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Container } from '@/components/ui/Container';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get('return') || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, returnUrl }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(data.returnUrl || '/');
        router.refresh();
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-h1 mb-8 text-center">Site Access</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter password"
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
            {loading ? 'Logging in...' : 'Access Site'}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          Enter the password to access the site
        </p>
      </div>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <Container className="py-16">
        <div className="max-w-md mx-auto text-center">
          <p>Loading...</p>
        </div>
      </Container>
    }>
      <LoginForm />
    </Suspense>
  );
}
