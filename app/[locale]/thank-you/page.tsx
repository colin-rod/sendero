'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Check, Link as LinkIcon, MessageCircle, Facebook } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

export default function ThankYouPage() {
  const t = useTranslations('thankYou');
  const [copied, setCopied] = useState(false);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const shareText = encodeURIComponent(t('shareText'));
  const shareUrl = encodeURIComponent(siteUrl);

  // WhatsApp share link
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;

  // Twitter/X share link
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  // Facebook share link
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              {/* Success Icon */}
              <div className="mb-8 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100">
                  <Check className="h-12 w-12 text-primary-600" strokeWidth={3} />
                </div>
              </div>

              {/* Heading */}
              <h1 className="mb-6 text-h1 text-foreground">
                {t('heading')}
              </h1>

              {/* Message */}
              <p className="mb-8 text-body text-muted-foreground">
                {t('message')}
              </p>

              {/* What's Next Section */}
              <div className="mb-12 rounded-lg border border-border bg-muted/50 p-8 text-left">
                <h2 className="mb-4 text-h2">{t('whatHappensNext.heading')}</h2>
                <ul className="space-y-3 text-body text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-primary-500">•</span>
                    <span>
                      <strong className="text-foreground">
                        {t('whatHappensNext.step1.title')}
                      </strong>{' '}
                      - {t('whatHappensNext.step1.description')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-primary-500">•</span>
                    <span>
                      <strong className="text-foreground">{t('whatHappensNext.step2.title')}</strong> -
                      {t('whatHappensNext.step2.description')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-primary-500">•</span>
                    <span>
                      <strong className="text-foreground">
                        {t('whatHappensNext.step3.title')}
                      </strong>{' '}
                      - {t('whatHappensNext.step3.description')}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Share Section */}
              <div className="mb-12">
                <h2 className="mb-6 text-h2">
                  {t('share.heading')}
                </h2>
                <p className="mb-6 text-body text-muted-foreground">
                  {t('share.description')}
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  {/* Copy Link Button */}
                  <Button
                    variant="outline"
                    onClick={handleCopyLink}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>{t('share.buttons.copied')}</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-4 w-4" />
                        <span>{t('share.buttons.copyLink')}</span>
                      </>
                    )}
                  </Button>

                  {/* WhatsApp Share */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>{t('share.buttons.whatsapp')}</span>
                    </Button>
                  </a>

                  {/* Twitter/X Share */}
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="flex items-center gap-2">
                      <FaXTwitter className="h-4 w-4" />
                      <span>{t('share.buttons.twitter')}</span>
                    </Button>
                  </a>

                  {/* Facebook Share */}
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      <span>{t('share.buttons.facebook')}</span>
                    </Button>
                  </a>
                </div>
              </div>

              {/* Back to Home */}
              <Link href="/">
                <Button variant="primary" size="lg">
                  {t('backToHome')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
