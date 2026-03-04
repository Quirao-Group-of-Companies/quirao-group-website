import Image from 'next/image';
import { logger } from '@/lib/axiom/server';
import { after } from 'next/server';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import FavoritesShowcase from '@/components/paluto/FavoritesShowcase';

/**
 * Paluto Subsidiary Page
 * 
 * This page serves as the landing page for the Paluto subsidiary.
 * It features a hero section, an overview section, and a favorites showcase.
 */
export default async function PalutoPage() {
  // Axiom Logging for observability
  logger.info("Paluto subsidiary page visited");
  after(() => {
    logger.flush();
  });

  return (
    <main className="w-full pt-20 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[90vh] flex flex-col justify-end overflow-hidden">
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
        <div className="absolute top-0 left-8 md:left-16 z-20">
          <Image
            src="/images/logo/paluto/paluto-logo-red.png"
            alt="Paluto Logo"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>

        {/* Content Bottom Left */}
        <div className="relative z-10 pl-12 md:pl-24 pb-32 space-y-2">
          {/* Brand Name in Rounded Rectangle */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-10 py-1 w-fit shadow-2xl border border-white/50">
            <h1 className="text-paluto-red text-5xl md:text-3xl font-bold font-poppins uppercase tracking-tighter leading-none">
              Paluto
            </h1>
          </div>

          {/* Subtitle / Tagline */}
          <div className="max-w-3xl">
            <p className="text-white text-xl md:text-3xl font-bold drop-shadow-xl font-poppins">
              Seafood Grill and Restaurant
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="bg-white py-24 px-6 md:px-12 flex flex-col items-center text-center">
        {/* Secondary Logo at the top */}
        <div className="mb-1">
          <Image
            src="/images/logo/paluto/word-mark-logo.png"
            alt="Paluto Word Mark Logo"
            width={720}
            height={360}
            className="object-contain"
          />
        </div>

        {/* H1 and Description */}
        <div className="max-w-6xl mx-auto space-y-6 mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-qgc-black uppercase font-poppins tracking-tight">
            Iloilo’s Destination for Premium Seafood & Celebrations.
          </h1>
          <p className="max-w-4xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed font-poppins">
            Paluto Seafood & Grill Restaurant is a seafood destination in Iloilo, known for its fresh live seafood, vibrant dining experience, and celebration-ready ambiance. We serve families, balikbayans, tourists, corporate groups, and event clients who want not just a meal but complete Iloilo experience. Our signature offerings include mixed seafood boat, live paluto cooking for buffet & catering, Fresh sea-to-table cooking, unlimited promos (UNLI 699), and full-service catering for all types of events. With our in-house stage, LED wall, sound system, and customizable event setups, Paluto transforms every visit into a memorable celebration.
          </p>
        </div>

        {/* CTA Banner Rectangle (Container with gradient) */}
        <div 
          className="w-full max-w-4xl bg-linear-to-r from-paluto-red to-paluto-yellow/50 rounded-[2rem] p-6 md:p-8 flex items-center justify-between shadow-md border border-white/10"
        >
          <span className="text-xl md:text-2xl font-bold uppercase tracking-tight font-poppins text-white drop-shadow-sm">
            Explore Paluto Facebook Page
          </span>

          {/* Clickable inner button */}
          <a 
            href="https://www.facebook.com/palutophilippines" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white hover:bg-qgc-gray-soft text-paluto-red px-6 py-3 rounded-2xl shadow-sm flex items-center gap-2 transition-all duration-300 active:scale-95"
          >
            <span className="font-bold uppercase text-xs md:text-sm">Visit Facebook Page</span>
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* 3. FAVORITES SHOWCASE */}
      <FavoritesShowcase />

      {/* Additional sections can be added below */}
    </main>
  );
}
