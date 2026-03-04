'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

const CAROUSEL_IMAGES = [
  '/images/paluto/showcase 1.jpg',
  '/images/paluto/showcase 2.jpg',
  '/images/paluto/showcase 3.jpg',
  '/images/paluto/showcase 4.jpg',
  '/images/paluto/paluto-cover-page.jpg',
  '/images/home-page/business-preview/paluto-business-preview.jpg',
];

export default function EventsCatering() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-qgc-gray-soft py-20 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto min-h-[450px] md:min-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-white">
        {/* Left Column: Image Carousel */}
        <div className="relative h-[300px] md:h-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={CAROUSEL_IMAGES[currentIndex]}
                alt={`Catering Slide ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {CAROUSEL_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-6 bg-white shadow-md' : 'w-1.5 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Content & Branding */}
        <div className="p-6 md:p-12 flex flex-col justify-center items-start space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] uppercase font-poppins tracking-tight">
              Events & Catering
            </h2>
            <div className="space-y-3 max-w-lg">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed font-poppins">
                Paluto Seafood & Grill Restaurant offers premium catering services for all types of
                celebrations. Whether it’s a family reunion, a corporate event, or a special wedding
                gathering, we bring the fresh flavors of Iloilo’s best seafood directly to your table.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed font-poppins">
                From our signature mixed seafood boat to live paluto cooking stations, we transform
                any venue into a celebration destination. Let us handle the details while you enjoy
                memorable moments with your guests.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <motion.a
            href="https://www.facebook.com/palutophilippines"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#FF5F05] to-[#D71920] text-white py-4 px-8 rounded-xl flex items-center justify-between font-bold text-lg uppercase tracking-wider shadow-lg group"
          >
            <span>Book Now</span>
            <FiExternalLink className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
