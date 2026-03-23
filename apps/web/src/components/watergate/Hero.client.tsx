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
    <section className="relative w-full h-[50vw] min-h-[320px] max-h-screen overflow-hidden bg-[#20305f]">
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

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-[#20305f]/40" />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(to top, rgba(32,48,95,0.85) 0%, rgba(32,48,95,0.2) 60%, transparent 100%)',
        }}
      />

      {/* Logo top-left */}
      {logoSrc && (
        <motion.div
          className="absolute z-30"
          style={{ top: 'clamp(12px, 3vw, 48px)', left: 'clamp(12px, 3vw, 48px)' }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ width: 'clamp(80px, 12vw, 180px)', height: 'clamp(40px, 6vw, 90px)' }} className="relative">
            <Image
              src={logoSrc}
              alt="Watergate logo"
              fill
              className="object-contain object-left"
              onError={() => {}}
            />
          </div>
        </motion.div>
      )}

      {/* Brand pill + tagline bottom-left */}
      <motion.div
        className="absolute z-30 flex flex-col gap-1"
        style={{ bottom: 'clamp(20px, 4vw, 48px)', left: 'clamp(16px, 4vw, 48px)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="bg-white rounded-full px-4 py-1 w-fit shadow-lg">
          <span
            className="text-[#20305f] font-black uppercase tracking-wide leading-none"
            style={{ fontSize: 'clamp(10px, 1.8vw, 18px)' }}
          >
            {brandName}
          </span>
        </div>
        {tagline && (
          <p
            className="text-white font-semibold drop-shadow-lg pl-1"
            style={{ fontSize: 'clamp(11px, 1.8vw, 20px)' }}
          >
            {tagline}
          </p>
        )}
      </motion.div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute z-30 flex gap-2" style={{ bottom: 'clamp(8px, 2vw, 20px)', left: '50%', transform: 'translateX(-50%)' }}>
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