'use client';

import type { StrapiCards, StrapiLogo } from 'cms/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useLogger } from '@/lib/axiom/client';

export type ShowcaseItem = {
  id: string | number;
  title: string;
  image: string;
};

interface FavoritesShowcaseProps {
  /** Normalized items array */
  items?: ShowcaseItem[];
  /** Paluto style data (StrapiCards) */
  data?: StrapiCards[] | null;
  /** Manokan style data (Legacy) */
  dishes?: { id: number; label: string; src: string }[];

  /** Logo can be StrapiLogo or a custom object */
  logo?: StrapiLogo | null | { src: string; alt: string };

  /** Theme and UI Toggles */
  activeColorClass?: string;
  indicatorColorClass?: string;
  showCircle?: boolean;
  imageClassName?: string;
  dividerColorClass?: string;
  buttonWidthClass?: string;
}

export default function FavoritesShowcase({
  items: directItems,
  data,
  dishes,
  logo,
  activeColorClass = 'bg-paluto-red',
  indicatorColorClass = 'bg-paluto-red/40',
  showCircle = false,
  imageClassName = 'object-contain',
  dividerColorClass = 'bg-paluto-red/10',
  buttonWidthClass = 'md:w-72',
}: FavoritesShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const logger = useLogger();

  /**
   * Normalizes URLs to prevent double slashes after the domain.
   */
  const normalizeUrl = (url: string) => {
    if (!url) {
      return '';
    }
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  /**
   * Consolidate data from multiple possible props.
   */
  const normalizedItems = useMemo((): ShowcaseItem[] => {
    if (directItems) return directItems;
    if (data) {
      return data.map((item) => ({
        id: item.id,
        title: item.title || '',
        image: normalizeUrl(item.image?.url || ''),
      }));
    }
    if (dishes) {
      return dishes.map((dish) => ({
        id: dish.id,
        title: dish.label,
        image: dish.src,
      }));
    }
    return [];
  }, [directItems, data, dishes]);

  const logoData = useMemo(() => {
    if (!logo) return null;
    if ('src' in logo) return logo;
    return {
      src: normalizeUrl(logo.image?.url || ''),
      alt: logo.logoName || 'Showcase Logo',
    };
  }, [logo]);

  if (normalizedItems.length === 0) {
    return null;
  }

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    logger.info('Favorites dish swapped', { dish: normalizedItems[idx].title });
  };

  const getPosition = (index: number) => {
    const total = normalizedItems.length;
    const diff = (index - activeIdx + total) % total;

    if (diff === 0) {
      return { x: 0, y: 0, opacity: 1, scale: 1, zIndex: 20 };
    }
    if (total === 1) {
      return { opacity: 0, scale: 0.5 };
    }

    // Paluto style positioning for 2 items or more
    const xOffset = 120;
    const yOffset = 350;

    if (total === 2) {
      return { x: xOffset, y: -yOffset, opacity: 0, scale: 0.7, zIndex: 10 };
    }

    switch (diff) {
      case 1:
        return { x: xOffset, y: -yOffset, opacity: 0, scale: 0.7, zIndex: 10 };
      case total - 1:
        return { x: xOffset, y: yOffset, opacity: 0, scale: 0.7, zIndex: 10 };
      default:
        return { x: 350, y: 0, opacity: 0, scale: 0.4, zIndex: 0 };
    }
  };

  return (
    <section className="relative w-full min-h-150 flex flex-col items-center overflow-hidden bg-white py-12">
      {/* Brand Logo Header */}
      <div className="w-full max-w-xl px-4 mb-12 z-30">
        {logoData?.src && (
          <Image
            src={logoData.src}
            alt={logoData.alt}
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
            {normalizedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={false}
                animate={getPosition(index)}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  zIndex: { delay: 0 },
                }}
                className="absolute w-[280px] h-[280px] md:w-[550px] md:h-[550px]"
              >
                {showCircle ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] border-[10px] border-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      priority={index === activeIdx}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={imageClassName}
                      priority={index === activeIdx}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          {normalizedItems.length > 1 && (
            <div
              className={`${indicatorColorClass} px-4 py-2.5 rounded-full flex items-center gap-2.5 mt-8 md:mt-20 z-30 border border-white/20`}
            >
              {normalizedItems.map((item, index) => (
                <button
                  key={`indicator-${item.id}`}
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
          {normalizedItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleSelect(index)}
              className={`w-full ${buttonWidthClass} py-3 px-6 rounded-full font-poppins font-bold text-left uppercase tracking-wider transition-all duration-300 shadow-md ${
                activeIdx === index
                  ? `${activeColorClass} text-white shadow-lg translate-x-0 md:translate-x-4`
                  : 'bg-qgc-black text-white hover:bg-zinc-800'
              }`}
            >
              <span className="text-base md:text-lg">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Decorative Vertical Divider */}
      <div
        className={`absolute left-1/2 top-0 w-[1px] h-full ${dividerColorClass} -z-10 hidden md:block`}
      />
    </section>
  );
}
