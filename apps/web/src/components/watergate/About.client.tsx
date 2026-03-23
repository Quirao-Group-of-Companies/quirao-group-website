'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface WatergateAboutProps {
  title: string;
  description: string;
  imageSrc: string;
  logoSrc: string;
  ctaTitle: string;
  ctaHref: string;
}

export default function WatergateAbout({
  title,
  description,
  imageSrc,
  logoSrc,
  ctaTitle,
  ctaHref,
}: WatergateAboutProps) {
  return (
    <section className="w-full bg-white py-10 md:py-14 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
        {/* Text side */}
        <motion.div
          className="flex-1 flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo image */}
          {logoSrc ? (
            <div className="relative" style={{ width: 'clamp(160px, 20vw, 280px)', height: 'clamp(50px, 7vw, 100px)' }}>
              <Image
                src={logoSrc}
                alt={title}
                fill
                className="object-contain object-left"
                onError={() => {}}
              />
            </div>
          ) : (
            <h2
              className="font-black italic text-[#20305f]"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              {title}
            </h2>
          )}

          {description && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg">
              {description}
            </p>
          )}

          {ctaHref && ctaTitle && (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-3 bg-[#20305f] text-white font-bold uppercase text-xs sm:text-sm px-5 py-3 rounded-xl hover:bg-[#2d4480] transition-colors w-fit"
            >
              <span>{ctaTitle}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          )}
        </motion.div>

        {/* Image side */}
        {imageSrc && (
          <motion.div
            className="w-full md:w-[48%] flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-xl"
              style={{ aspectRatio: '4/3' }}
            >
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                onError={() => {}}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}