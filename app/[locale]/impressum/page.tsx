import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';

export default function ImpressumPage() {
  const t = useTranslations('impressum');

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoVariant="dark" />
      <main id="main-content" className="flex-1">
        <section className="py-16 md:py-24">
          <Container>
            <div className="max-w-2xl mx-auto flex flex-col gap-8">

              {/* Title */}
              <h1 className="text-h1 font-bold text-foreground">{t('title')}</h1>

              {/* Content */}
              <div className="flex flex-col gap-6 text-body text-foreground leading-relaxed">

                <p>{t('legalInfo')}</p>

                <div className="flex flex-col gap-1">
                  <p className="font-bold">sendero bike trails</p>
                  <p>Julian Perez</p>
                  <p>Pettenkoferstrasse 6</p>
                  <p>10247 Berlin</p>
                  <p>Deutschland</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-bold">{t('contact')}</p>
                  <p>E-Mail: hello@senderobiketrails.com</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-bold">{t('responsible')}</p>
                  <p>Julian Perez</p>
                  <p>Pettenkoferstrasse 6</p>
                  <p>10247 Berlin</p>
                  <p>Deutschland</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('liabilityContentTitle')}</p>
                  <p>{t('liabilityContentText')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('liabilityLinksTitle')}</p>
                  <p>{t('liabilityLinksText')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('copyrightTitle')}</p>
                  <p>{t('copyrightText')}</p>
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
