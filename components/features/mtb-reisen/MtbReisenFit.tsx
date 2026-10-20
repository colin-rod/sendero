import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';

interface TextBlock {
  title: string;
  text: string;
}

interface MtbReisenFitProps {
  heading: string;
  blocks: TextBlock[];
  yesHeading: string;
  yesItems: string[];
  noHeading: string;
  noItems: string[];
  cta: string;
}

export function MtbReisenFit({
  heading,
  blocks,
  yesHeading,
  yesItems,
  noHeading,
  noItems,
  cta,
}: MtbReisenFitProps) {
  const lists = [
    { heading: yesHeading, items: yesItems },
    { heading: noHeading, items: noItems },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <h2 className="text-h2 text-foreground max-w-heading">{heading}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {blocks.map((block) => (
            <div key={block.title}>
              <p className="text-body-em text-primary-500 mb-4">{block.title}</p>
              <p className="text-base leading-[26px] text-foreground max-w-text">{block.text}</p>
            </div>
          ))}

          {lists.map((list) => (
            <div key={list.heading}>
              <p className="text-body-em text-foreground mb-4">{list.heading}</p>
              <ul className="list-disc list-inside space-y-2">
                {list.items.map((item) => (
                  <li key={item} className="text-base leading-[26px] text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link href="/anfragen" className="text-body-em text-primary-500 underline hover:text-river-forest">
          {cta}
        </Link>
      </Container>
    </section>
  );
}
