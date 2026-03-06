'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { FeedbackItem } from '@/types/strapi-shared';

interface FeedbackProps {
  data?: FeedbackItem[];
}

export default function Feedback({ data }: FeedbackProps) {
  if (!data || data.length === 0) {
    return null;
  }

  /**
   * Normalizes URLs to prevent double slashes after the domain.
   * e.g., https://domain.com//path -> https://domain.com/path
   */
  const normalizeUrl = (url: string) => {
    if (!url) return '';
    // Handle the case where Strapi or Supabase might return a double slash after the origin
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <section className="bg-white py-16 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header scaled down */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
            OUR <span className="text-paluto-red">FEEDBACK</span>
          </h2>
          <div className="w-20 h-1 bg-paluto-yellow mt-2" />
        </div>

        {/* Grid scaled down */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.map((fb, index) => (
            <motion.div
              key={fb.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="card card-side bg-base-100 shadow-lg rounded-[1.5rem] border border-base-300 overflow-hidden"
            >
              <figure className="w-1/3 relative h-full min-h-[140px]">
                {fb.image?.url && (
                  <Image
                    src={normalizeUrl(fb.image.url)}
                    alt={fb.text?.title || 'Reviewer'}
                    fill
                    className="object-cover"
                  />
                )}
              </figure>
              <div className="card-body w-2/3 p-5 md:p-6 justify-center bg-qgc-gray-soft">
                <h3 className="card-title text-black font-bold uppercase text-base">
                  {fb.text?.title}
                </h3>
                {/* Rating using Heroicons scaled down */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={`${fb.id}-star-${i}`}
                      className={`w-4 h-4 ${i < fb.stars ? 'text-paluto-red' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-black italic mt-1.5 leading-snug">
                  "{fb.text?.description}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
