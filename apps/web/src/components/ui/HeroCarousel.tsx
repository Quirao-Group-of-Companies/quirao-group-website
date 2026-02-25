'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  } | null;
}

interface Props {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {slide.image && (
            <Image
              src={slide.image.url}
              alt={slide.image.alternativeText || slide.title}
              fill
              className="object-cover"
              priority
            />
          )}

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {slide.title}
            </h1>
            <p className="text-white text-lg md:text-xl mb-6 max-w-2xl">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}