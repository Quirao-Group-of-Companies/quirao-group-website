'use client';

import type { StrapiFeedback } from '@cms/types';
import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal.client';

interface SubsidiaryFeedbackProps {
  feedbacks?: StrapiFeedback[];
  brandName?: string;
  highlightText?: string;
  highlightColorClass?: string;
  starColorClass?: string;
  indicatorColorClass?: string;
}

/**
 * A reusable Feedback Section component for subsidiary pages (e.g., Paluto, Sari-Sari Manokan).
 * It uses the design from the Paluto feedback section.
 */
export default function SubsidiaryFeedback({
  feedbacks = [],
  brandName = 'OUR',
  highlightText = 'FEEDBACK',
  highlightColorClass = 'text-paluto-red',
  starColorClass = 'text-paluto-red',
  indicatorColorClass = 'bg-paluto-yellow',
}: SubsidiaryFeedbackProps) {
  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header scaled down */}
        <ScrollReveal>
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
              {brandName} <span className={highlightColorClass}>{highlightText}</span>
            </h2>
            <div className={`w-20 h-1 ${indicatorColorClass} mt-2`} />
          </div>
        </ScrollReveal>

        {/* Grid scaled down */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {feedbacks.map((fb, index) => (
            <FeedbackCard
              key={fb.id}
              item={fb}
              index={index}
              starColorClass={starColorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeedbackCard({
  item,
  index,
  starColorClass,
}: {
  item: StrapiFeedback;
  index: number;
  starColorClass: string;
}) {
  /**
   * Normalizes URLs to prevent double slashes after the domain.
   */
  const normalizeUrl = (url: string) => {
    if (!url) {
      return '';
    }
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
            alt={item.review?.title || 'Reviewer'}
            fill
            className="object-cover"
          />
        )}
      </figure>
      <div className="card-body w-2/3 p-5 md:p-6 justify-center bg-qgc-gray-soft">
        <h3 className="card-title text-black font-bold uppercase text-base">
          {item.review?.title}
        </h3>
        {/* Rating using Heroicons scaled down */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={`${item.id}-star-${i}`}
              className={`w-4 h-4 ${(item.stars ?? 0) > i ? starColorClass : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-xs md:text-sm text-black italic mt-1.5 leading-snug">
          "{item.review?.description}"
        </p>
      </div>
    </motion.div>
  );
}
