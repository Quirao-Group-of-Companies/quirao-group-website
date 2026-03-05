'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Podcast {
  id: number;
  image: string;
  title: string;
  guest: string;
  host: string;
}

interface PodcastsSectionProps {
  podcasts: Podcast[];
  badgeSrc: string;
  ctaHref: string;
}

export default function PodcastsSection({
  podcasts,
  badgeSrc,
  ctaHref,
}: PodcastsSectionProps) {
  return (
    <section className="py-14 bg-white">
      <motion.h2
        className="text-center text-[#111] font-semibold text-2xl mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Watch Our Podcasts
      </motion.h2>

      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto px-6 mb-8">
        {podcasts.map((pod, i) => (
          <motion.div
            key={pod.id}
            className="relative rounded-xl overflow-hidden bg-[#0d1b3e] shadow-md cursor-pointer group"
            style={{ aspectRatio: '16/9' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={pod.image}
              alt={pod.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => {}}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badge */}
            <div className="absolute top-2 right-2">
              <Image
                src={badgeSrc}
                alt="The Builders Podcast"
                width={50}
                height={30}
                className="object-contain"
                onError={() => {}}
              />
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <p className="text-white text-[10px] font-extrabold leading-tight uppercase mb-1.5">
                {pod.title}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-white/60 text-[9px]">{pod.guest}</p>
                <p className="text-white/60 text-[9px]">{pod.host}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center px-6">
        <div className="flex items-center gap-3 bg-[#0d1b3e] rounded-full px-2 py-2 shadow-md">
          <span className="text-white text-[12px] font-bold uppercase tracking-widest pl-4 pr-2">
            WATCH US ON YOUTUBE
          </span>
          <motion.a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 bg-white text-[#0d1b3e] text-[11px] font-bold px-4 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            Visit Us <ArrowRightIcon className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}