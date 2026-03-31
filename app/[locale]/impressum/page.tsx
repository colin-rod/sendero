import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';
import { FaArrowLeft } from 'react-icons/fa6';

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header logoVariant="dark" />
      <main id="main-content" className="flex-1">
        <section className="py-16 md:py-24">
          <Container>
            <div className="max-w-2xl mx-auto flex flex-col gap-8">

              {/* Back button */}
              <Link
                href="/"
                className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-foreground text-foreground hover:bg-foreground hover:text-white transition-colors"
                aria-label="Back to home"
              >
                <FaArrowLeft className="w-4 h-4" />
              </Link>

              {/* Title */}
              <h1 className="text-h1 font-bold text-foreground">Impressum</h1>

              {/* Content */}
              <div className="flex flex-col gap-6 text-body text-foreground leading-relaxed">

                <p>Angaben gemäß § 5 TMG</p>

                <div className="flex flex-col gap-1">
                  <p className="font-bold">sendero bike trails</p>
                  <p>Julian Perez</p>
                  <p>Pettenkoferstrasse 6</p>
                  <p>10247 Berlin</p>
                  <p>Deutschland</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-bold">Kontakt</p>
                  <p>E-Mail: hello@senderobiketrails.com</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-bold">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</p>
                  <p>Julian Perez</p>
                  <p>Pettenkoferstrasse 6</p>
                  <p>10247 Berlin</p>
                  <p>Deutschland</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Haftung für Inhalte</p>
                  <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Haftung für Links</p>
                  <p>Unsere Website enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir keine Gewähr.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Urheberrecht</p>
                  <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
                </div>

              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
