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
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-5xl font-black uppercase italic text-black tracking-tighter">
            OUR <span className="text-paluto-red">FEEDBACK</span>
          </h2>
          <div className="w-24 h-1.5 bg-paluto-yellow mt-2" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {FEEDBACKS.map((fb, index) => (
            <motion.div
              key={fb.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="card card-side bg-base-100 shadow-xl rounded-[2rem] border border-base-300 overflow-hidden"
            >
              <figure className="w-1/3 relative h-full min-h-[160px]">
                <Image src={fb.image} alt={fb.name} fill className="object-cover" />
              </figure>
              <div className="card-body w-2/3 p-6 md:p-8 justify-center bg-qgc-gray-soft">
                <h3 className="card-title text-black font-bold uppercase text-lg">{fb.name}</h3>
                {/* Rating using Heroicons */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={`${fb.id}-star-${i}`}
                      className={`w-5 h-5 ${i < fb.rating ? 'text-paluto-red' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-black italic mt-2">"{fb.testimonial}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
