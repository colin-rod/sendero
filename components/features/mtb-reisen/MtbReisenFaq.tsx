import { Container } from '@/components/ui/Container';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { Link } from '@/lib/i18n/routing';

interface FaqGroup {
  title: string;
  questions: { question: string; answer: string }[];
}

interface MtbReisenFaqProps {
  id: string;
  heading: string;
  groups: FaqGroup[];
  ctaQuestion: string;
  ctaLink: string;
}

export function MtbReisenFaq({ id, heading, groups, ctaQuestion, ctaLink }: MtbReisenFaqProps) {
  return (
    <section id={id} className="scroll-mt-[180px] bg-background py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <h2 className="text-h2 text-foreground max-w-heading">{heading}</h2>

        {groups.map((group, groupIndex) => (
          <div key={group.title} className="flex flex-col gap-4 max-w-heading">
            <h3 className="text-label text-primary-500 tracking-[0.06em] uppercase">{group.title}</h3>
            <Accordion type="multiple">
              {group.questions.map((qa, index) => (
                <AccordionItem key={qa.question} value={`${groupIndex}-${index}`}>
                  <AccordionTrigger>{qa.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="leading-[26px]">{qa.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <p className="text-base leading-[26px] text-foreground max-w-text">
          {ctaQuestion}{' '}
          <Link href="/anfragen" className="text-primary-500 underline hover:text-river-forest">
            {ctaLink}
          </Link>
        </p>
      </Container>
    </section>
  );
}
