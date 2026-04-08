'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  if (hasError) {
    // Fallback to static image if video fails to load
    return (
      <Image
        src="/hero-poster.png"
        alt="Coffee Region landscape"
        fill
        className="object-cover"
        priority
      />
    );
  }

  return (
    <>
      {/* Poster image - shown while video loads, fades out once video is ready */}
      <Image
        src="/hero-poster.png"
        alt="Coffee Region landscape"
        fill
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
        preload="metadata"
        poster="/hero-poster.png"
        onCanPlay={() => setIsVideoReady(true)}
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
