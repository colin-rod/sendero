import { Container } from '@/components/ui/Container';

interface MtbReisenInclusionsProps {
  includedHeading: string;
  notIncludedHeading: string;
  includedItems: string[];
  notIncludedItems: string[];
}

export function MtbReisenInclusions({
  includedHeading,
  notIncludedHeading,
  includedItems,
  notIncludedItems,
}: MtbReisenInclusionsProps) {
  const lists = [
    { heading: includedHeading, items: includedItems },
    { heading: notIncludedHeading, items: notIncludedItems },
  ];

  return (
    <section id="included" className="bg-gray-950 py-20 md:py-28">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {lists.map((list) => (
          <div key={list.heading}>
            <h3 className="text-h3 text-white mb-8">{list.heading}</h3>
            <ul className="list-disc list-inside space-y-3 max-w-text">
              {list.items.map((item) => (
                <li key={item} className="text-base leading-[26px] text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </section>
  );
}
