'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import type { StrapiImage } from '@/types/strapi-shared';
import type { EventsAndCateringItem } from '@/types/paluto-page';

interface EventsCateringProps {
  sectionData?: EventsAndCateringItem;
  carouselImages?: StrapiImage[];
}

export default function EventsCatering({ sectionData, carouselImages }: EventsCateringProps) {
  // Use null-coalescing to ensure we always have an array even if null is passed
  const images = carouselImages ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!sectionData) {
    return null;
  }

  /**
   * Normalizes URLs to prevent double slashes after the domain.
   */
  const normalizeUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <section className="w-full bg-qgc-gray-soft pt-10 pb-20 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto min-h-[450px] md:min-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-white">
        {/* Left Column: Image Carousel */}
        <div className="relative h-[300px] md:h-auto overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait">
            {images.length > 0 ? (
              <motion.div
                key={images[currentIndex].url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={normalizeUrl(images[currentIndex].url)}
                  alt={images[currentIndex].alternativeText || `Catering Slide ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                No images available
              </div>
            )}
          </AnimatePresence>

          {/* Navigation Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10 bg-paluto-red/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20">
              {images.map((img, index) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentIndex === index 
                      ? 'w-6 bg-white shadow-sm' 
                      : 'w-1.5 bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Content & Branding */}
        <div className="p-6 md:p-12 flex flex-col justify-center items-start space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] uppercase font-poppins tracking-tight">
              {sectionData.title}
            </h2>
            <div className="space-y-3 max-w-lg">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed font-poppins">
                {sectionData.text}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          {sectionData.cta && (
            <motion.a
              href={sectionData.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#FF5F05] to-[#D71920] text-white py-4 px-8 rounded-xl flex items-center justify-between font-bold text-lg uppercase tracking-wider shadow-lg group"
            >
              <span>{sectionData.cta.title}</span>
              <FiExternalLink className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}
