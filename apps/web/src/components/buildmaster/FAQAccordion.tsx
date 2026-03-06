'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-14 px-6 md:px-10 bg-[#e8ecf4]">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-center text-[#111] font-semibold text-2xl mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          FAQs
        </motion.h2>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                className="rounded-lg overflow-hidden border border-gray-300 bg-white"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-[13px] font-semibold transition-colors ${
                    isOpen ? 'bg-[#1a1a2e] text-white' : 'bg-white text-[#111] hover:bg-gray-50'
                  }`}
                >
                  {faq.question}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDownIcon
                      className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-gray-400'}`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="px-4 py-4 text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
