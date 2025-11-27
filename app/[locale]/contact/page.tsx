import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';

const sectionKeys = ['whatsapp', 'email', 'smallForm', 'microcopy'] as const;

export default function ContactPage() {
  const t = useTranslations('contactPage');

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <Container size="sm">
          <article className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <header className="bg-primary-600 px-6 py-4 text-white">
              <h1 className="text-h3 font-semibold uppercase tracking-wide">
                {t('title')}
              </h1>
            </header>

            <div className="px-6 py-6">
              <ul className="space-y-4 text-body text-foreground">
                {sectionKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary-600" aria-hidden />
                    <span>{t(`sections.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-border px-6 py-4 text-sm text-muted-foreground">
              {t('sectionsCount', { count: sectionKeys.length })}
            </footer>
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
