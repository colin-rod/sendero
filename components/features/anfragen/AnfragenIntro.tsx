import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Signature } from './Signature';

interface AnfragenIntroProps {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  photoAlt: string;
}

const PHOTO_SRC = '/images/anfragen/julian-portrait.jpg';

export function AnfragenIntro({ eyebrow, title, paragraphs, photoAlt }: AnfragenIntroProps) {
  return (
    <section className="py-20">
      <Container className="flex flex-wrap items-center gap-12 lg:gap-[72px]">
        <div className="relative aspect-[326/485] w-full max-w-[424px] flex-[1_1_364px] overflow-hidden rounded-[5px] bg-gray-200">
          <Image
            src={PHOTO_SRC}
            alt={photoAlt}
            fill
            sizes="(min-width: 900px) 424px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 max-w-text flex-[999_1_420px]">
          <p className="text-caption font-normal uppercase tracking-[0.16em] text-primary-500">{eyebrow}</p>
          <h1 className="my-5 text-balance text-[clamp(32px,4vw,48px)] font-bold leading-[1.45] text-foreground">
            {title}
          </h1>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-base leading-[26px] text-foreground">
              {paragraph}
            </p>
          ))}
          <Signature />
        </div>
      </Container>
    </section>
  );
}
