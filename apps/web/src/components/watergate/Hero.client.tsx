'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface WatergateHeroProps {
  slides: string[];
  interval?: number;
  logoSrc: string;
  brandName: string;
  tagline: string;
}

export default function WatergateHero({
  slides,
  interval = 4500,
  logoSrc,
  brandName,
  tagline,
}: WatergateHeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const id = setInterval(() => setCurrent((s) => (s + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides, interval]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative w-full h-screen sm:h-[50vw] min-h-[320px] max-h-screen overflow-hidden bg-[#20305f]">
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
            alt={`Watergate hero ${current + 1}`}
            fill
            className="object-cover object-center"
            priority={current === 0}
            onError={() => {}}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 bg-[#20305f]/30" />

      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(to top, rgba(32,48,95,0.85) 0%, rgba(32,48,95,0.2) 60%, transparent 100%)',
        }}
      />

      {/* Logo — large, top-left, matching Figma */}
      {logoSrc && (
        <motion.div
          className="absolute top-25 sm:top-30 left-2 sm:left-2 z-30"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="relative w-70 h-70 sm:w-100 sm:h-40">
            <Image
              src={logoSrc}
              alt="Watergate logo"
              width={600}
              height={600}
              className="w-full h-full object-contain object-left"
              onError={() => {}}
            />
          </div>
        </motion.div>
      )}

      {/* Brand pill + tagline */}
      <motion.div
        className="absolute bottom-8 left-10 sm:left-13 z-30 flex flex-col gap-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        {brandName && (
          <div className="bg-white rounded-4xl pt-2 px-4 sm:px-6 py-1 w-fit shadow-xl">
            <span className="text-[#20305f] font-black text-base sm:text-2xl uppercase tracking-wide leading-none">
              {brandName}
            </span>
          </div>
        )}
        {tagline && (
          <p className="text-white font-semibold text-base sm:text-2xl drop-shadow-lg pl-1">{tagline}</p>
        )}
      </motion.div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 flex gap-2">
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
      )}
    </section>
  );
}