'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeroCarouselProps {
  slides: string[];
  interval?: number;
  logoSrc: string;
  brandName: string;
  tagline: string;
}

export default function HeroCarousel({
  slides,
  interval = 4500,
  logoSrc,
  brandName,
  tagline,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  // Hook must be before any early return
  useEffect(() => {
    if (!slides || slides.length === 0) {
      return;
    }
    const id = setInterval(() => setCurrent((s) => (s + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides, interval]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full h-screen sm:h-[50vw] min-h-[320px] max-h-screen overflow-hidden bg-[#0d1b3e]">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Image
            src={slides[current]}
            alt={`Hero slide ${current + 1}`}
            fill
            className="object-cover object-center"
            priority={current === 0}
            onError={() => {}}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 bg-[#0d1b3e]/50" />

      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: '45%',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
        }}
      />

      {logoSrc && (
        <motion.div
          className="absolute top-40 sm:top-10 md:top-20 left-3 sm:left-5 z-30"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Fixed pixel sizes — no clamp, guaranteed visible on all screens */}
          <div className="w-40 h-40 sm:w-28 sm:h-28 md:w-40 md:h-40 relative">
            <Image
              src={logoSrc}
              alt="Logo"
              fill
              sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 160px"
              className="object-contain"
              onError={() => {}}
            />
          </div>
        </motion.div>
      )}

      {(brandName || tagline) && (
        <motion.div
          className="absolute bottom-25 sm:bottom-8 left-8 sm:left-10 z-30 flex flex-col gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {brandName && (
            <div className="bg-white rounded-4xl pt-2 px-4 sm:px-6 py-1 w-fit shadow-xl">
              <span className="text-[#0d1b3e] font-black text-xl sm:text-lg md:text-2xl uppercase tracking-wide leading-none">
                {brandName}
              </span>
            </div>
          )}
          {tagline && (
            <p className="text-white font-semibold text-xl sm:text-lg md:text-2xl drop-shadow-lg pl-1">
              {tagline}
            </p>
          )}
        </motion.div>
      )}

      <div className="absolute bottom-4 sm:bottom-9 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((slide, i) => (
          <motion.button
            key={slide}
            type="button"
            onClick={() => setCurrent(i)}
            animate={{
              width: i === current ? 24 : 8,
              backgroundColor: i === current ? '#ffffff' : 'rgba(255,255,255,0.4)',
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>
    </section>
  );
}
