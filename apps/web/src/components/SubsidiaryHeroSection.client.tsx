'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SubsidiaryHeroSectionProps {
  slides: string[];
  logoSrc: string;
  brandName?: string;
  tagline?: string;
  logoSize?: {
    width?: string | number;
    height?: string | number;
  };
  logoPosition?: {
    top?: string | number;
    left?: string | number;
  };
  mobileLogoSize?: {
    width?: string | number;
    height?: string | number;
  };
  mobileLogoPosition?: {
    top?: string | number;
    left?: string | number;
  };
  contentPosition?: {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
  };
  mobileContentPosition?: {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
  };
  interval?: number;
  overlayColor?: string; // Tailwind class like "bg-black/40"
  brandNameTextColor?: string; // Tailwind class like "text-[#ff6600]"
  logoClassName?: string; // Extra classes for logo like "brightness-0 invert"
  paddingTop?: string | number;
  mobilePaddingTop?: string | number;
  imageObjectPosition?: 'object-top' | 'object-center' | 'object-bottom' | 'object-left' | 'object-right';
}

export default function SubsidiaryHeroSection({
  slides,
  logoSrc,
  brandName,
  tagline,
  logoSize,
  logoPosition,
  mobileLogoSize,
  mobileLogoPosition,
  contentPosition,
  mobileContentPosition,
  interval = 4500,
  overlayColor = 'bg-black/40',
  brandNameTextColor = 'text-black',
  logoClassName = '',
  paddingTop,
  mobilePaddingTop,
  imageObjectPosition = 'object-center',
}: SubsidiaryHeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!slides || slides.length <= 1) {
      return;
    }
    const id = setInterval(() => setCurrent((s) => (s + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides, interval]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const isMultiple = slides.length > 1;

  const formatValue = (val: string | number | undefined, defaultValue: string) => {
    if (val === undefined) return defaultValue;
    if (typeof val === 'number') return `${val}px`;
    return val;
  };

  // Default logo sizes if not provided
  const dWidth = '250px';
  const dHeight = '250px';
  const dmWidth = '200px';
  const dmHeight = '200px';

  // Default logo positions if not provided
  const dTop = '5rem';
  const dLeft = '4rem';
  const dmTop = '7.5rem';
  const dmLeft = '2rem';

  // Content Position Defaults
  const dContentBottom = '3rem';
  const dContentLeft = '4rem';
  const dmContentBottom = '4rem';
  const dmContentLeft = '2rem';

  return (
    <section className="relative w-full h-screen max-h-screen flex flex-col justify-end overflow-hidden bg-gray-900">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            paddingTop: isMobile 
              ? formatValue(mobilePaddingTop ?? paddingTop, '0px')
              : formatValue(paddingTop, '0px'),
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[current]}
              alt={`Hero slide ${current + 1}`}
              fill
              className={`object-cover ${imageObjectPosition}`}
              priority={current === 0}
              onError={() => {}}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className={`absolute inset-0 z-10 ${overlayColor}`} />

      {/* Bottom gradient for text readability */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: '45%',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
        }}
      />

      {/* Logo Container */}
      {logoSrc && (
        <motion.div
          className="absolute z-30 flex items-start justify-start"
          style={{
            top: formatValue(logoPosition?.top, dTop),
            left: formatValue(logoPosition?.left, dLeft),
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Desktop Logo */}
          <div
            className="hidden md:block relative"
            style={{
              width: formatValue(logoSize?.width, dWidth),
              height: formatValue(logoSize?.height, dHeight),
            }}
          >
            <Image
              src={logoSrc}
              alt={`${brandName || 'Brand'} Logo`}
              fill
              className={`object-contain object-left ${logoClassName}`}
              onError={() => {}}
            />
          </div>

          {/* Mobile Logo with absolute adjustment relative to desktop position */}
          <div
            className="md:hidden absolute"
            style={{
              top: mobileLogoPosition?.top 
                ? `calc(${formatValue(mobileLogoPosition.top, dmTop)} - ${formatValue(logoPosition?.top, dTop)})` 
                : `calc(${dmTop} - ${formatValue(logoPosition?.top, dTop)})`,
              left: mobileLogoPosition?.left 
                ? `calc(${formatValue(mobileLogoPosition.left, dmLeft)} - ${formatValue(logoPosition?.left, dLeft)})` 
                : `calc(${dmLeft} - ${formatValue(logoPosition?.left, dLeft)})`,
              width: formatValue(mobileLogoSize?.width, dmWidth),
              height: formatValue(mobileLogoSize?.height, dmHeight),
            }}
          >
            <Image
              src={logoSrc}
              alt={`${brandName || 'Brand'} Logo Mobile`}
              fill
              className={`object-contain object-left ${logoClassName}`}
              onError={() => {}}
            />
          </div>
        </motion.div>
      )}

      {/* Brand Info */}
      {(brandName || tagline) && (
        <motion.div
          className="absolute z-30 flex flex-col gap-3"
          style={{
            top: contentPosition?.top ? formatValue(contentPosition.top, '') : undefined,
            bottom: contentPosition?.bottom ? formatValue(contentPosition.bottom, '') : (!contentPosition?.top ? dContentBottom : undefined),
            left: contentPosition?.left ? formatValue(contentPosition.left, '') : dContentLeft,
            right: contentPosition?.right ? formatValue(contentPosition.right, '') : undefined,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Mobile adjustments using a nested div for responsive override if needed, 
              or we can use CSS classes. To keep it consistent with logo, we'll use a wrapper approach or 
              standard responsive classes if positioning allows. 
              Actually, let's use a cleaner approach with CSS variables or just standard responsive classes
              for the most common use case (bottom-left). For custom positions, the style prop is used. */}
          <div className="md:hidden absolute whitespace-nowrap"
               style={{
                 top: mobileContentPosition?.top ? `calc(${formatValue(mobileContentPosition.top, '')} - ${formatValue(contentPosition?.top || 0, '0px')})` : 'auto',
                 bottom: mobileContentPosition?.bottom ? `calc(${formatValue(mobileContentPosition.bottom, '')} - ${formatValue(contentPosition?.bottom || dContentBottom, dContentBottom)})` : '0',
                 left: mobileContentPosition?.left ? `calc(${formatValue(mobileContentPosition.left, '')} - ${formatValue(contentPosition?.left || dContentLeft, dContentLeft)})` : '0',
                 right: mobileContentPosition?.right ? `calc(${formatValue(mobileContentPosition.right, '')} - ${formatValue(contentPosition?.right || 0, '0px')})` : 'auto',
               }}
          />
          
          {brandName && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 md:px-10 py-1.5 w-fit shadow-2xl border border-white/50">
              <h1 className={`${brandNameTextColor} text-xl md:text-3xl font-bold font-poppins uppercase tracking-tighter leading-none`}>
                {brandName}
              </h1>
            </div>
          )}
          {tagline && (
            <div className="max-w-3xl">
              <p className="text-white text-lg md:text-3xl font-bold drop-shadow-xl font-poppins">
                {tagline}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Pagination Indicators - only show if multiple slides */}
      {isMultiple && (
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={`${slide}-${i}`}
              type="button"
              onClick={() => setCurrent(i)}
              className="group relative h-2 p-0 focus:outline-hidden"
              aria-label={`Go to slide ${i + 1}`}
            >
              <motion.div
                animate={{
                  width: i === current ? 24 : 8,
                  backgroundColor: i === current ? '#ffffff' : 'rgba(255,255,255,0.4)',
                }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-full"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
