import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { after } from 'next/server';
import FavoritesShowcase from '@/components/FavoritesShowcase';
import VerticalCarousel from '@/components/VerticalCarousel';
import { logger } from '@/lib/axiom/server';

const BRANCHES = [
  {
    id: 1,
    name: 'Paluto - Main',
    address: 'Coastal Road, Bito-on, Jaro, Iloilo City',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Paluto+Caniogan',
    image: '/images/home-page/business-preview/sari-sari-manokan-business-preview.jpg', // placeholder
  },
  {
    id: 2,
    name: 'Paluto - Passi',
    address: 'Brgy. Sablogon, Passi, Philippines, 5037',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Paluto+Concepcion',
    image: '/images/home-page/business-preview/paluto-business-preview.jpg', // placeholder
  },
];

/**
 * Paluto Subsidiary Page
 *
 * This page serves as the landing page for the Paluto subsidiary.
 * It features a hero section and an overview section with a Facebook CTA.
 */
export default async function ManokanPage() {
  // Axiom Logging for observability
  logger.info('Paluto subsidiary page visited');
  after(() => {
    logger.flush();
  });

  return (
    <main className="w-full pt-20 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col justify-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home-page/business-preview/paluto-business-preview.jpg"
            alt="Paluto Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Logo Top Left */}
        <div className="absolute top-10 left-8 md:left-16 z-20">
          <Image
            src="/images/logo/manokan/sari-sari-manokan-logo-word.png"
            alt="sari sari manokan logo"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>

        {/* Content Bottom Left */}
        <div className="relative z-10 pl-8 md:pl-16 pb-10 space-y-2">
          {/* Brand Name in Rounded Rectangle */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-10 py-1 w-fit shadow-2xl border border-white/50">
            <h1 className="text-paluto-red text-5xl md:text-3xl font-bold font-poppins uppercase tracking-tighter leading-none">
              Sari-Sari Manokan
            </h1>
          </div>

          {/* Subtitle / Tagline */}
          <div className="max-w-3xl">
            <p className="text-white text-xl md:text-3xl font-bold drop-shadow-xl font-poppins">
              Sari-sari Manokan and Seafood Restaurant
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="bg-qgc-gray-soft px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 md:h-screen overflow-hidden py-16 md:py-10">
        {/* Left Content Side */}
        <div className="flex items-start justify-center flex-col w-full md:w-[55%] gap-6 h-full max-w-4xl">
          {/* <div className="w-full max-w-[280px] lg:max-w-[320px] h-auto text-left">
            <Image
              src="/images/logo/manokan/sari-sari-manokan-logo-word.png"
              alt="sari sari manokan logo"
              width={300}
              height={200}
              className="object-contain"
            />
          </div> */}

          {/* H1 and Description */}
          <div className="space-y-4 text-start">
            <h1 className="text-xl md:text-xl lg:text-2xl xl:text-4xl font-black text-qgc-black uppercase font-poppins tracking-tight leading-tight">
              Iloilo’s Destination for Premium Seafood & Celebrations.
            </h1>
            <p className="text-gray-600 text-base md:text-lg lg:text-base leading-relaxed text-left font-poppins line-clamp-4 lg:line-clamp-6">
              Paluto Seafood & Grill Restaurant is a seafood destination in Iloilo, known for its
              fresh live seafood, vibrant dining experience, and celebration-ready ambiance. We serve
              families, balikbayans, tourists, corporate groups, and event clients who want not just a
              meal but complete Iloilo experience. Our signature offerings include mixed seafood boat,
              live paluto cooking for buffet & catering, Fresh sea-to-table cooking, unlimited promos
              (UNLI 699), and full-service catering for all types of events.
            </p>
          </div>

          {/* CTA Banner Rectangle (Container with gradient) */}
          <div className="w-full bg-linear-to-r from-paluto-green to-paluto-yellow/50 rounded-[2rem] p-5 md:p-6 lg:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <span className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight font-poppins text-white drop-shadow-sm text-center sm:text-left leading-tight">
              Explore Sari-sari Manokan Facebook Page
            </span>

            {/* Clickable inner button */}
            <a
              href="https://www.facebook.com/palutophilippines"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-qgc-gray-deep hover:text-qgc-white text-qgc-black px-5 py-3 lg:px-6 lg:py-4 rounded-2xl shadow-sm flex items-center gap-2 transition-all duration-300 active:scale-95 whitespace-nowrap"
            >
              <span className="font-bold uppercase text-[10px] md:text-xs lg:text-sm">Visit Facebook Page</span>
              <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
          </div>
        </div>

        {/* Right Content Side: Vertical Carousel */}
        <div className="w-full md:w-[40%] flex justify-center items-center h-[400px] md:h-[80%] lg:h-[85%]">
          <VerticalCarousel />
        </div>
      </section>

      {/* 3. FAVORITES SHOWCASE */}
      <FavoritesShowcase />

      {/* 4. Feedback section*/}
    

      {/* Additional sections can be added below */}
    </main>
  );
}
