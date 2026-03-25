import { getBrightlinePage } from '@cms/services';
import type { BrightlinePageData, StrapiCard, StrapiFaq, StrapiLink } from '@cms/types';
import {
  ArrowRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import Image from 'next/image';
import { after } from 'next/server';
import DeliverySection from '@/components/brightline/DeliverySection.client';
import ScrollReveal from '@/components/ScrollReveal.client';
import FAQItem from '@/components/ui/FAQItem.client';
import { logger } from '@/lib/axiom/server';

/* =========================================================
   METADATA GENERATION
========================================================= */

export async function generateMetadata(): Promise<Metadata> {
  const pageData = (await getBrightlinePage()) as BrightlinePageData;
  const heroData = pageData?.heroSection?.[0];

  return {
    title: heroData?.title || 'Brightline Trucking',
    description:
      heroData?.description ||
      'A service company engaged in hauling general cargo, offices & warehouses.',
  };
}

/**
 * Brightline Trucking Subsidiary Page
 */
export default async function BrightlinePage() {
  const data = (await getBrightlinePage()) as BrightlinePageData;

  // Axiom Logging for observability
  logger.info('Brightline Trucking subsidiary page visited');
  after(() => {
    logger.flush();
  });

  if (!data) {
    return (
      <main className="w-full min-h-screen bg-qgc-white flex items-center justify-center">
        <p className="text-gray-500 font-poppins">No content available for Brightline Trucking.</p>
      </main>
    );
  }

  const { heroSection: heroList, aboutUs, features, delivery, banner, contactUs, faqs } = data;

  // Logic for specific section picking
  const hero = heroList?.[0];

  const getImageUrl = (url?: string) => {
    if (!url) {
      return '';
    }
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <main className="w-full min-h-screen bg-qgc-white">
      {/* 1. HERO SECTION */}
      <ScrollReveal>
        <section className="relative w-full h-screen flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={getImageUrl(hero?.image?.url)}
              alt={hero?.image?.alternativeText || 'Brightline Trucking Hero Background'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="absolute top-10 md:top-20 left-0 md:left-2 z-20">
            <Image
              src={getImageUrl(hero?.logo?.image?.url)}
              alt={hero?.logo?.name || 'Brightline Trucking Logo'}
              width={250}
              height={250}
              className="object-contain brightness-0 invert"
            />
          </div>

          <div className="relative z-10 pl-8 md:pl-16 pb-10 space-y-2">
            {hero?.title && (
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-10 py-1 w-fit shadow-2xl border border-white/50">
                <h1 className="text-[#ff6600] text-2xl md:text-3xl font-bold font-poppins uppercase tracking-tighter leading-none">
                  {hero.title}
                </h1>
              </div>
            )}
            {hero?.description && (
              <div className="max-w-3xl">
                <p className="text-white text-lg md:text-3xl font-bold drop-shadow-xl font-poppins">
                  {hero.description}
                </p>
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* 2. ABOUT US SECTION */}
      <ScrollReveal>
        <section className="bg-qgc-gray-soft px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 md:h-screen overflow-hidden py-16 md:py-10">
          <h1 className="md:hidden text-xl font-black text-qgc-black uppercase font-poppins tracking-tight leading-tight w-full text-start">
            {aboutUs?.title || 'Efficient Hauling Solutions for Every Business.'}
          </h1>

          <div className="order-3 md:order-1 flex items-start justify-center flex-col w-full md:w-[55%] gap-6 h-full max-w-4xl">
            <div className="space-y-4 text-start">
              <h1 className="hidden md:block text-xl md:text-xl lg:text-2xl xl:text-4xl font-black text-qgc-black uppercase font-poppins tracking-tight leading-tight">
                {aboutUs?.title || 'Efficient Hauling Solutions for Every Business.'}
              </h1>
              <p className="text-gray-600 text-base md:text-lg lg:text-base leading-relaxed text-left font-poppins line-clamp-4 lg:line-clamp-6">
                {aboutUs?.description ||
                  'Brightline Trucking provides reliable cargo transportation and logistics services, ensuring your goods reach their destination safely and on time.'}
              </p>
            </div>
            {aboutUs?.cta && (
              <ScrollReveal>
                <div className="w-full bg-[#ff6600] rounded-2xl p-2 md:p-6 lg:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight font-poppins text-white drop-shadow-sm text-center sm:text-left leading-tight">
                    Connect with Brightline Trucking
                  </span>
                  <a
                    href={aboutUs.cta.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-qgc-gray-deep hover:text-qgc-white text-qgc-black px-5 py-3 lg:px-6 lg:py-4 rounded-2xl shadow-sm flex items-center gap-2 transition-all duration-300 active:scale-95 whitespace-nowrap"
                  >
                    <span className="font-bold uppercase text-[10px] md:text-xs lg:text-sm">
                      {aboutUs.cta.title || 'Visit Facebook Page'}
                    </span>
                    <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </a>
                </div>
              </ScrollReveal>
            )}
          </div>

          <div className="order-2 md:order-2 w-full md:w-[40%] flex justify-center items-center h-100 md:h-[80%] lg:h-[85%] relative rounded-4xl overflow-hidden shadow-2xl">
            <Image
              src={getImageUrl(aboutUs?.image?.url)}
              alt={aboutUs?.image?.alternativeText || 'About Brightline Trucking'}
              fill
              className="object-cover"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* 3. SERVICES SECTION */}
      {delivery && delivery.length > 0 && (
        <ScrollReveal>
          <section className="bg-qgc-white py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-start md:text-center lg:text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black uppercase font-poppins tracking-tight text-qgc-black">
                  Delivering the Best Custom
                  <span className="block text-[#ff6600]">Trucking Experience</span>
                </h2>
              </div>

              {/* Services Grid (Using delivery data) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {delivery.map((loc: StrapiCard) => (
                  <div
                    key={loc.id}
                    className="group flex flex-col items-center p-10 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-50 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  >
                    {/* Icon */}
                    <div className="mb-8 p-4 bg-orange-50 rounded-2xl group-hover:bg-[#ff6600] transition-colors duration-300 flex items-center justify-center w-24 h-24 overflow-hidden">
                      {loc.icon?.[0]?.url ? (
                        <Image
                          src={getImageUrl(loc.icon[0].url)}
                          alt={loc.icon[0].alternativeText || loc.title || 'Delivery Icon'}
                          width={64}
                          height={64}
                          className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                        />
                      ) : (
                        <svg
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          className="fill-[#ff6600] group-hover:fill-white transition-colors duration-300"
                        >
                          <title>Delivery Icon</title>
                          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        </svg>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl xl:text-2xl font-black text-qgc-black uppercase font-poppins leading-tight mb-5 whitespace-pre-line">
                      {loc.title}
                    </h3>

                    {/* Description (if available in delivery data) */}
                    {loc.description && (
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed font-poppins">
                        {loc.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* 4. WHERE WE DELIVER SECTION */}
      {features && features.length > 0 && (
        <ScrollReveal>
          <section className="bg-qgc-gray-soft py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-4xl italic md:text-5xl font-black uppercase font-poppins tracking-tighter text-qgc-black">
                  WHERE WE <span className="text-[#ff6600]">DELIVER</span>
                </h2>
                <div className="w-24 h-1.5 bg-qgc-black mt-2" />
              </div>
              <DeliverySection features={features} />
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* 5. BRAND BANNER SECTION */}
      <ScrollReveal>
        <section className="relative w-full h-75 md:h-125 overflow-hidden">
          <Image
            src={getImageUrl(banner?.image?.url)}
            alt={banner?.image?.alternativeText || 'Brightline Banner Background'}
            fill
            className="object-cover"
          />
          {/* Darker Overlay to match the brown-ish aesthetic of your screenshot */}
          <div className="absolute inset-0 bg-orange-950/60 backdrop-brightness-75" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-4xl md:text-7xl font-black uppercase font-poppins tracking-tighter">
              {banner?.title || 'BRIGHTLINE'}
            </h2>
            {banner?.description && (
              <p className="text-white/90 text-lg md:text-2xl font-medium drop-shadow-md font-poppins max-w-2xl mt-2">
                {banner.description}
              </p>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* 6. CONTACT & GOOGLE MAPS SECTION */}
      {contactUs && (
        <ScrollReveal>
          <section className="bg-white py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase italic text-black tracking-tighter text-center">
                  Contact <span className="text-[#ff6600]">Brightline</span>
                </h2>
                <div className="w-24 h-1.5 bg-qgc-black mt-2" />
              </div>

              <div className="flex flex-col lg:flex-row items-stretch bg-[#E5E5E5] rounded-xl overflow-hidden shadow-lg">
                <div className="w-full lg:w-1/2 grid grid-cols-2 lg:grid-cols-2 gap-y-12 gap-x-4 p-6 md:p-12">
                  {contactUs.details?.[0] && (
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-4 rounded-full border-2 border-black">
                        <MapPinIcon className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-xl font-bold uppercase text-black">
                        {contactUs.details[0].title || 'Address:'}
                      </h3>
                      <p className="text-gray-700 text-sm max-w-55 leading-snug">
                        {contactUs.details[0].description}
                      </p>
                    </div>
                  )}

                  {contactUs.details?.[1] && (
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-4 rounded-full border-2 border-black">
                        <EnvelopeIcon className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-xl font-bold uppercase text-black">
                        {contactUs.details[1].title || 'Email:'}
                      </h3>
                      <p className="text-gray-700 text-sm break-all">
                        {contactUs.details[1].description}
                      </p>
                    </div>
                  )}

                  {contactUs.details?.[2] && (
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-4 rounded-full border-2 border-black">
                        <PhoneIcon className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-xl font-bold uppercase text-black">
                        {contactUs.details[2].title || 'Call Us:'}
                      </h3>
                      <p className="text-gray-700 text-sm font-bold">
                        {contactUs.details[2].description}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-4 rounded-full border-2 border-black">
                      <ShareIcon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold uppercase text-black">Socials:</h3>
                    <div className="flex gap-3 mt-1">
                      {contactUs.embedLinks?.map((social: StrapiLink, idx: number) => (
                        <a
                          key={`${social.title}-${social.href || idx}`}
                          href={social.href || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:scale-110 transition-transform"
                          title={social.title || 'Social Link'}
                        >
                          {social.title?.toLowerCase().includes('facebook') ? (
                            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24" role="img">
                              <title>Facebook</title>
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                          ) : social.title?.toLowerCase().includes('instagram') ? (
                            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24" role="img">
                              <title>Instagram</title>
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                          ) : social.title?.toLowerCase().includes('youtube') ? (
                            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24" role="img">
                              <title>YouTube</title>
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          ) : social.title?.toLowerCase().includes('tiktok') ? (
                            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24" role="img">
                              <title>TikTok</title>
                              <path d="M12.525.02c1.31.036 2.584.37 3.75 1.017.037.033.016.061-.015.072-1.35.46-2.423 1.408-3.062 2.69-.58 1.15-.71 2.362-.71 3.634v10.162c0 2.11-.496 3.858-1.978 5.13-1.547 1.323-3.391 1.627-5.23 1.308-2.156-.37-3.56-1.715-4.335-3.903-.706-1.987-.44-4.688 1.63-5.873.862-.493 1.797-.758 2.79-.756.215 0 .415.044.613.091.039.01.05.027.05.068v3.113c-.198-.083-.4-.132-.619-.135-1.142-.01-2.083.836-2.13 1.972-.03.733.247 1.475.817 1.969.64.554 1.417.6 2.23.35.85-.261 1.338-.934 1.338-1.81V.422c.005-.131.046-.172.179-.172h3.84c.034 0 .052.02.05.054a.223.223 0 0 1-.01.04c-.011.03-.028.05-.05.076z" />
                            </svg>
                          ) : social.title?.toLowerCase().includes('linktree') ? (
                            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24" role="img">
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

                <div className="w-full lg:w-1/2 h-112.5 lg:h-auto min-h-100">
                  {contactUs.embedMap?.href ? (
                    <iframe
                      src={contactUs.embedMap.href}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Brightline Trucking Location"
                    />
                  ) : (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1632.231024757796!2d122.59254323340565!3d10.75947246870939!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee5bb488af5ad%3A0x9e517c36dbc70075!2sBuildmaster%20PH!5e0!3m2!1sen!2sph!4v1774406376578!5m2!1sen!2sph"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Brightline Trucking Location"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* 7. FAQ SECTION */}
      {faqs && faqs.length > 0 && (
        <ScrollReveal>
          <section className="bg-qgc-gray-soft px-6 py-24">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase italic text-black tracking-tighter text-center">
                  FREQUENTLY ASKED <span className="text-[#ff6600]">QUESTIONS</span>
                </h2>
                <div className="w-20 h-1 bg-qgc-black mt-2" />
              </div>
              <div className="space-y-4">
                {faqs.map((faq: StrapiFaq) => (
                  <FAQItem key={faq.id} question={faq.question || ''} answer={faq.answer || ''} />
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}
    </main>
  );
}
