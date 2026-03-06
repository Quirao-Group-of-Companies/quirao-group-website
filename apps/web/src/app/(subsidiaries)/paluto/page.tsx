import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { after } from 'next/server';
import EventsCatering from '@/components/paluto/EventsCatering';
import FavoritesShowcase from '@/components/paluto/FavoritesShowcase';
import Feedback from '@/components/paluto/Feedback';
import { logger } from '@/lib/axiom/server';
import { getPalutoPage } from '@/lib/services/strapi-paluto';
import type { PalutoPageData } from '@/types/paluto-page';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

/**
 * Paluto Subsidiary Page
 *
 * This page serves as the landing page for the Paluto subsidiary.
 * It features a hero section and an overview section with a Facebook CTA.
 */
export default async function PalutoPage() {
  const data: PalutoPageData = await getPalutoPage();

  // Axiom Logging for observability
  logger.info('Paluto subsidiary page visited');
  after(() => {
    logger.flush();
  });

  const hero = data.hero?.[0];
  const overview = data.hero?.[1];
  const midBanner = data.bannerSection;
  const branches = data.branchesCards;

  return (
    <main className="w-full pt-16 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[80vh] flex flex-col justify-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {hero?.image?.url ? (
            <Image
              src={hero.image.url}
              alt={hero.image.alternativeText || 'Paluto Hero Background'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <Image
              src="/images/home-page/business-preview/paluto-business-preview.jpg"
              alt="Paluto Hero Background"
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Subtle Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Logo Top Left */}
        <div className="absolute top-0 left-6 md:left-12 z-20">
          {hero?.logo?.image?.url ? (
            <Image
              src={hero.logo.image.url}
              alt={hero.logo.logoName || 'Paluto Logo'}
              width={200}
              height={200}
              className="object-contain"
            />
          ) : (
            <Image
              src="/images/logo/paluto/paluto-logo-red.png"
              alt="Paluto Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          )}
        </div>

        {/* Content Bottom Left */}
        <div className="relative z-10 pl-10 md:pl-20 pb-24 space-y-1.5">
          {/* Brand Name in Rounded Rectangle */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl px-8 py-1 w-fit shadow-2xl border border-white/50">
            <h1 className="text-paluto-red text-4xl md:text-2xl font-bold font-poppins uppercase tracking-tighter leading-none">
              {hero?.title || 'Paluto'}
            </h1>
          </div>

          {/* Subtitle / Tagline */}
          <div className="max-w-2xl">
            <p className="text-white text-lg md:text-2xl font-bold drop-shadow-xl font-poppins">
              {hero?.description || 'Seafood Grill and Restaurant'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION (Split Screen) */}
      <section className="bg-white pt-20 pb-10 px-6 md:px-10 border-l-[5px] border-cyan-400 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-black leading-[1.1] font-poppins">
              {overview?.title ? (
                overview.title.split(/(\bToday\b|\bTomorrow\b)/g).map((part, i) => {
                  if (part === 'Today' || part === 'Tomorrow') {
                    return (
                      // biome-ignore lint/suspicious/noArrayIndexKey: parts are small and order is stable
                      <span key={`${part}-${i}`} className="text-paluto-red">
                        {part}
                      </span>
                    );
                  }
                  return part;
                })
              ) : (
                <>
                  Excellent Seafood <span className="text-paluto-red">Today</span>, <br />
                  A Lasting Tradition <span className="text-paluto-red">Tomorrow</span>.
                </>
              )}
            </h2>
            <div className="space-y-5">
              {overview?.description ? (
                overview.description.split('\n\n').map((para) => (
                  <p
                    key={para.substring(0, 32)}
                    className="text-gray-500 text-base md:text-lg leading-relaxed font-poppins font-medium"
                  >
                    {para}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed font-poppins font-medium">
                    Paluto Seafood & Grill Restaurant is a seafood destination in Iloilo, known for its
                    fresh live seafood, vibrant dining experience, and celebration-ready ambiance. We serve
                    families, balikbayans, tourists, corporate groups, and event clients who want not just a
                    meal but complete Iloilo experience.
                  </p>
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed font-poppins font-medium">
                    Our signature offerings include mixed seafood boat, live paluto cooking for buffet & catering, 
                    Fresh sea-to-table cooking, unlimited promos (UNLI 699), and full-service catering for all types of events. 
                    With our in-house stage, LED wall, sound system, and customizable event setups, Paluto transforms every visit 
                    into a memorable celebration.
                  </p>
                </>
              )}
            </div>

            {/* CTA Banner Rectangle (Container with gradient) */}
            <div className="w-full bg-linear-to-r from-paluto-red to-paluto-yellow/50 rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-md">
              <span className="text-base md:text-lg font-bold uppercase tracking-tight font-poppins text-white drop-shadow-sm">
                Explore Paluto Facebook Page
              </span>

              {/* Clickable inner button */}
              <a
                href={overview?.cta?.href || "https://www.facebook.com/palutophilippines"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-qgc-gray-soft text-qgc-black px-6 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all duration-300 active:scale-95"
              >
                <span className="font-bold uppercase text-[10px] md:text-xs">
                  {overview?.cta?.title || "Visit Facebook Page"}
                </span>
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Circular Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] border-[10px] border-white">
              {overview?.image?.url ? (
                <Image
                  src={overview.image.url}
                  alt={overview.image.alternativeText || 'Overview Image'}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/images/paluto/showcase 4.jpg"
                  alt="Crispy Squid Calamares"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAVORITES SHOWCASE */}
      <FavoritesShowcase data={data.showcase} />

      {/* 4. MID BANNER */}
      <section className="relative w-full overflow-hidden">
        {midBanner?.image?.url ? (
          <Image
            src={midBanner.image.url}
            alt={midBanner.image.alternativeText || 'Paluto Banner'}
            width={1920}
            height={800}
            className="w-full h-auto"
          />
        ) : (
          <Image
            src="/images/paluto/paluto-cover.png"
            alt="Paluto Banner"
            width={1920}
            height={800}
            className="w-full h-auto"
          />
        )}
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/5 to-black/30 pointer-events-none" />
      </section>

      {/* 5. BRANCHES SECTION */}
      <section className="bg-white pb-6">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-4xl font-black uppercase italic text-black tracking-tighter">
              OUR <span className="text-paluto-red">BRANCHES</span>
            </h2>
            <div className="w-20 h-1 bg-paluto-yellow mt-2" />
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches && branches.length > 0 ? (
              branches.map((branch) => (
                <div
                  key={branch.id}
                  className="group bg-white rounded-[1.5rem] border-2 border-gray-100 overflow-hidden hover:border-paluto-red transition-all duration-500 shadow-sm hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden">
                    {branch.image?.url && (
                      <Image
                        src={branch.image.url}
                        alt={branch.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Text Content */}
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-black text-black mb-1.5 uppercase italic">
                      {branch.title}
                    </h3>
                    <p className="text-gray-500 font-medium mb-6 text-sm">{branch.description}</p>

                    {branch.cta && (
                      <a
                        href={branch.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-paluto-red transition-all active:scale-95"
                      >
                        {branch.cta.title}
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-2 text-gray-500">No branches found.</p>
            )}
          </div>
        </div>
      </section>

      {/* 6. EVENTS & CATERING */}
      <EventsCatering 
        sectionData={data.eventsAndCateringSection} 
        carouselImages={data.eventsAndCateringCarouselImages} 
      />

      {/* 7. FEEDBACK SECTION */}
      <Feedback data={data.feedback} />

      {/* 8. CONTACT US SECTION */}
      <section className="w-full bg-white pb-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-qgc-gray-soft rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
          {/* Left Side: Contact Info */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 p-12">
            {/* Address */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-4 rounded-full border-2 border-black">
                <MapPinIcon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold uppercase text-black">Address:</h3>
              <p className="text-gray-700 text-sm max-w-[220px] leading-snug">
                Coastal Road Brgy. Bito-on, Jaro, Iloilo City, Philippines, 5000
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-4 rounded-full border-2 border-black">
                <EnvelopeIcon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold uppercase text-black">Email:</h3>
              <p className="text-gray-700 text-sm break-all">management@quiraogroup.com</p>
            </div>

            {/* Call Us */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-4 rounded-full border-2 border-black">
                <PhoneIcon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold uppercase text-black">Call Us:</h3>
              <p className="text-gray-700 text-sm font-bold">0927 847 7110</p>
            </div>

            {/* Socials */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-4 rounded-full border-2 border-black">
                <ShareIcon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold uppercase text-black">Socials:</h3>
              <div className="flex gap-3 mt-1">
                {/* Social Icons (Standard SVG path to match Heroicon weight) */}
                <a
                  href="https://facebook.com/palutophilippines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24" role="img">
                    <title>Facebook</title>
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24" role="img">
                    <title>Instagram</title>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Google Maps */}
          <div className="w-full lg:w-1/2 h-[450px] lg:h-auto min-h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6978772110306!2d122.58989227479233!3d10.757751559538438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee5f789195a35%3A0x2931986f1ba772b4!2sPaluto%20Seafood%20Grill%20%26%20Restaurant!5e0!3m2!1sen!2sph!4v1772771468233!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Paluto Seafood Grill & Restaurant Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Additional sections can be added below */}
    </main>
  );
}
