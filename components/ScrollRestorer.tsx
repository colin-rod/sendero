'use client';
import { useEffect } from 'react';

export default function ScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem('scrollAfterLocaleSwitch');
    if (saved !== null) {
      sessionStorage.removeItem('scrollAfterLocaleSwitch');
      window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
    }
  }, []);
  return null;
}
