import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Force dynamic rendering for login page
export const dynamic = 'force-dynamic';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
