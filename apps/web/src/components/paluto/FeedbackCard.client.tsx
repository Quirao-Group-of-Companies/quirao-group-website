'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import type { StrapiFeedback } from 'cms/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FeedbackCardProps {
  item: StrapiFeedback;
  index: number;
}

export default function FeedbackCard({ item, index }: FeedbackCardProps) {
  /**
   * Normalizes URLs to prevent double slashes after the domain.
   */
  const normalizeUrl = (url: string) => {
    if (!url) {
      return '';
    }
    // Handle the case where Strapi or Supabase might return a double slash after the origin
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="card card-side bg-base-100 shadow-lg rounded-[1.5rem] border border-base-300 overflow-hidden"
    >
      <figure className="w-1/3 relative h-full min-h-[140px]">
        {item.image?.url && (
          <Image
            src={normalizeUrl(item.image.url)}
            alt={item.text?.title || 'Reviewer'}
            fill
            className="object-cover"
          />
        )}
      </figure>
      <div className="card-body w-2/3 p-5 md:p-6 justify-center bg-qgc-gray-soft">
        <h3 className="card-title text-black font-bold uppercase text-base">{item.text?.title}</h3>
        {/* Rating using Heroicons scaled down */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={`${item.id}-star-${i}`}
              className={`w-4 h-4 ${(item.stars ?? 0) > i ? 'text-paluto-red' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-xs md:text-sm text-black italic mt-1.5 leading-snug">
          "{item.text?.description}"
        </p>
      </div>
    </motion.div>
  );
}
