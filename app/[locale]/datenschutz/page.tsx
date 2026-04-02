'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';
import { FaArrowLeft } from 'react-icons/fa6';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';

export default function DatenschutzPage() {
  const t = useTranslations('datenschutz');

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
                aria-label={t('backAriaLabel')}
              >
                <FaArrowLeft className="w-4 h-4" />
              </Link>

              {/* Title */}
              <h1 className="text-h1 font-bold text-foreground">{t('title')}</h1>

              {/* Content */}
              <Accordion type="multiple" className="text-body text-foreground leading-relaxed">

                <AccordionItem value="general">
                  <AccordionTrigger>{t('generalTitle')}</AccordionTrigger>
                  <AccordionContent>{t('generalText')}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="controller">
                  <AccordionTrigger>{t('controllerTitle')}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-1">
                      <p>sendero bike trails</p>
                      <p>Julian Perez</p>
                      <p>Berlin, Deutschland</p>
                      <p>E-Mail: hello@senderobiketrails.com</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="collection">
                  <AccordionTrigger>{t('collectionTitle')}</AccordionTrigger>
                  <AccordionContent>{t('collectionText')}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="purpose">
                  <AccordionTrigger>{t('purposeTitle')}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <p>{t('purposeText1')}</p>
                      <p>{t('purposeText2')}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="storage">
                  <AccordionTrigger>{t('storageTitle')}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <p>{t('storageText1')}</p>
                      <p>{t('storageText2')}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="transfer">
                  <AccordionTrigger>{t('transferTitle')}</AccordionTrigger>
                  <AccordionContent>{t('transferText')}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="security">
                  <AccordionTrigger>{t('securityTitle')}</AccordionTrigger>
                  <AccordionContent>{t('securityText')}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="rights">
                  <AccordionTrigger>{t('rightsTitle')}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <p>{t('rightsText1')}</p>
                      <p>{t('rightsText2')} <strong>hello@senderobiketrails.com</strong></p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cookies">
                  <AccordionTrigger>{t('cookiesTitle')}</AccordionTrigger>
                  <AccordionContent>{t('cookiesText')}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="changes">
                  <AccordionTrigger>{t('changesTitle')}</AccordionTrigger>
                  <AccordionContent>{t('changesText')}</AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
