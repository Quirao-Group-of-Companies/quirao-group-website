'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
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
  if (!podcasts || podcasts.length === 0) {
    return null;
  }

  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-14 bg-white w-full">
      <motion.div
        className="flex flex-col items-center text-center mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
          WATCH OUR <span style={{ color: '#0a285a' }}>PODCASTS</span>
        </h2>
        <div className="w-20 h-1 bg-bm-vivid-blue mt-2" />
      </motion.div>

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

            {/* YouTube-style red play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="0 0 68 48" className="w-16 h-12 drop-shadow-lg">
                  <path
                    d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                    fill="#ff0000"
                  />
                  <path d="M45 24 27 14v20z" fill="#fff" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal — lazy-loads the iframe only on click to avoid Cloudflare pre-blocking */}
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
                    key={activeId}
                    src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
                    title="Podcast Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                {/* Fallback link in case iframe is still blocked */}
                <a
                  href={`https://www.youtube.com/watch?v=${activeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center text-white/60 hover:text-white text-sm underline"
                >
                  Open in YouTube
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}