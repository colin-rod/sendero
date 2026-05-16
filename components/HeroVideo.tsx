'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false);
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

    onStateChange();
    video.addEventListener('readystatechange', onStateChange);

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

  return (
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
      className={`absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-1000 ${
        isVideoReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <source src="/hero.webm" type="video/webm" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
