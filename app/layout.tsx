import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Regular, Medium, Semibold, and Bold
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sendero Bike Trails - Beginner-Friendly Hike & Bike Tours in Colombia',
  description:
    'Join the waitlist for sustainable, beginner-friendly hike and bike tours in Colombia\'s Coffee Region. E-bikes, women-only groups, and coffee farm experiences.',
  keywords: [
    'colombia tours',
    'coffee region',
    'pereira',
    'bike tours',
    'hiking',
    'e-bike',
    'sustainable travel',
    'eco-tourism',
    'beginner cycling',
  ],
  authors: [{ name: 'Sendero Bike Trails' }],
  openGraph: {
    title: 'Sendero Bike Trails - Hike & Bike Colombia',
    description:
      'Beginner-friendly, sustainable tours in Colombia\'s Coffee Region',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sendero Bike Trails - Hike & Bike Colombia',
    description:
      'Beginner-friendly, sustainable tours in Colombia\'s Coffee Region',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
