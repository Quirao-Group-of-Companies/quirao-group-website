'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Feature {
  id: number;
  image: string;
  description: string;
}

interface FeaturesCarouselProps {
  features: Feature[];
  interval?: number;
  ctaHref: string;
}

export default function FeaturesCarousel({
  features,
  interval = 3500,
  ctaHref,
}: FeaturesCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  /* Auto-advance */
  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((s) => (s + 1) % features.length);
    }, interval);
    return () => clearInterval(id);
  }, [features.length, interval]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section className="pt-14 pb-10 bg-white">
      {/* Title */}
      <motion.h2
        className="text-center text-[#111] font-semibold text-2xl mb-8 tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Features
      </motion.h2>

      {/* Single-slide carousel */}
      <div className="relative w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col items-center px-6"
            /* Drag to swipe */
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) {
                setDirection(1);
                setCurrent((s) => (s + 1) % features.length);
              } else if (info.offset.x > 60) {
                setDirection(-1);
                setCurrent((s) => (s - 1 + features.length) % features.length);
              }
            }}
          >
            {/* Card image */}
            <div
              className="relative w-full max-w-[700px] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#1a3a6e] to-[#2563eb]"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={features[current].image}
                alt={`Feature ${features[current].id}`}
                fill
                className="object-cover"
                onError={() => {}}
              />
            </div>

            {/* Description */}
            <p className="mt-5 text-[15px] text-[#333] leading-relaxed text-center max-w-lg select-none">
              {features[current].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6 mb-8">
        {features.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            animate={{
              width: i === current ? 20 : 8,
              backgroundColor: i === current ? '#555555' : '#D1D5DB',
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>

      {/* CTA Banner */}
      <motion.div
        className="mx-6 md:mx-auto md:max-w-4xl bg-gradient-to-r from-[#0d1b3e] to-[#1a4a8a] rounded-[2rem] p-6 md:p-8 flex items-center justify-between shadow-md gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="text-base md:text-xl font-bold uppercase tracking-tight text-white drop-shadow-sm">
          Explore More About BuildMaster
        </span>
        <motion.a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 bg-white text-[#0d1b3e] px-5 py-3 rounded-2xl shadow-sm flex items-center gap-2"
        >
          <span className="font-bold uppercase text-xs md:text-sm whitespace-nowrap">Visit Us</span>
          <ArrowRightIcon className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}