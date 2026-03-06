'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const n = features.length;
  const CARD_PX = 500;
  const GAP_PX = 16;

  // Extended list: [clone-last, ...real, clone-first]
  const extended = [features[n - 1], ...features, features[0]];

  // trackRef holds the DOM element we translate directly — no React state for position
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(1); // current position in extended array
  const isBusy = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Only used for dot highlighting — updated after each slide settles
  const [dotIndex, setDotIndex] = useState(0);

  const getX = (i: number) => {
    // Use window.innerWidth for vw calculation
    if (typeof window === 'undefined') return 0;
    return window.innerWidth / 2 - CARD_PX / 2 - i * (CARD_PX + GAP_PX);
  };

  // Instantly move track to position (no transition)
  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = 'none';
    track.style.transform = `translateX(${getX(i)}px)`;
    indexRef.current = i;
  };

  // Smoothly slide track to position
  const slideTo = (i: number, onDone?: () => void) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)';
    track.style.transform = `translateX(${getX(i)}px)`;
    indexRef.current = i;

    // After transition ends, handle clone teleport + re-enable
    const handleEnd = () => {
      track.removeEventListener('transitionend', handleEnd);

      // Teleport from clone to real twin — purely CSS, zero flash
      if (i === 0) {
        jumpTo(n);
        setDotIndex(n - 1);
      } else if (i === n + 1) {
        jumpTo(1);
        setDotIndex(0);
      } else {
        setDotIndex(i - 1);
      }

      isBusy.current = false;
      onDone?.();
    };
    track.addEventListener('transitionend', handleEnd);
  };

  const navigate = (dir: 1 | -1) => {
    if (isBusy.current) return;
    isBusy.current = true;
    slideTo(indexRef.current + dir);
  };

  const goTo = (realIdx: number) => {
    if (isBusy.current) return;
    isBusy.current = true;
    slideTo(realIdx + 1);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isBusy.current) {
        isBusy.current = true;
        slideTo(indexRef.current + 1);
      }
    }, interval);
  };

  useEffect(() => {
    // Set initial position without animation
    jumpTo(1);
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Update card scale/opacity via CSS classes — no re-render needed
  // We use data-index attribute on each card and update via direct DOM style
  useEffect(() => {
    // intentionally empty — scale/opacity handled by Framer motion on each card
  }, []);

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

      {/* ── Infinite Peek Carousel ── */}
      <div className="w-full overflow-hidden">
        <div ref={trackRef} className="flex will-change-transform" style={{ gap: `${GAP_PX}px` }}>
          {extended.map((feat, i) => (
            <CarouselCard
              key={`${feat.id}-${i}`}
              feat={feat}
              extIndex={i}
              indexRef={indexRef}
              cardPx={CARD_PX}
              onClick={() => {
                if (i !== indexRef.current) {
                  navigate(i < indexRef.current ? -1 : 1);
                  startTimer();
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6 mb-8">
        {features.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              goTo(i);
              startTimer();
            }}
            animate={{
              width: i === dotIndex ? 20 : 8,
              backgroundColor: i === dotIndex ? '#555555' : '#D1D5DB',
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
        <span className="text-base md:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-sm">
          Explore More About BuildMaster
        </span>
        <motion.a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 bg-white text-[#0d1b3e] px-8 py-3 rounded-2xl shadow-sm flex items-center gap-2"
        >
          <span className="font-bold uppercase text-md md:text-md whitespace-nowrap">Visit Us</span>
          <ArrowRightIcon className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}

// ── Separate card component so it can poll indexRef for active state ──
function CarouselCard({
  feat,
  extIndex,
  indexRef,
  cardPx,
  onClick,
}: {
  feat: { id: number; image: string; description: string };
  extIndex: number;
  indexRef: React.MutableRefObject<number>;
  cardPx: number;
  onClick: () => void;
}) {
  const [isActive, setIsActive] = useState(extIndex === 1);

  // Poll every 100ms to sync active state with indexRef
  useEffect(() => {
    const id = setInterval(() => {
      setIsActive(indexRef.current === extIndex);
    }, 100);
    return () => clearInterval(id);
  }, [extIndex, indexRef]);

  return (
    <motion.div
      className="flex-none cursor-pointer"
      style={{ width: `${cardPx}px` }}
      animate={{
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
    >
      <div
        className="relative w-full max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#1a3a6e] to-[#2563eb]"
        style={{ aspectRatio: '4/3' }}
      >
        <Image
          src={feat.image}
          alt={`Feature ${feat.id}`}
          fill
          className="object-cover"
          onError={() => {}}
        />
      </div>

      {isActive && (
        <motion.p
          className="mt-5 text-[20px] text-[#333] leading-relaxed text-center px-4 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {feat.description}
        </motion.p>
      )}
    </motion.div>
  );
}
