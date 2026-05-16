'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [posterMounted, setPosterMounted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onStateChange = () => {
      if (video.readyState >= 3) {
        setIsVideoReady(true);
        video.play().catch(() => {});
      }
    };

    onStateChange(); // immediate check — handles memory-cached case (e.g. language switch)
    video.addEventListener('readystatechange', onStateChange);

    // Resume play when the hero scrolls back into view after being scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.paused) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener('readystatechange', onStateChange);
      observer.disconnect();
    };
  }, []);

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
      {posterMounted && (
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
      )}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => {
          setIsVideoReady(true);
          videoRef.current?.play().catch(() => {});
        }}
        onPlaying={() => setIsVideoReady(true)}
        onError={() => setHasError(true)}
        onTransitionEnd={() => {
          if (isVideoReady) setPosterMounted(false);
        }}
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
