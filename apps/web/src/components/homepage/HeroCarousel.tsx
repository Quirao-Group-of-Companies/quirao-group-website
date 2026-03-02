'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import type { HeroItem } from '@/types/homepage';

interface Props {
  slides: HeroItem[];
}

export default function HeroCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) {
    return null;
  }

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

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex items-start z-20">
            {/* Background Overlay with Clip Path */}
            <div className="absolute inset-0 bg-white/10 w-full md:w-[95%] h-full [clip-path:polygon(0_0,100%_0,100%_49%,0_80%)] md:[clip-path:polygon(0_0,90%_0,20%_100%,0_100%)]" />

            {/* Content (Unclipped) */}
            <div className="relative w-full h-full flex flex-col justify-start items-center md:items-start pt-28 md:pt-32 px-6 md:px-10 text-left">
              <div className="max-w-xs md:max-w-xl lg:max-w-3xl w-full">
                <h1 className="drop-shadow-2xl text-3xl md:text-2xl lg:text-5xl font-black text-qgc-white mb-4 md:mb-8 leading-[1.1]">
                  {slide.title}
                </h1>
                <p className=" text-qgc-white text-xs md:text-lg mb-8 leading-relaxed w-full md:w-2/3 drop-shadow-lg">
                  {slide.description}
                </p>

                {slide.cta?.title && (
                  <div className="mt-8 md:mt-10 flex">
                    {slide.cta.href ? (
                      <Button
                        href={slide.cta.href}
                        text={slide.cta.title}
                        variant="secondary"
                        target="_blank"
                        className="px-6 py-2 text-xs md:text-lg hover:bg-qgc-gray-deep hover:text-white"
                      />
                    ) : (
                      <Button
                        text={slide.cta.title}
                        variant="primary"
                        className="px-6 py-2 text-xs md:text-lg"
                        disabled
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 bg-qgc-gray-light/20 py-2 px-4 rounded-2xl">
        {slides.map((slide, idx) => (
          <button
            type="button"
            key={slide.id}
            onClick={() => setCurrent(idx)}
            className={`h-3 rounded-full transition-all duration-500 ease-in-out ${idx === current ? 'w-10 bg-white' : 'w-3 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </section>
  );
}
