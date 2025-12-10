import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';

export default function TrailsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Container className="py-20 md:py-32">
          {/* Blank content area - will be filled later */}
          <div className="min-h-[400px]">
            {/* Placeholder for trails content */}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
