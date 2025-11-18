'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Check, Link as LinkIcon, MessageCircle, Facebook } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

export default function ThankYouPage() {
  const [copied, setCopied] = useState(false);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const shareText = encodeURIComponent(
    'Check out Sendero - beginner-friendly hike & bike tours in Colombia\'s Coffee Region!'
  );
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
              <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
                You're on the List!
              </h1>

              {/* Message */}
              <p className="mb-8 text-lg text-muted-foreground">
                Thank you for joining the Sendero waitlist. We'll be in touch when
                tours open up with exclusive early access for waitlist members.
              </p>

              {/* What's Next Section */}
              <div className="mb-12 rounded-lg border border-border bg-muted/50 p-8 text-left">
                <h2 className="mb-4 text-2xl font-semibold">What happens next?</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-primary-500">•</span>
                    <span>
                      <strong className="text-foreground">
                        Check your inbox
                      </strong>{' '}
                      - You'll receive a confirmation email shortly
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-primary-500">•</span>
                    <span>
                      <strong className="text-foreground">Stay tuned</strong> -
                      We'll keep you updated on tour dates and packages
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-primary-500">•</span>
                    <span>
                      <strong className="text-foreground">
                        Be among the first
                      </strong>{' '}
                      - Waitlist members get priority booking access
                    </span>
                  </li>
                </ul>
              </div>

              {/* Share Section */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-semibold">
                  Share the Adventure
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Know someone who'd love this? Spread the word!
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
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-4 w-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </Button>

                  {/* WhatsApp Share */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp</span>
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
                      <span>Twitter</span>
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
                      <span>Facebook</span>
                    </Button>
                  </a>
                </div>
              </div>

              {/* Back to Home */}
              <Link href="/">
                <Button variant="primary" size="lg">
                  Back to Home
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
