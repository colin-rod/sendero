'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  if (hasError) {
    return (
      <Image
        src="/hero-poster.jpg"
        alt="Coffee Region landscape"
        fill
        sizes="100vw"
        quality={75}
        className="object-cover"
        priority
      />
    );
  }

  return (
    <>
      {/* Poster image - shown while video loads, fades out once video is ready */}
      <Image
        src="/hero-poster.jpg"
        alt="Coffee Region landscape"
        fill
        sizes="100vw"
        quality={75}
        className={`object-cover transition-opacity duration-1000 ${
          isVideoReady ? 'opacity-0' : 'opacity-100'
        }`}
        priority
      />

      {/* Video element - mobile uses lightweight 796KB version, desktop uses full 1080p */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        onCanPlay={() => {
          setIsVideoReady(true);
          videoRef.current?.play().catch(() => {});
        }}
        onError={() => setHasError(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source media="(max-width: 767px)" src="/flying-over-the-andean-mountans_mobile.mp4" type="video/mp4" />
        <source src="/flying-over-the-andean-mountans_optimized.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
