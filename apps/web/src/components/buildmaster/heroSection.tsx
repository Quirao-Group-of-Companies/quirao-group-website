'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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

  /* Auto-advance */
  useEffect(() => {
    const id = setInterval(
      () => setCurrent((s) => (s + 1) % slides.length),
      interval
    );
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <section className="relative w-full h-[calc(100vh-64px)] min-h-[500px] overflow-hidden bg-[#0d1b3e]">

      {/* ── Slide images (cross-fade via AnimatePresence) ── */}
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

      {/* ── Blue tint overlay ── */}
      <div className="absolute inset-0 z-10 bg-[#0d1b3e]/50" />

      {/* ── Bottom-to-top black gradient ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: '45%',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
        }}
      />

      {/* ── TOP-LEFT: Logo ── */}
      <motion.div
        className="absolute top-5 left-5 z-30"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg">
          <Image
            src={logoSrc}
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
            onError={() => {}}
          />
        </div>
      </motion.div>

      {/* ── BOTTOM-LEFT: Brand pill + tagline ── */}
      <motion.div
        className="absolute bottom-8 left-6 z-30 flex flex-col gap-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="bg-white rounded-lg px-4 py-2 w-fit shadow-xl">
          <span className="text-[#0d1b3e] font-black text-[15px] uppercase tracking-wide leading-none">
            {brandName}
          </span>
        </div>
        <p className="text-white font-semibold text-[15px] drop-shadow-lg pl-1">
          {tagline}
        </p>
      </motion.div>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <motion.button
            key={i}
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