import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';
import { FaArrowLeft } from 'react-icons/fa6';

export default function DatenschutzPage() {
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
              <h1 className="text-h1 font-bold text-foreground">Datenschutzerklärung</h1>

              {/* Content */}
              <div className="flex flex-col gap-6 text-base text-foreground leading-relaxed">

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Allgemeine Hinweise</p>
                  <p>Wir freuen uns über dein Interesse an sendero bike trails. Der Schutz deiner persönlichen Daten ist uns wichtig. Im Folgenden informieren wir dich darüber, welche Daten wir erheben, wie wir sie verwenden und welche Rechte du hast.</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-bold">Verantwortlicher</p>
                  <p>sendero bike trails</p>
                  <p>Julian Perez</p>
                  <p>Berlin, Deutschland</p>
                  <p>E-Mail: hello@senderobiketrails.com</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Erhebung und Speicherung personenbezogener Daten</p>
                  <p>Wir erheben personenbezogene Daten nur, wenn du sie uns freiwillig mitteilst. Auf dieser Website betrifft das insbesondere deine E-Mail-Adresse, wenn du dich über das Formular einträgst.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Zweck der Datenverarbeitung</p>
                  <p>Wir verwenden deine Daten ausschließlich, um dir Informationen und Updates zu unseren Bike Tours zu senden sowie um dich im Zusammenhang mit deinem Interesse an unseren Angeboten zu kontaktieren.</p>
                  <p>Die Verarbeitung erfolgt nur auf Grundlage deiner Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Speicherung der Daten</p>
                  <p>Deine Daten werden in einer internen Liste (z. B. Excel) gespeichert und nicht an Dritte weitergegeben.</p>
                  <p>Wir speichern deine Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder bis du deine Einwilligung widerrufst.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Weitergabe von Daten</p>
                  <p>Wir geben deine personenbezogenen Daten nicht an Dritte weiter und verkaufen sie nicht.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Datensicherheit</p>
                  <p>Wir treffen angemessene technische und organisatorische Maßnahmen, um deine Daten vor Verlust, Missbrauch oder unbefugtem Zugriff zu schützen.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Deine Rechte</p>
                  <p>Du hast jederzeit das Recht auf Auskunft über deine gespeicherten Daten, auf Berichtigung unrichtiger Daten, auf Löschung deiner Daten, auf Einschränkung der Verarbeitung sowie auf Widerruf deiner Einwilligung.</p>
                  <p>Zur Ausübung deiner Rechte genügt eine E-Mail an: <strong>hello@senderobiketrails.com</strong></p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Cookies</p>
                  <p>Diese Website verwendet keine Cookies oder Tracking-Technologien, die einer Einwilligung bedürfen.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">Änderungen dieser Datenschutzerklärung</p>
                  <p>Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an rechtliche Anforderungen oder Änderungen unserer Leistungen anzupassen.</p>
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
