'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Only enable parallax on desktop (screen width > 768px)
    const isDesktop = window.innerWidth > 768;

    if (!isDesktop) return;

    const handleScroll = () => {
      // Only apply parallax for the first screen height
      if (window.scrollY < window.innerHeight) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect: video moves at 0.5x speed (half the scroll speed)
  const parallaxOffset = scrollY * 0.5;

  if (hasError) {
    // Fallback to static image if video fails to load
    return (
      <Image
        src="/hero-poster.png"
        alt="Coffee Region landscape"
        fill
        className="object-cover"
        priority
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
    );
  }

  return (
    <>
      {/* Poster image - fades out when video is ready */}
      <Image
        src="/hero-poster.png"
        alt="Coffee Region landscape"
        fill
        className={`object-cover transition-opacity duration-1000 ${
          isVideoReady ? 'opacity-0' : 'opacity-100'
        }`}
        priority
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />

      {/* Video element - fades in when ready to play */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.png"
        onCanPlay={() => setIsVideoReady(true)}
        onError={() => setHasError(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}
      >
        <source src="/flying-over-the-andean-mountans_optimized.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
