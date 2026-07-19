import { Container } from '@/components/ui/Container';

interface Category {
  title: string;
  items: string[];
}

interface MtbReisenInclusionsProps {
  includedHeading: string;
  notIncludedHeading: string;
  categories: Category[];
  notIncludedItems: string[];
}

export function MtbReisenInclusions({
  includedHeading,
  notIncludedHeading,
  categories,
  notIncludedItems,
}: MtbReisenInclusionsProps) {
  const midpoint = Math.ceil(notIncludedItems.length / 2);
  const notIncludedColumns = [
    notIncludedItems.slice(0, midpoint),
    notIncludedItems.slice(midpoint),
  ];

  return (
    <section id="included" className="bg-gray-950 py-20 md:py-28">
      <Container size="lg" className="flex flex-col gap-16">
        <div>
          <h2 className="text-h2 text-white mb-10">{includedHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {categories.map((category) => (
              <div key={category.title}>
                <p className="text-body-em text-accent-400 mb-4">{category.title}</p>
                <ul className="list-disc list-inside space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="text-body text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-h2 text-white mb-10">{notIncludedHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            {notIncludedColumns.map((column, index) => (
              <ul key={index} className="list-disc list-inside space-y-2">
                {column.map((item) => (
                  <li key={item} className="text-body text-white">
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
