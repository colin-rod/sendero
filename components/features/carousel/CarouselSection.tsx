'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSectionProps {
  eyebrow: string;
  heading: string;
  description: string;
  images: string[];
}

export function CarouselSection({
  eyebrow,
  heading,
  description,
  images,
}: CarouselSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      if (keyboardEvent.key === 'ArrowLeft') goToPrevious();
      if (keyboardEvent.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (images.length === 0) return null;

  return (
    <Container>
      {/* Text Content */}
      <div className="text-center mb-12">
        {/* Eyebrow */}
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 mb-4">
          {eyebrow}
        </p>

        {/* Heading */}
        <h2 className="text-h2 text-foreground mb-4">{heading}</h2>

        {/* Description */}
        <p className="text-body text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Images */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg bg-gray-100">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`${heading} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white text-foreground transition-all hover:scale-110 shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white text-foreground transition-all hover:scale-110 shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Progress Indicators */}
        {images.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-16 bg-accent-400'
                    : 'w-16 bg-white border border-gray-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
