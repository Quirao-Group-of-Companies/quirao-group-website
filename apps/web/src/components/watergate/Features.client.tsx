'use client';

import { motion } from 'framer-motion';

interface FeatureCard {
  id: number;
  title: string;
  description: string;
}

interface WatergateFeaturesProps {
  heading: string;
  tagline: string;
  cards: FeatureCard[];
}

export default function WatergateFeatures({ heading, tagline, cards }: WatergateFeaturesProps) {
  if (!cards || cards.length === 0) return null;

  const leftCards = cards.filter((_, i) => i % 2 === 0);
  const rightCards = cards.filter((_, i) => i % 2 !== 0);

  return (
    <section className="w-full bg-white py-10 md:py-14 px-6 md:px-12 lg:px-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Left: heading + tagline — takes less width to match Figma */}
        <motion.div
          className="w-full md:w-[32%] flex-shrink-0 flex flex-col gap-3 md:pt-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="font-black uppercase text-watergate-blue leading-tight"
            style={{ fontSize: 'clamp(26px, 3.5vw, 52px)' }}
          >
            {heading}
          </h2>
          {tagline && (
            <p className="text-watergate-blue font-medium text-sm sm:text-base leading-relaxed">{tagline}</p>
          )}
        </motion.div>

        {/* Right: two-column staggered card grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {leftCards.map((card, i) => (
              <motion.div
                key={card.id}
                className="bg-[#20305f] rounded-2xl p-5 flex flex-col gap-2"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <h3 className="text-white font-bold text-sm sm:text-base">{card.title}</h3>
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:mt-6">
            {rightCards.map((card, i) => (
              <motion.div
                key={card.id}
                className="bg-[#20305f] rounded-2xl p-5 flex flex-col gap-2"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 + 0.1 }}
              >
                <h3 className="text-white font-bold text-sm sm:text-base">{card.title}</h3>
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}