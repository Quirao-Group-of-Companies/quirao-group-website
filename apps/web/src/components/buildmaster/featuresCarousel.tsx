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

const GAP_PX = 16;

function getCardPx() {
  if (typeof window === 'undefined') return 300;
  const vw = window.innerWidth;
  if (vw < 640) return Math.round(vw * 0.78);
  if (vw < 1024) return Math.round(vw * 0.65);
  return 500;
}

export default function FeaturesCarousel({
  features,
  interval = 3500,
  ctaHref,
}: FeaturesCarouselProps) {
  if (!features || features.length === 0) return null;

  const n = features.length;
  const extended = [features[n - 1], ...features, features[0]];

  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(1);
  const isBusy = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardPxRef = useRef(300); // starts safe, updated on mount

  const [dotIndex, setDotIndex] = useState(0);
  const [, forceRender] = useState(0);

  const getX = (i: number) => {
    if (typeof window === 'undefined') return 0;
    return window.innerWidth / 2 - cardPxRef.current / 2 - i * (cardPxRef.current + GAP_PX);
  };

  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = 'none';
    track.style.transform = `translateX(${getX(i)}px)`;
    indexRef.current = i;
  };

  const slideTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)';
    track.style.transform = `translateX(${getX(i)}px)`;
    indexRef.current = i;

    const handleEnd = () => {
      track.removeEventListener('transitionend', handleEnd);
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
    // Set correct card size immediately on mount
    cardPxRef.current = getCardPx();
    forceRender(v => v + 1); // re-render cards with correct width
    jumpTo(1);
    startTimer();

    const onResize = () => {
      cardPxRef.current = getCardPx();
      forceRender(v => v + 1);
      jumpTo(indexRef.current);
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardPx = cardPxRef.current;

  return (
    <section className="pt-14 pb-10 bg-white">
      <motion.div
        className="flex flex-col items-center text-center mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
          OUR <span style={{ color: '#0a285a' }}>FEATURES</span>
        </h2>
        <div className="w-20 h-1 bg-bm-vivid-blue mt-2" />
      </motion.div>

      {/* Carousel */}
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${GAP_PX}px` }}
        >
          {extended.map((feat, i) => (
            <CarouselCard
              key={`${feat.id}-${i}`}
              feat={feat}
              extIndex={i}
              indexRef={indexRef}
              cardPx={cardPx}
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

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6 mb-8">
        {features.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { goTo(i); startTimer(); }}
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
        className="mx-4 md:mx-auto md:max-w-4xl bg-gradient-to-r from-[#0d1b3e] to-[#1a4a8a] rounded-[2rem] p-5 md:p-8 flex flex-col sm:flex-row items-center justify-between shadow-md gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="text-lg md:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-sm text-center sm:text-left">
          Explore More About BuildMaster
        </span>
        {ctaHref && (
          <motion.a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 bg-white text-[#0d1b3e] px-6 py-3 rounded-2xl shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="font-bold uppercase text-md whitespace-nowrap">Visit Us</span>
            <ArrowRightIcon className="w-4 h-4" />
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}

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
      animate={{ scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#1a3a6e] to-[#2563eb]"
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
          className="mt-5 text-base md:text-[20px] text-[#333] leading-relaxed text-center px-4 select-none"
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