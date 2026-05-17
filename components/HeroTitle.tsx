'use client';

interface Props {
  title: string;
}

export default function HeroTitle({ title }: Props) {
  return (
    <h1 className="text-h1 text-white max-w-3xl hero-title-animate">
      {title}
    </h1>
  );
}
