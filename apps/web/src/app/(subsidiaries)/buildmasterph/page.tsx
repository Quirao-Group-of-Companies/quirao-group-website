'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import HeroCarousel from '@/components/buildmaster/heroCarousel';
import FeaturesCarousel from '@/components/buildmaster/featuresCarousel';
import AboutSection from '@/components/buildmaster/aboutUsSection';
import PodcastsSection from '@/components/buildmaster/podcastSection';
import FAQAccordion from '@/components/buildmaster/FAQAccordion';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const HERO_SLIDES = [
  '/images/logo/buildmaster/herosection1.jpg',
  '/images/logo/buildmaster/herosection2.jpg',
  '/images/logo/buildmaster/herosection3.jpg',
];

const FEATURES = [
  { id: 1, image: '/images/logo/buildmaster/BM1.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
  { id: 2, image: '/images/logo/buildmaster/bm2.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
  { id: 3, image: '/images/logo/buildmaster/bm3.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
  { id: 4, image: '/images/logo/buildmaster/bm4.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
  { id: 5, image: '/images/logo/buildmaster/bm5.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
  { id: 6, image: '/images/logo/buildmaster/bm6.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
  { id: 7, image: '/images/logo/buildmaster/bm7.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
  { id: 8, image: '/images/logo/buildmaster/bm8.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
  { id: 9, image: '/images/logo/buildmaster/bm9.jpg', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis' },
];

const ABOUT_TABS = [
  {
    id: 'mission',
    label: 'Mission',
    image: '/images/buildmaster/about/mission.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
  },
  {
    id: 'vision',
    label: 'Vision',
    image: '/images/buildmaster/about/vision.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
  },
  {
    id: 'values',
    label: 'Core Values',
    image: '/images/buildmaster/about/values.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
  },
  {
    id: 'story',
    label: 'Our Story',
    image: '/images/buildmaster/about/story.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
  },
];

const PODCASTS = [
  { id: 1, image: '/images/buildmaster/podcasts/podcast-1.jpg', title: "WHAT DOES LOVE BUILD WHEN IT'S VISIBLE", guest: 'Erriz Lancota', host: 'Charu Mendez' },
  { id: 2, image: '/images/buildmaster/podcasts/podcast-2.jpg', title: 'WHY FOOD COMPLETES EVERY FILIPINO CHRISTMAS', guest: 'Cicij Jalandoni', host: 'Charu Mendez' },
  { id: 3, image: '/images/buildmaster/podcasts/podcast-3.jpg', title: 'WILL AI REPLACE FILIPINO WORKERS?', guest: 'Dr. Joel Garcera', host: 'Charu Mendez' },
  { id: 4, image: '/images/buildmaster/podcasts/podcast-4.jpg', title: "IT'S OKAY NOT TO LOOK PERFECT", guest: 'Jairo Jairo', host: 'Charu Mendez' },
];

const FAQS = [
  {
    id: 1,
    question: 'What are the Companies under the Quirao Group of Companies?',
    answer: 'Currently, our operational subsidiaries include:\nPaluto Grill and Seafoods (Food & Beverage)\nSali-Sali Sapasakan (Food & Beverage)\nWatergate (Water Refilling Services)\nBrightline (Trucking & Logistics)\nBuildmaster (Construction E-commerce & Supplies)\nPowerBridge (Industrial Services)',
  },
  {
    id: 2,
    question: 'How do I contact a specific subsidiary for orders, quotes, or services?',
    answer: 'Each subsidiary has its own dedicated contact page. You can also reach us through the Quirao Group main contact page and we will route your inquiry to the right team.',
  },
  {
    id: 3,
    question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit ?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 4,
    question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit ?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.',
  },
];

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function BuildMasterPage() {
  return (
    <main className="w-full min-h-screen bg-white">

      {/* 1. HERO */}
      <HeroCarousel
        slides={HERO_SLIDES}
        logoSrc="/images/logo/buildmaster/BMMI-WHITE.png"
        brandName="BUILDMASTER"
        tagline="Shopping and Retail"
      />

      {/* 2. FEATURES */}
      <FeaturesCarousel
        features={FEATURES}
        ctaHref="https://buildmaster.ph"
      />

      {/* 3. ABOUT US */}
      <AboutSection
        tabs={ABOUT_TABS}
        backgroundSrc="/images/buildmaster/about/bg.jpg"
        wordmarkLogoSrc="/images/logo/buildmaster/BM_Wordmark_blue.png"
      />

      {/* 4. PODCASTS */}
      <PodcastsSection
        podcasts={PODCASTS}
        badgeSrc="/images/buildmaster/podcasts/builders-podcast-badge.png"
        ctaHref="https://www.youtube.com/@buildmasterphilippines"
      />

      {/* 5. APP BANNER */}
      <section className="relative overflow-hidden bg-[#0d1b3e]">
        <div className="absolute inset-0">
          <Image
            src="/images/buildmaster/banner/app-banner.jpg"
            alt="BuildMaster App Banner"
            fill
            className="object-cover"
            onError={() => {}}
          />
          <div className="absolute inset-0 bg-[#0d1b3e]/60" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center py-20 px-6 text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/images/buildmaster/banner/app-preview.png"
              alt="BuildMaster App Preview"
              width={220}
              height={420}
              className="object-contain drop-shadow-2xl"
              onError={() => {}}
            />
          </motion.div>

          <motion.div
            className="flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Google Play */}
            <motion.a
              href="https://play.google.com/store/apps/details?id=ph.buildmaster"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-white/10 border border-white/25 text-white px-5 py-3 rounded-xl backdrop-blur"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
                <path d="M3.18 23.76a2 2 0 0 0 2.07-.22l11.4-6.57-2.54-2.54-10.93 9.33zM20.43 9.37l-2.67-1.54-2.84 2.84 2.84 2.84 2.7-1.56a1.98 1.98 0 0 0-.03-3.58zM1.18.55A2 2 0 0 0 .75 1.8v20.4a2 2 0 0 0 .43 1.25l.07.07 11.43-11.43v-.27L1.25.48l-.07.07zM14.53 8.17L3.18.43 1.11 2.5l10.93 9.33 2.49-3.66z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] text-white/50 uppercase tracking-wide">Get it on</div>
                <div className="text-[14px] font-bold">Google Play</div>
              </div>
            </motion.a>

            {/* App Store */}
            <motion.a
              href="https://apps.apple.com/ph/app/buildmaster"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-white/10 border border-white/25 text-white px-5 py-3 rounded-xl backdrop-blur"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] text-white/50 uppercase tracking-wide">Download on the</div>
                <div className="text-[14px] font-bold">App Store</div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section className="py-14 px-6 md:px-10 bg-[#e8ecf4]">
        <motion.h2
          className="text-center text-[#111] font-semibold text-2xl mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contact BuildMaster
        </motion.h2>

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          {/* Contact info grid */}
          <motion.div
            className="flex-1 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Address */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 mb-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              </div>
              <span className="text-[12px] font-bold text-[#111]">Address:</span>
              <span className="text-[12px] text-gray-500">Buildmaster.ph</span>
            </div>

            {/* Email */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 mb-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <span className="text-[12px] font-bold text-[#111]">Email:</span>
              <span className="text-[12px] text-gray-500">info@buildmaster.ph</span>
            </div>

            {/* Call */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 mb-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <span className="text-[12px] font-bold text-[#111]">Call Us:</span>
              <span className="text-[12px] text-gray-500">0932 950 4520</span>
            </div>

            {/* Socials */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 mb-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <span className="text-[12px] font-bold text-[#111]">Socials:</span>
              <div className="flex gap-2 mt-0.5">
                <a href="#" className="text-gray-600 hover:text-[#1877F2] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#E4405F] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#FF0000] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="w-full md:w-[48%] rounded-xl overflow-hidden shadow-md"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full bg-blue-100" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/images/buildmaster/contact/map.png"
                alt="BuildMaster Map"
                fill
                className="object-cover"
                onError={() => {}}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. FAQS */}
      <FAQAccordion faqs={FAQS} />

    </main>
  );
}