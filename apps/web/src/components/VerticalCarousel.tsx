'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const IMAGES = [
  { id: 1, src: '/images/home-page/blogs/blog1.jpg', alt: 'Dish 1' },
  { id: 2, src: '/images/home-page/blogs/blog2.jpg', alt: 'Dish 2' },
  { id: 3, src: '/images/home-page/blogs/blog3.jpg', alt: 'Dish 3' },
  { id: 4, src: '/images/home-page/blogs/blog4.jpg', alt: 'Dish 4' },
];

export default function VerticalCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={IMAGES[index].id}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={IMAGES[index].src}
            alt={IMAGES[index].alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Vertical Indicator Dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        {IMAGES.map((_, i) => (
          <button
            type="button"
            key={IMAGES[i].id}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === i ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
