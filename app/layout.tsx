import './globals.css';

/**
 * Root layout. <html> and <body> are rendered by the top-level layouts
 * (app/[locale]/layout.tsx with the request locale as `lang`, and
 * app/login/layout.tsx), so the document is never nested.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
