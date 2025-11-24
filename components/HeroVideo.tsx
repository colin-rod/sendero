'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Show video after a brief delay to ensure poster image is visible first
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (hasError) {
    // Fallback to static image if video fails to load
    return (
      <Image
        src="/hero-coffee-region.jpg"
        alt="Coffee Region landscape"
        fill
        className="object-cover"
        priority
      />
    );
  }

  return (
    <>
      {/* Poster image - shows while video loads */}
      {!isLoaded && (
        <Image
          src="/hero-coffee-region.jpg"
          alt="Coffee Region landscape"
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Video element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/hero-coffee-region.jpg"
        onError={() => setHasError(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/hero-optimized.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
