import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';

export default function AgbPage() {
  const t = useTranslations('agb');

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoVariant="dark" />
      <main id="main-content" className="flex-1">
        <section className="pt-32 pb-16 md:pt-24 md:pb-24">
          <Container>
            <div className="max-w-2xl mx-auto flex flex-col gap-8">

              {/* Title */}
              <h1 className="text-h1 font-bold text-foreground">{t('title')}</h1>

              {/* Content */}
              <div className="flex flex-col gap-6 text-body text-foreground leading-relaxed">

                <p>{t('introText')}</p>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('organizerTitle')}</p>
                  <p>{t('organizerText')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('registrationTitle')}</p>
                  <p>{t('registrationText')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('paymentTitle')}</p>
                  <p>{t('paymentText1')}</p>
                  <p>{t('paymentText2')}</p>
                  <p>{t('paymentText3')}</p>
                  <p>{t('paymentText4')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('servicesTitle')}</p>
                  <p>{t('servicesText')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('withdrawalTitle')}</p>
                  <p>{t('withdrawalText1')}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border bg-white text-left">
                      <thead>
                        <tr>
                          <th className="text-body-em border border-border p-3">{t('withdrawalTableHeader1')}</th>
                          <th className="text-body-em border border-border p-3">{t('withdrawalTableHeader2')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-body border border-border p-3">{t('withdrawalRow1Label')}</td>
                          <td className="text-body border border-border p-3">{t('withdrawalRow1Value')}</td>
                        </tr>
                        <tr>
                          <td className="text-body border border-border p-3">{t('withdrawalRow2Label')}</td>
                          <td className="text-body border border-border p-3">{t('withdrawalRow2Value')}</td>
                        </tr>
                        <tr>
                          <td className="text-body border border-border p-3">{t('withdrawalRow3Label')}</td>
                          <td className="text-body border border-border p-3">{t('withdrawalRow3Value')}</td>
                        </tr>
                        <tr>
                          <td className="text-body border border-border p-3">{t('withdrawalRow4Label')}</td>
                          <td className="text-body border border-border p-3">{t('withdrawalRow4Value')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>{t('withdrawalText2')}</p>
                  <p>{t('withdrawalText3')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('cancellationByOperatorTitle')}</p>
                  <p>{t('cancellationByOperatorText1')}</p>
                  <p>{t('cancellationByOperatorText2')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('healthSafetyTitle')}</p>
                  <p>{t('healthSafetyText1')}</p>
                  <p>{t('healthSafetyText2')}</p>
                  <p>{t('healthSafetyText3')}</p>
                  <p>{t('healthSafetyText4')}</p>
                  <p>{t('healthSafetyText5')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('bikesTitle')}</p>
                  <p>{t('bikesText1')}</p>
                  <p>{t('bikesText2')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('insuranceTitle')}</p>
                  <p>{t('insuranceText1')}</p>
                  <p>{t('insuranceText2')}</p>
                  <p>{t('insuranceText3')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('liabilityTitle')}</p>
                  <p>{t('liabilityText1')}</p>
                  <p>{t('liabilityText2')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('mediaDataTitle')}</p>
                  <p>{t('mediaDataText1')}</p>
                  <p>{t('mediaDataText2')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold">{t('finalTitle')}</p>
                  <p>{t('finalText1')}</p>
                  <p>{t('finalText2')}</p>
                  <p>{t('finalText3')}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-bold">{t('contactTitle')}</p>
                  <p>sendero bike trails</p>
                  <p>Julian Pérez</p>
                  <p>Pettenkoferstrasse 6</p>
                  <p>10247 Berlin</p>
                  <p>julian@senderobiketrails.com</p>
                  <p>+49 176 31470193</p>
                  <p>senderobiketrails.com</p>
                </div>

                <p>{t('lastUpdated')}</p>

              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
