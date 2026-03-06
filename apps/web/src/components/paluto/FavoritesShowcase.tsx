'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useLogger } from '@/lib/axiom/client';
import type { CardItem, LogoComponent } from '@/types/strapi-shared';

interface FavoritesShowcaseProps {
  data?: CardItem[];
  logo?: LogoComponent | null;
}

export default function FavoritesShowcase({ data, logo }: FavoritesShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const logger = useLogger();

  if (!data || data.length === 0) {
    return null;
  }

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    logger.info('Paluto dish swapped', { dish: data[idx].title });
  };

  /**
   * Normalizes URLs to prevent double slashes after the domain.
   * e.g., https://domain.com//path -> https://domain.com/path
   */
  const normalizeUrl = (url: string) => {
    if (!url) return '';
    // Handle the case where Strapi or Supabase might return a double slash after the origin
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  const getPosition = (index: number) => {
    const total = data.length;
    const diff = (index - activeIdx + total) % total;

    if (diff === 0) {
      return { x: 0, y: 0, opacity: 1, scale: 1, zIndex: 20 };
    }
    if (total === 1) return { opacity: 0, scale: 0.5 };
    if (total === 2) {
      return { x: 120, y: -350, opacity: 0, scale: 0.7, zIndex: 10 };
    }
    switch (diff) {
      case 0: // Active Center
        return { x: 0, y: 0, opacity: 1, scale: 1, zIndex: 20 };
      case 1: // Off-top (moving out)
        return { x: 150, y: -450, opacity: 0, scale: 0.8, zIndex: 10 };
      case 2: // Hidden Far Right
        return { x: 400, y: 0, opacity: 0, scale: 0.5, zIndex: 0 };
      case 3: // Off-bottom (moving in)
        return { x: 150, y: 450, opacity: 0, scale: 0.8, zIndex: 10 };
      default:
        return { x: 350, y: 0, opacity: 0, scale: 0.4, zIndex: 0 };
    }
  };

  return (
    <section className="relative w-full min-h-[800px] flex flex-col items-center overflow-hidden bg-white py-5">
      {/* Brand Wordmark Header */}
      <div className="w-full max-w-2xl px-4 z-30">
        <Image
          src="/images/logo/paluto/word-mark-logo.png"
          alt="Unli-Paluto Favorites"
          width={800}
          height={400}
          className="object-contain mx-auto"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-8 md:px-16 flex-1">
        {/* Left Side: Buttons */}
        <div className="flex flex-col gap-5 z-40">
          {DISHES.map((dish) => (
            <button
              type="button"
              key={dish.id}
              onClick={() => handleSelect(dish.id)}
              className={`w-full md:w-80 py-4 px-8 rounded-full font-poppins font-bold text-left uppercase tracking-wider transition-all duration-300 shadow-lg ${
                activeIdx === dish.id
                  ? 'bg-paluto-red text-white shadow-xl translate-x-6'
                  : 'bg-qgc-black text-white hover:bg-zinc-800'
              }`}
            >
              {dish.label}
            </button>
          ))}
        </div>

        {/* Right Side: The Circular Swapping Stage */}
        <div className="relative h-[600px] flex justify-center items-center overflow-visible">
          {DISHES.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={false}
              animate={getPosition(index)}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                // Ensure z-index swaps at the right moment
                zIndex: { delay: 0 },
              }}
              className="absolute w-[400px] h-[400px] md:w-[650px] md:h-[650px]"
            >
              <div className="relative w-full h-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]">
                <Image
                  src={dish.src}
                  alt={dish.label}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-paluto-red/10 -z-10 hidden md:block" />
    </section>
  );
}
