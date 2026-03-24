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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">

        {/* On mobile: image renders first (top), on desktop: text is left, image is right */}
        {/* Image side — order-first on mobile, order-last on desktop */}
        {imageSrc && (
          <motion.div
            className="w-full md:w-[48%] flex-shrink-0 order-first md:order-last mt-6 md:mt-10"
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

        {/* Text side */}
        <motion.div
          className="flex-1 flex flex-col justify-between gap-6 order-last md:order-first"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-0">
            {/* Logo image */}
            {logoSrc ? (
              <div className="relative w-full" style={{ height: 'clamp(80px, 14vw, 220px)' }}>
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
              <p className="text-black text-base sm:text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {ctaHref && ctaTitle && (
            <motion.div
              className="bg-watergate-blue rounded-[1rem] px-5 py-5 flex flex-col sm:flex-row items-center justify-between shadow-md gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-sm md:text-2xl font-bold uppercase tracking-tight text-white drop-shadow-sm text-center sm:text-left">
                {ctaTitle}
              </span>
              <motion.a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 bg-white text-[#0d1b3e] px-5 py-2 rounded-2xl shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <span className="font-bold uppercase text-sm whitespace-nowrap">Visit Facebook Page</span>
                <ArrowRightIcon className="w-4 h-4" />
              </motion.a>
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
}