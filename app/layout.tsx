import { Analytics } from '@vercel/analytics/react';
import { getLocale } from 'next-intl/server';
import { aboreto } from '@/lib/fonts';
import './globals.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={aboreto.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
