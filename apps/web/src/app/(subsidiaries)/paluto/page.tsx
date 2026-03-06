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
 */
export default async function PalutoPage() {
  const data: PalutoPageData = await getPalutoPage();

  // Axiom Logging for observability
  logger.info('Paluto subsidiary page visited');
  after(() => {
    logger.flush();
  });

  const hero = data.hero?.[0];
  const overview = data.aboutUs || data.hero?.[1];
  const midBanner = data.bannerSection;
  const branches = data.branchesCards;
  const contactUs = data.contactUs;

  // Sort events carousel images by filename (e.g., event.jpg, event2.jpg, etc.)
  const sortedEventsImages = data.eventsAndCateringCarouselImages
    ? [...data.eventsAndCateringCarouselImages].sort((a, b) => {
        const fileA = a.url.split('/').pop() || '';
        const fileB = b.url.split('/').pop() || '';
        return fileA.localeCompare(fileB, undefined, { numeric: true, sensitivity: 'base' });
      })
    : [];

  // URL normalization for server component
  const normalizeUrl = (url?: string) => {
    if (!url) return '';
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <main className="w-full pt-16 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[80vh] flex flex-col justify-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {hero?.image?.url ? (
            <Image
              src={normalizeUrl(hero.image.url)}
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
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Logo Top Left */}
        <div className="absolute top-0 left-6 md:left-12 z-20">
          {hero?.logo?.image?.url ? (
            <Image
              src={normalizeUrl(hero.logo.image.url)}
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
          <div className="bg-white/95 backdrop-blur-md rounded-xl px-8 py-1 w-fit shadow-2xl border border-white/50">
            <h1 className="text-paluto-red text-4xl md:text-2xl font-bold font-poppins uppercase tracking-tighter leading-none">
              {hero?.title || 'Paluto'}
            </h1>
          </div>

          <div className="max-w-2xl">
            <p className="text-white text-lg md:text-2xl font-bold drop-shadow-xl font-poppins">
              {hero?.description || 'Seafood Grill and Restaurant'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="bg-white pt-20 pb-10 px-6 md:px-10 border-l-[5px] border-cyan-400 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-black leading-[1.1] font-poppins">
              {overview?.title ? (
                overview.title.split(/(\bToday\b|\bTomorrow\b)/g).map((part, i) => {
                  if (part === 'Today' || part === 'Tomorrow') {
                    return (
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
                <p className="text-gray-500 text-base md:text-lg leading-relaxed font-poppins font-medium">
                  Paluto Seafood & Grill Restaurant is a seafood destination in Iloilo.
                </p>
              )}
            </div>

            <div className="w-full bg-linear-to-r from-paluto-red to-paluto-yellow/50 rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-md">
              <span className="text-base md:text-lg font-bold uppercase tracking-tight font-poppins text-white drop-shadow-sm">
                Explore Paluto Facebook Page
              </span>
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

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] border-[10px] border-white">
              {overview?.image?.url ? (
                <Image
                  src={normalizeUrl(overview.image.url)}
                  alt={overview.image.alternativeText || 'Overview Image'}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/images/paluto/showcase 4.jpg"
                  alt="Overview Image"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAVORITES SHOWCASE */}
      <FavoritesShowcase data={data.showcase} logo={data.showcaseLogo} />

      {/* 4. MID BANNER */}
      <section className="relative w-full overflow-hidden min-h-[400px] flex items-center justify-center">
        {midBanner?.image?.url ? (
          <Image
            src={normalizeUrl(midBanner.image.url)}
            alt={midBanner.image.alternativeText || 'Paluto Banner'}
            fill
            className="object-cover -z-10"
          />
        ) : (
          <Image
            src="/images/paluto/paluto-cover.png"
            alt="Paluto Banner"
            fill
            className="object-cover -z-10"
          />
        )}
        
        {/* Banner Content */}
        {(midBanner?.title || midBanner?.logo) && (
          <div className="relative z-10 text-center px-6 max-w-4xl">
            {midBanner.logo?.url && (
              <Image 
                src={normalizeUrl(midBanner.logo.url)} 
                alt="Banner Logo" 
                width={150} 
                height={150} 
                className="mx-auto mb-6"
              />
            )}
            {midBanner.title && (
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                {midBanner.title}
              </h2>
            )}
            {midBanner.description && (
              <p className="text-white/90 text-lg md:text-xl font-medium mb-8">
                {midBanner.description}
              </p>
            )}
            {midBanner.cta && midBanner.cta.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {midBanner.cta.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="bg-paluto-red hover:bg-paluto-red/80 text-white px-8 py-3 rounded-full font-bold uppercase transition-all"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5. BRANCHES SECTION */}
      <section className="bg-white pb-6">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-4xl font-black uppercase italic text-black tracking-tighter">
              OUR <span className="text-paluto-red">BRANCHES</span>
            </h2>
            <div className="w-20 h-1 bg-paluto-yellow mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches && branches.length > 0 ? (
              branches.map((branch) => (
                <div
                  key={branch.id}
                  className="group bg-white rounded-[1.5rem] border-2 border-gray-100 overflow-hidden hover:border-paluto-red transition-all duration-500 shadow-sm hover:shadow-xl"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    {branch.image?.url && (
                      <Image
                        src={normalizeUrl(branch.image.url)}
                        alt={branch.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

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
        carouselImages={sortedEventsImages} 
      />

      {/* 7. FEEDBACK SECTION */}
      <Feedback data={data.feedback} />

      {/* 8. CONTACT US SECTION */}
      <section className="w-full bg-white pb-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-qgc-gray-soft rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 p-12">
            {contactUs?.details?.[0] && (
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-4 rounded-full border-2 border-black">
                  <MapPinIcon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold uppercase text-black">{contactUs.details[0].title}</h3>
                <p className="text-gray-700 text-sm max-w-[220px] leading-snug">
                  {contactUs.details[0].description}
                </p>
              </div>
            )}

            {contactUs?.details?.[1] && (
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-4 rounded-full border-2 border-black">
                  <EnvelopeIcon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold uppercase text-black">{contactUs.details[1].title}</h3>
                <p className="text-gray-700 text-sm break-all">{contactUs.details[1].description}</p>
              </div>
            )}

            {contactUs?.details?.[2] && (
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-4 rounded-full border-2 border-black">
                  <PhoneIcon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold uppercase text-black">{contactUs.details[2].title}</h3>
                <p className="text-gray-700 text-sm font-bold">{contactUs.details[2].description}</p>
              </div>
            )}

            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-4 rounded-full border-2 border-black">
                <ShareIcon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold uppercase text-black">Socials:</h3>
              <div className="flex gap-3 mt-1">
                {contactUs?.embedLinks?.map((social, idx) => (
                  <a
                    key={`${social.title}-${social.href || idx}`}
                    href={social.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:scale-110 transition-transform"
                    title={social.title}
                  >
                    {social.title.toLowerCase().includes('facebook') ? (
                      <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    ) : (
                      <span className="text-xs font-bold">{social.title}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[450px] lg:h-auto min-h-[500px]">
            {contactUs?.embedMap?.href ? (
              <iframe
                src={contactUs.embedMap.href}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Paluto Location Map"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
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
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
