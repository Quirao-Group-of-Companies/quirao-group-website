'use client';

import { PlayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface Podcast {
  id: number;
  image: string;
  youtubeId: string;
}

interface PodcastsSectionProps {
  podcasts: Podcast[];
}

export default function PodcastsSection({ podcasts }: PodcastsSectionProps) {
  // Guard clause for empty podcasts array
  if (!podcasts || podcasts.length === 0) {
    return null;
  }
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-14 bg-white w-full">
      <motion.h2
        className="text-center text-[#111] font-semibold text-2xl mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Watch Our Podcasts
      </motion.h2>

      {/* Full-width 2×2 grid */}
      <div className="grid grid-cols-2 gap-4 w-full px-6">
        {podcasts.map((pod, i) => (
          <motion.div
            key={pod.id}
            className="relative rounded-2xl overflow-hidden bg-[#0d1b3e] shadow-md cursor-pointer group"
            style={{ aspectRatio: '16/9' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => setActiveId(pod.youtubeId)}
          >
            <Image
              src={pod.image}
              alt={`Podcast ${pod.id}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => {}}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.35)' }}
                transition={{ duration: 0.2 }}
              >
                <PlayIcon className="w-7 h-7 text-white ml-1" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* YouTube Modal */}
      <AnimatePresence>
        {activeId && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="relative w-full max-w-4xl pointer-events-auto">
                <button
                  onClick={() => setActiveId(null)}
                  className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-7 h-7" />
                </button>
                <div
                  className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
                  style={{ aspectRatio: '16/9' }}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0`}
                    title="Podcast Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
