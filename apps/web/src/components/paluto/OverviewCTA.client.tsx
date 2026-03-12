'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface OverviewCTAProps {
  href: string;
  title: string;
}

export default function OverviewCTA({ href, title }: OverviewCTAProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="w-full bg-linear-to-r from-paluto-red to-paluto-yellow/50 rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-md transition-all duration-300"
    >
      <span className="text-base md:text-lg font-bold uppercase tracking-tight font-poppins text-white drop-shadow-sm">
        Explore Paluto Facebook Page
      </span>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white hover:bg-qgc-gray-soft text-qgc-black px-6 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all duration-300 cursor-pointer"
      >
        <span className="font-bold uppercase text-[10px] md:text-xs">{title}</span>
        <ArrowRightIcon className="w-4 h-4" />
      </motion.a>
    </motion.div>
  );
}
