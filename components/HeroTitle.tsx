'use client';

interface Props {
  title: string;
}

export default function HeroTitle({ title }: Props) {
  const parts = title.split('\n');

  return (
    <h1 className="text-h1 text-white max-w-3xl hero-title-animate">
      {parts.length > 1 ? (
        <>
          {parts[0]}
          <br className="hidden md:block" />
          {parts[1]}
        </>
      ) : (
        title
      )}
    </h1>
  );
}
