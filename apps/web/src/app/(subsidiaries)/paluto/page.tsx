import { getPalutoPage } from '@cms/services';
import type { PalutoPageData, StrapiCard, StrapiFaq, StrapiLink } from '@cms/types';
import { EnvelopeIcon, MapPinIcon, PhoneIcon, ShareIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import Image from 'next/image';
import { after } from 'next/server';
import EventsCatering from '@/components/paluto/EventsCatering.client';
import FavoritesShowcase from '@/components/paluto/FavoritesShowcase.client';
import FeedbackCard from '@/components/paluto/FeedbackCard.client';
import OverviewCTA from '@/components/paluto/OverviewCTA.client';
import ScrollReveal from '@/components/paluto/ScrollReveal.client';
import FAQItem from '@/components/ui/FAQItem.client';
import { logger } from '@/lib/axiom/server';

export async function generateMetadata(): Promise<Metadata> {
  const data = (await getPalutoPage()) as PalutoPageData;
  const hero = data?.heroSection?.[0];

  return {
    title: hero?.title || 'Paluto Seafood & Grill',
    description: hero?.description || 'Iloilos first and Only Unli-Paluto Dining experience',
  };
}

/**
 * Paluto Subsidiary Page
 */
export default async function PalutoPage() {
  const data = (await getPalutoPage()) as PalutoPageData;

  // Axiom Logging for observability
  logger.info('Paluto subsidiary page visited');
  after(() => {
    logger.flush();
  });

  // Destructure directly from the generated PalutoPageData type
  const {
    heroSection: heroList,
    aboutUs,
    bannerHighlight,
    branchesCards,
    contactUs,
    faqs,
    eventsAndCatering,
    eventsAndCateringImages,
    showcase,
    showcaseLogo,
    feedback,
  } = data;

  // Logic for specific section picking
  const hero = heroList?.[0];
  const overview = aboutUs || heroList?.[1];

  // Use carousel images directly from CMS without sorting
  const carouselImages = eventsAndCateringImages ?? [];

  const normalizeUrl = (url?: string) => {
    if (!url) {
      return '';
    }
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <main className="w-full pt-16 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {hero?.image?.url ? (
            <Image
              src={normalizeUrl(hero.image.url)}
              alt={hero.image.alternativeText || 'Paluto Hero Background'}
              fill
              className="object-cover object-top"
              priority
            />
          ) : (
            <Image
              src="/images/home-page/business-preview/paluto-business-preview.jpg"
              alt="Paluto Hero Background"
              fill
              className="object-cover object-top"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="absolute top-8 left-10 md:left-20 z-20">
          {hero?.logo?.image?.url ? (
            <Image
              src={normalizeUrl(hero.logo.image.url)}
              alt={hero.logo.name || 'Paluto Logo'}
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

        <div className="relative z-10 pl-14 md:pl-28 pb-32 space-y-1.5">
          {hero?.title && (
            <div className="bg-white/95 backdrop-blur-md rounded-4xl px-8 py-1 w-fit shadow-2xl border border-white/50">
              <h1 className="text-paluto-red text-4xl md:text-2xl font-bold font-poppins uppercase tracking-tighter leading-none">
                {hero.title}
              </h1>
            </div>
          )}
          {hero?.description && (
            <div className="max-w-2xl">
              <p className="text-white text-lg md:text-2xl font-bold drop-shadow-xl font-poppins">
                {hero.description}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="bg-white py-12 px-6 md:px-10 border-l-[5px] border-cyan-400 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-10 items-center">
          {/* 1. TITLE (Order 1 Mobile, Column 7 Row 1 Desktop) */}
          <div className="order-1 lg:col-span-7 lg:row-start-1">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-black text-black leading-[1.1] font-poppins">
                {overview?.title ? (
                  (() => {
                    const words = overview.title.trim().split(/\s+/);
                    if (words.length === 0) {
                      return null;
                    }
                    if (words.length === 1) {
                      return <span className="text-paluto-red">{words[0]}</span>;
                    }
                    const first = words[0];
                    const last = words[words.length - 1];
                    const middle = words.slice(1, -1).join(' ');
                    return (
                      <>
                        <span className="text-paluto-red">{first}</span>
                        {middle ? ` ${middle} ` : ' '}
                        <span className="text-paluto-red">{last}</span>
                      </>
                    );
                  })()
                ) : (
                  <>
                    Excellent Seafood <span className="text-paluto-red">Today</span>, <br />A
                    Lasting Tradition <span className="text-paluto-red">Tomorrow</span>.
                  </>
                )}
              </h2>
            </ScrollReveal>
          </div>

          {/* 2. PICTURE (Order 2 Mobile, Column 5 Span Row 3 Desktop) */}
          <div className="order-2 lg:col-span-5 lg:row-span-3 lg:col-start-8 lg:row-start-1 flex justify-center lg:justify-end">
            <ScrollReveal delay={0.3}>
              <div className="relative w-64 h-64 md:w-95 md:h-95 rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] border-10 border-white mx-auto lg:mx-0">
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
            </ScrollReveal>
          </div>

          {/* 3. DESCRIPTION (Order 3 Mobile, Column 7 Row 2 Desktop) */}
          <div className="order-3 lg:col-span-7 lg:row-start-2">
            <ScrollReveal delay={0.2}>
              <div className="space-y-5">
                {overview?.description ? (
                  overview.description.split('\n\n').map((para: string) => (
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
            </ScrollReveal>
          </div>

          {/* 4. CTA (Order 4 Mobile, Column 7 Row 3 Desktop) */}
          <div className="order-4 lg:col-span-7 lg:row-start-3">
            <ScrollReveal delay={0.4}>
              <OverviewCTA
                href={overview?.cta?.href || 'https://www.facebook.com/palutophilippines'}
                title={overview?.cta?.title || 'Visit Facebook Page'}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. FAVORITES SHOWCASE */}
      <FavoritesShowcase data={showcase} logo={showcaseLogo} />

      {/* 4. MID BANNER */}
      <section className="relative w-full overflow-hidden flex items-center justify-center">
        {bannerHighlight?.image?.url ? (
          <div className="w-full h-full relative">
            <Image
              src={normalizeUrl(bannerHighlight.image.url)}
              alt={bannerHighlight.image.alternativeText || 'Paluto Banner'}
              width={bannerHighlight.image.width || 1920}
              height={bannerHighlight.image.height || 600}
              className="w-full h-auto md:h-100 md:object-cover object-center"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-62.5 md:h-100 relative">
            <Image
              src="/images/paluto/paluto-cover.png"
              alt="Paluto Banner"
              fill
              className="object-cover object-center"
            />
          </div>
        )}

        {(bannerHighlight?.title || bannerHighlight?.description) && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <ScrollReveal>
              <div className="text-center px-6 max-w-4xl">
                {bannerHighlight.title && (
                  <h2 className="text-2xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2 md:mb-4 drop-shadow-lg">
                    {bannerHighlight.title}
                  </h2>
                )}
                {bannerHighlight.description && (
                  <p className="text-white/90 text-sm md:text-xl font-medium mb-4 md:mb-8 drop-shadow-md">
                    {bannerHighlight.description}
                  </p>
                )}
                {bannerHighlight.cta && bannerHighlight.cta.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {bannerHighlight.cta.map((link: StrapiLink) => (
                      <a
                        key={link.href}
                        href={link.href || '#'}
                        className="bg-paluto-red hover:bg-paluto-red/80 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold uppercase text-xs md:text-base transition-all shadow-lg"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        )}
      </section>

      {/* 5. BRANCHES SECTION */}
      <section className="bg-white py-12 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-4xl font-black uppercase italic text-black tracking-tighter">
                OUR <span className="text-paluto-red">BRANCHES</span>
              </h2>
              <div className="w-20 h-1 bg-paluto-yellow mt-2" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branchesCards && branchesCards.length > 0 ? (
              branchesCards.map((branchesCards: StrapiCard, index: number) => (
                <ScrollReveal key={branchesCards.id} delay={index * 0.1}>
                  <div className="group bg-white rounded-3xl border-2 border-gray-100 overflow-hidden hover:border-paluto-red transition-all duration-500 shadow-sm hover:shadow-xl">
                    <div className="relative h-60 w-full overflow-hidden">
                      {branchesCards.image?.url && (
                        <Image
                          src={normalizeUrl(branchesCards.image.url)}
                          alt={branchesCards.title || 'Paluto Branch'}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="p-8 text-center">
                      <h3 className="text-2xl font-black text-black mb-1.5 uppercase italic">
                        {branchesCards.title}
                      </h3>
                      <p className="text-gray-500 font-medium mb-6 text-sm">
                        {branchesCards.description}
                      </p>
                      {branchesCards.cta && (
                        <a
                          href={branchesCards.cta.href || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-paluto-red transition-all active:scale-95"
                        >
                          {branchesCards.cta.title}
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              <p className="text-center col-span-2 text-gray-500">No branches found.</p>
            )}
          </div>
        </div>
      </section>

      {/* 6. EVENTS & CATERING */}
      <EventsCatering sectionData={eventsAndCatering} carouselImages={carouselImages} />

      {/* 7. FEEDBACK SECTION */}
      {feedback && feedback.length > 0 && (
        <section className="bg-white py-12 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            {/* Header scaled down */}
            <ScrollReveal>
              <div className="flex flex-col items-center mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
                  OUR <span className="text-paluto-red">FEEDBACK</span>
                </h2>
                <div className="w-20 h-1 bg-paluto-yellow mt-2" />
              </div>
            </ScrollReveal>

            {/* Grid scaled down */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {feedback.map((fb, index) => (
                <FeedbackCard key={fb.id} item={fb} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CONTACT US SECTION */}
      <section className="w-full bg-white py-12 px-6 md:px-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <ScrollReveal>
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-black uppercase italic text-black tracking-tighter text-center">
                CONTACT <span className="text-paluto-red">PALUTO</span>
              </h2>
              <div className="w-20 h-1 bg-paluto-yellow mt-2" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col lg:flex-row bg-qgc-gray-soft rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              {/* Contact Details Grid: 2x2 on mobile, 2x2 on tablet, grid on desktop */}
              <div className="w-full lg:w-1/2 grid grid-cols-2 lg:grid-cols-2 gap-y-12 gap-x-4 p-6 md:p-12">
                {contactUs?.details?.[0] && (
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 md:p-4 rounded-full border-2 border-black">
                      <MapPinIcon className="w-6 h-6 md:w-8 md:h-8 text-black" />
                    </div>
                    <h3 className="text-sm md:text-xl font-bold uppercase text-black">
                      {contactUs.details[0].title}
                    </h3>
                    <p className="text-gray-700 text-[10px] md:text-sm max-w-135 md:max-w-55 leading-snug">
                      {contactUs.details[0].description}
                    </p>
                  </div>
                )}
                {contactUs?.details?.[1] && (
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 md:p-4 rounded-full border-2 border-black">
                      <EnvelopeIcon className="w-6 h-6 md:w-8 md:h-8 text-black" />
                    </div>
                    <h3 className="text-sm md:text-xl font-bold uppercase text-black">
                      {contactUs.details[1].title}
                    </h3>
                    <p className="text-gray-700 text-[10px] md:text-sm break-all max-w-35 md:max-w-none">
                      {contactUs.details[1].description}
                    </p>
                  </div>
                )}
                {contactUs?.details?.[2] && (
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 md:p-4 rounded-full border-2 border-black">
                      <PhoneIcon className="w-6 h-6 md:w-8 md:h-8 text-black" />
                    </div>
                    <h3 className="text-sm md:text-xl font-bold uppercase text-black">
                      {contactUs.details[2].title}
                    </h3>
                    <p className="text-gray-700 text-[10px] md:text-sm font-bold">
                      {contactUs.details[2].description}
                    </p>
                  </div>
                )}
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-3 md:p-4 rounded-full border-2 border-black">
                    <ShareIcon className="w-6 h-6 md:w-8 md:h-8 text-black" />
                  </div>
                  <h3 className="text-sm md:text-xl font-bold uppercase text-black">Socials:</h3>
                  <div className="flex gap-2 md:gap-3 mt-1">
                    {contactUs?.embedLinks?.map((social: StrapiLink, idx: number) => (
                      <a
                        key={`${social.title}-${social.href || idx}`}
                        href={social.href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-0.5 hover:scale-110 transition-transform"
                        title={social.title || 'Social Link'}
                      >
                        {social.title?.toLowerCase().includes('facebook') ? (
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 fill-black"
                            viewBox="0 0 24 24"
                            role="img"
                          >
                            <title>Facebook</title>
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        ) : social.title?.toLowerCase().includes('instagram') ? (
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 fill-black"
                            viewBox="0 0 24 24"
                            role="img"
                          >
                            <title>Instagram</title>
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        ) : social.title?.toLowerCase().includes('youtube') ? (
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 fill-black"
                            viewBox="0 0 24 24"
                            role="img"
                          >
                            <title>YouTube</title>
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        ) : social.title?.toLowerCase().includes('tiktok') ? (
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 fill-black"
                            viewBox="0 0 24 24"
                            role="img"
                          >
                            <title>TikTok</title>
                            <path d="M12.525.02c1.31.036 2.584.37 3.75 1.017.037.033.016.061-.015.072-1.35.46-2.423 1.408-3.062 2.69-.58 1.15-.71 2.362-.71 3.634v10.162c0 2.11-.496 3.858-1.978 5.13-1.547 1.323-3.391 1.627-5.23 1.308-2.156-.37-3.56-1.715-4.335-3.903-.706-1.987-.44-4.688 1.63-5.873.862-.493 1.797-.758 2.79-.756.215 0 .415.044.613.091.039.01.05.027.05.068v3.113c-.198-.083-.4-.132-.619-.135-1.142-.01-2.083.836-2.13 1.972-.03.733.247 1.475.817 1.969.64.554 1.417.6 2.23.35.85-.261 1.338-.934 1.338-1.81V.422c.005-.131.046-.172.179-.172h3.84c.034 0 .052.02.05.054a.223.223 0 0 1-.01.04c-.011.03-.028.05-.05.076z" />
                          </svg>
                        ) : social.title?.toLowerCase().includes('linktree') ? (
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 fill-black"
                            viewBox="0 0 24 24"
                            role="img"
                          >
                            <title>Linktree</title>
                            <path d="M21.001 11.104l-2.501-2.501-4.001 4.001v-12.604h-5v12.604l-4.001-4.001-2.501 2.501 9.001 9.001 9.001-9.001zM14.501 21.104h-5v2.5h5v-2.5z" />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold">{social.title}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 h-87.5 md:h-112.5 lg:h-auto min-h-87.5 mt-8 lg:mt-0">
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
          </ScrollReveal>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      {faqs && faqs.length > 0 && (
        <section className="bg-white py-12 px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
                  FREQUENTLY ASKED <span className="text-paluto-red">QUESTIONS</span>
                </h2>
                <div className="w-20 h-1 bg-paluto-yellow mt-2" />
              </div>
            </ScrollReveal>
            <div className="space-y-4">
              {faqs.map((faq: StrapiFaq, index: number) => (
                <ScrollReveal key={faq.id} delay={index * 0.1}>
                  <FAQItem question={faq.question || ''} answer={faq.answer || ''} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
