'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface AboutTab {
  id: string;
  label: string;
  image: string;
  body: string;
}

interface AboutSectionProps {
  imageSrc?: string;
  backgroundSrc?: string;
  tabs: AboutTab[];
}

export default function AboutSection({ imageSrc, backgroundSrc, tabs }: AboutSectionProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');

  if (tabs.length === 0) {
    return null;
  }

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const displayImage = activeTab.image || imageSrc || '';

  return (
    <section className="relative w-full h-screen bg-[#f8f9fb] overflow-hidden">
      {/* Background image */}
      {backgroundSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundSrc}
            alt="About Us background"
            fill
            className="object-cover"
            onError={() => {}}
          />
          <div className="absolute inset-0 bg-qgc-charcoal/60" />
        </div>
      )}

      <div className="relative z-10 px-6 md:px-10 py-14">
        {/* Section heading */}
        <motion.div
          className="flex flex-col items-center text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-black uppercase italic text-white tracking-tighter">
            ABOUT <span style={{ color: '#146ae3' }}>US</span>
          </h2>
          <div className="w-20 h-1 bg-bm-vivid-blue mt-2" />
        </motion.div>

        <div className="flex flex-col md:flex-row py-5 gap-10 max-w-5xl mx-auto items-center">
          {/* Image */}
          {displayImage && (
            <motion.div
              className="w-full md:w-[45%] flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#0a285a] to-[#2563eb]"
                style={{ aspectRatio: '4/3' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  >
                    <Image
                      src={displayImage}
                      alt={activeTab.label}
                      fill
                      className="object-cover"
                      onError={() => {}}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Text panel */}
          <motion.div
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Tab pills — only show when there's more than one entry */}
            {tabs.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((t) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    whileTap={{ scale: 0.96 }}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-semibold border transition-colors duration-200 ${
                      activeId === t.id
                        ? 'bg-[#0a285a] text-white border-[#146ae3]'
                        : 'bg-transparent text-gray-500 border-gray-300 hover:border-bm-vivid-blue'
                    }`}
                  >
                    {t.label}
                  </motion.button>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3 className="text-[#146ae3] font-black uppercase italic text-2xl mb-3">
                  {activeTab.label}
                </h3>
                <p className="text-[14px] text-[#ffffff] leading-[1.85]">{activeTab.body}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
