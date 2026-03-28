import { Aboreto, Work_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const aboreto = Aboreto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-aboreto',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-work-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${aboreto.variable} ${workSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
