'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AboutTab {
  id: string;
  label: string;
  image: string;
  body: string;
}

interface AboutSectionProps {
  tabs: AboutTab[];
  backgroundSrc?: string;
  wordmarkLogoSrc: string;
}

export default function AboutSection({
  tabs,
  backgroundSrc,
  wordmarkLogoSrc,
}: AboutSectionProps) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === activeId)!;

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      {/* Low-opacity background image */}
      {backgroundSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundSrc}
            alt="About background"
            fill
            className="object-cover"
            onError={() => {}}
          />
          <div className="absolute inset-0 bg-qgc-charcoal/50" />
        </div>
      )}

      <div className="relative z-10 px-6 md:px-10 py-14">
        {/* Title */}
        <motion.h2
          className="text-center text-[#111] text-white font-semibold text-3xl mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">

          {/* LEFT — image card animates on tab change */}
          <div className="w-full md:w-[45%] flex-shrink-0">
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#1a3a6e] to-[#2563eb]"
              style={{ aspectRatio: '4/3' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  <Image
                    src={tab.image}
                    alt={tab.label}
                    fill
                    className="object-cover"
                    onError={() => {}}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — tabs + text */}
          <div className="flex-1">
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-5">
              {tabs.map((t) => (
                <motion.button
                  key={t.id}
                  onClick={() => setActiveId(t.id)}
                  whileTap={{ scale: 0.96 }}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors duration-200 ${
                    activeId === t.id
                      ? 'bg-[#111] text-white border-[#111]'
                      : 'bg-transparent text-white-500 border-gray-300 hover:border-gray-500'
                  }`}
                >
                  {t.label}
                </motion.button>
              ))}
            </div>

            {/* Tab content animates on change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3 className="text-[#111] font-semibold  text-white text-2xl mb-3">{tab.label}</h3>
                <p className="text-[13px] text-white text-[#444] leading-[1.85]">{tab.body}</p>
              </motion.div>
            </AnimatePresence>

            {/* Bounce chevron */}
            <motion.div
              className="mt-8 flex justify-center"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDownIcon className="w-7 h-7 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}