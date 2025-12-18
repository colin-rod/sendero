import Image from 'next/image';
import Link from 'next/link';

// Force dynamic rendering for login page
export const dynamic = 'force-dynamic';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Simple header without translations */}
      <header className="sticky top-0 z-50 w-full bg-[rgba(27,27,27,1.0)]">
        <div className="container mx-auto px-4">
          <div className="flex h-16 max-w-[1200px] mx-auto items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3"
              aria-label="Sendero - Home"
            >
              <Image
                src="/Color=Gravel.png"
                alt="Sendero Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-primary-500">
                Sendero
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      {/* Simple footer without translations */}
      <footer className="bg-foreground text-background py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Sendero. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
