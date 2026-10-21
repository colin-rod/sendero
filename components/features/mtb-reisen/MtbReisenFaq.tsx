import { Container } from '@/components/ui/Container';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { Link } from '@/lib/i18n/routing';

interface FaqItem {
  question: string;
  paragraphs: string[];
}

interface MtbReisenFaqProps {
  id: string;
  eyebrow: string;
  heading: string;
  items: FaqItem[];
  ctaQuestion: string;
  ctaLink: string;
  /** Link to the standalone /faq page (travel, booking, on site) */
  faqPageLink: string;
}

export function MtbReisenFaq({ id, eyebrow, heading, items, ctaQuestion, ctaLink, faqPageLink }: MtbReisenFaqProps) {
  return (
    <section id={id} className="scroll-mt-[116px] bg-white py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-label text-primary-500 tracking-[0.06em]">{eyebrow}</p>
          <h2 className="text-h2 text-foreground max-w-heading">{heading}</h2>
        </div>

        <Accordion type="multiple" className="max-w-heading">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-[26px]">{paragraph}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex flex-col gap-2 text-base leading-[26px] text-foreground max-w-text">
          <p>
            {ctaQuestion}{' '}
            <Link href="/anfragen" className="text-primary-500 underline hover:text-river-forest">
              {ctaLink}
            </Link>
          </p>
          <p>
            <Link href="/faq" className="text-primary-500 underline hover:text-river-forest">
              {faqPageLink}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
