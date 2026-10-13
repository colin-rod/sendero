'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import HeroVideo from '@/components/HeroVideo';

interface AnfragenHeroProps {
  title: string;
  subtitle: string;
}

// Poster is the video's first frame so the fade-in has no visible jump.
const POSTER_SRC = '/images/anfragen/hero-poster.jpg';
const VIDEO_WEBM_SRC = '/videos/anfragen-hero.webm';
const VIDEO_MP4_SRC = '/videos/anfragen-hero.mp4';

export function AnfragenHero({ title, subtitle }: AnfragenHeroProps) {
  // Poster renders first; the video is only mounted when motion is allowed.
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowMotion(!query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <section className="relative flex min-h-[min(681px,92vh)] flex-col overflow-hidden bg-gray-950 text-white">
      <Image src={POSTER_SRC} alt="" fill priority sizes="100vw" className="object-cover" />
      {allowMotion && <HeroVideo webmSrc={VIDEO_WEBM_SRC} mp4Src={VIDEO_MP4_SRC} />}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative mt-auto w-full max-w-[1200px] px-6 pb-[72px] pt-40 sm:px-10 lg:px-16 xl:px-24">
        <h1 className="hero-title-animate text-[clamp(44px,6vw,64px)] font-bold leading-[1.25] tracking-[-0.02em]">
          {title}
        </h1>
        <p className="mt-5 text-xl leading-[1.6] text-white">{subtitle}</p>
      </div>
    </section>
  );
}
