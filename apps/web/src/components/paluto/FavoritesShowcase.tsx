'use client';

import type { StrapiCards, StrapiLogo } from '@cms/types/strapi-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useLogger } from '@/lib/axiom/client';

interface FavoritesShowcaseProps {
  data?: StrapiCards[] | null;
  logo?: StrapiLogo | null;
}

export default function FavoritesShowcase({ data, logo }: FavoritesShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const logger = useLogger();

  const items = data ?? [];

  if (items.length === 0) {
    return null;
  }

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    logger.info('Paluto dish swapped', { dish: items[idx].title });
  };

  /**
   * Normalizes URLs to prevent double slashes after the domain.
   */
  const normalizeUrl = (url: string) => {
    if (!url) {
      return '';
    }
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  const getPosition = (index: number) => {
    const total = items.length;
    const diff = (index - activeIdx + total) % total;

    if (diff === 0) {
      return { x: 0, y: 0, opacity: 1, scale: 1, zIndex: 20 };
    }
    if (total === 1) {
      return { opacity: 0, scale: 0.5 };
    }
    if (total === 2) {
      return { x: 120, y: -350, opacity: 0, scale: 0.7, zIndex: 10 };
    }
    switch (diff) {
      case 1:
        return { x: 120, y: -350, opacity: 0, scale: 0.7, zIndex: 10 };
      case total - 1:
        return { x: 120, y: 350, opacity: 0, scale: 0.7, zIndex: 10 };
      default:
        return { x: 350, y: 0, opacity: 0, scale: 0.4, zIndex: 0 };
    }
  };

  return (
    <section className="relative w-full min-h-[600px] flex flex-col items-center overflow-hidden bg-white py-12">
      {/* CMS Driven Logo Header */}
      <div className="w-full max-w-xl px-4 mb-12 z-30">
        {logo?.image?.url ? (
          <Image
            src={normalizeUrl(logo.image.url)}
            alt={logo.logoName || 'Unli-Paluto Favorites'}
            width={640}
            height={320}
            className="object-contain mx-auto"
          />
        ) : (
          <Image
            src="/images/logo/paluto/word-mark-logo.png"
            alt="Unli-Paluto Favorites"
            width={640}
            height={320}
            className="object-contain mx-auto"
          />
        )}
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-8 md:px-16 flex-1">
        {/* Swapping Stage (Top on Mobile) */}
        <div className="order-1 md:order-2 relative h-[500px] md:h-[600px] flex flex-col justify-center items-center overflow-visible">
          <div className="relative w-full h-full flex justify-center items-center">
            {items.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={false}
                animate={getPosition(index)}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                className="absolute w-[280px] h-[280px] md:w-[550px] md:h-[550px]"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] border-[10px] border-white">
                  {dish.image?.url && (
                    <Image
                      src={normalizeUrl(dish.image.url)}
                      alt={dish.title || 'Paluto Dish'}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots - Matching Events Carousel Style */}
          {items.length > 1 && (
            <div className="bg-paluto-red/40 px-4 py-2.5 rounded-full flex items-center gap-2.5 mt-8 md:mt-20 z-50 border border-white/20">
              {items.map((dish, index) => (
                <button
                  key={`indicator-${dish.id}`}
                  type="button"
                  onClick={() => handleSelect(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIdx === index
                      ? 'w-6 bg-white shadow-sm'
                      : 'w-1.5 bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Buttons (Bottom on Mobile) */}
        <div className="order-2 md:order-1 flex flex-col gap-4 z-40">
          {items.map((dish, index) => (
            <button
              type="button"
              key={dish.id}
              onClick={() => handleSelect(index)}
              className={`w-full md:w-72 py-3 px-6 rounded-full font-poppins font-bold text-left uppercase tracking-wider transition-all duration-300 shadow-md ${
                activeIdx === index
                  ? 'bg-paluto-red text-white shadow-lg translate-x-0 md:translate-x-4'
                  : 'bg-qgc-black text-white hover:bg-zinc-800'
              }`}
            >
              <span className="text-base md:text-lg">{dish.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-paluto-red/10 -z-10 hidden md:block" />
    </section>
  );
}
