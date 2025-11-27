import { Work_Sans } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Regular, Medium, Semibold, and Bold
  variable: '--font-work-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={workSans.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
