import { Work_Sans, Aboreto } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Regular, Medium, Semibold, and Bold
  variable: '--font-work-sans',
  display: 'swap',
});

const aboreto = Aboreto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-aboreto',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${workSans.variable} ${aboreto.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
