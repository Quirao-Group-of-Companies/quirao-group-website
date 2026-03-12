import {
  ArrowRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import type { SariSariManokanPageData, StrapiCards, StrapiFaqs, StrapiFeedback } from 'cms/types';
import Image from 'next/image';
import { after } from 'next/server';
import FavoritesShowcase from '@/components/FavoritesShowcase';
import FeedbackSection from '@/components/FeedbackSection';
import ScrollReveal from '@/components/ScrollReveal';
import FAQItem from '@/components/ui/FAQItem';
import { logger } from '@/lib/axiom/server';
import { getSariSariManokanPage } from '@/lib/services/strapi-sarisari';

/**
 * Sari-Sari Manokan Subsidiary Page
 */
export default async function ManokanPage() {
  // Axiom Logging for observability
  logger.info('Sari-Sari Manokan subsidiary page visited');
  after(() => {
    logger.flush();
  });

  const pageData: SariSariManokanPageData | null = await getSariSariManokanPage();

  if (!pageData) {
    return <p>No content available</p>;
  }

  const faqsData = pageData.faqs || [];

  const STRAPI_URL = (process.env.STRAPI_URL?.trim() || 'http://127.0.0.1:1337').replace(/\/$/, '');

  const getImageUrl = (imagePath: string | undefined, fallback: string) => {
    if (!imagePath) {
      return fallback;
    }
    const cleanPath = imagePath.replace(/([^:])\/+/g, '$1/');
    if (cleanPath.startsWith('http')) {
      return cleanPath;
    }
    return `${STRAPI_URL}${cleanPath}`;
  };

  // Extract the first hero section from the repeatable component
  const heroData = pageData.hero?.[0];
  const heroImage = getImageUrl(
    heroData?.image?.url,
    '/images/home-page/business-preview/paluto-business-preview.jpg',
  );
  const logoImage = getImageUrl(
    heroData?.logo?.image?.url,
    '/images/logo/manokan/sari-sari-manokan-logo-word.png',
  );
  const heroTitle = heroData?.title || 'Sari-Sari Manokan';
  const heroDescription = heroData?.description || 'Sari-sari Manokan and Seafood Restaurant';

  // Extract About Us data from CMS
  const aboutUsData = pageData.aboutUs;
  const aboutUsTitle =
    aboutUsData?.title || 'Iloilo’s Destination for Premium Seafood & Celebrations.';
  const aboutUsDescription =
    aboutUsData?.description ||
    'Sari-sari Manokan and Seafood Restaurant is a seafood destination in Iloilo, known for fresh seafood and celebration-ready ambiance.';
  const aboutUsImage = getImageUrl(
    aboutUsData?.image?.url,
    '/images/home-page/business-preview/paluto-business-preview.jpg',
  );

  // Process Showcase items
  const showcaseData =
    pageData.Showcase?.map((item: StrapiCards) => ({
      id: item.id,
      label: item.title || '',
      src: getImageUrl(item.image?.url, '/images/manokan/BN-GPAA.png'),
    })) || [];

  // Process Feedback items
  const feedbackData =
    pageData.feedback?.map((item: StrapiFeedback) => ({
      id: item.id,
      name: item.text?.title || 'Anonymous',
      comment: item.text?.description || '',
      image: getImageUrl(item.image?.url, '/images/home-page/blogs/blog1.jpg'),
      rating: item.stars || 5,
    })) || [];

  return (
    <main className="w-full min-h-screen bg-qgc-white">
      {/* 1. HERO SECTION */}
      <ScrollReveal>
        <section className="relative w-full h-screen flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={heroData?.image?.alternativeText || 'Sari-Sari Manokan Hero Background'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="absolute top-30 left-8 md:left-16 z-20">
            <Image
              src={logoImage}
              alt={heroData?.logo?.logoName || 'sari sari manokan logo'}
              width={250}
              height={250}
              className="object-contain"
            />
          </div>

          <div className="relative z-10 pl-8 md:pl-16 pb-10 space-y-2">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl px-10 py-1 w-fit shadow-2xl border border-white/50">
              <h1 className="text-sari-manokan-green text-2xl md:text-3xl font-bold font-poppins uppercase tracking-tighter leading-none">
                {heroTitle}
              </h1>
            </div>{' '}
            <div className="max-w-3xl">
              <p className="text-white text-lg md:text-3xl font-bold drop-shadow-xl font-poppins">
                {heroDescription}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 2. ABOUT US SECTION */}
      <ScrollReveal>
        <section className="bg-qgc-gray-soft px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 md:h-screen overflow-hidden py-16 md:py-10">
          {/* Mobile Title */}
          <h1 className="md:hidden text-xl font-black text-qgc-black uppercase font-poppins tracking-tight leading-tight w-full text-start">
            {aboutUsTitle}
          </h1>

          <div className="order-3 md:order-1 flex items-start justify-center flex-col w-full md:w-[55%] gap-6 h-full max-w-4xl">
            <div className="space-y-4 text-start">
              <h1 className="hidden md:block text-xl md:text-xl lg:text-2xl xl:text-4xl font-black text-qgc-black uppercase font-poppins tracking-tight leading-tight">
                {aboutUsTitle}
              </h1>
              <p className="text-gray-600 text-base md:text-lg lg:text-base leading-relaxed text-left font-poppins line-clamp-4 lg:line-clamp-6">
                {aboutUsDescription}
              </p>
            </div>

            <div className="w-full bg-linear-to-r from-paluto-green to-paluto-yellow/50 rounded-4xl p-5 md:p-6 lg:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <span className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight font-poppins text-white drop-shadow-sm text-center sm:text-left leading-tight">
                Explore Sari-sari Manokan Facebook Page
              </span>
              <a
                href="https://www.facebook.com/palutophilippines"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-qgc-gray-deep hover:text-qgc-white text-qgc-black px-5 py-3 lg:px-6 lg:py-4 rounded-2xl shadow-sm flex items-center gap-2 transition-all duration-300 active:scale-95 whitespace-nowrap"
              >
                <span className="font-bold uppercase text-[10px] md:text-xs lg:text-sm">
                  Visit Facebook Page
                </span>
                <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>

          <div className="order-2 md:order-2 w-full md:w-[40%] flex justify-center items-center h-100 md:h-[80%] lg:h-[85%] relative rounded-4xl overflow-hidden shadow-2xl">
            <Image
              src={aboutUsImage}
              alt={aboutUsData?.image?.alternativeText || 'About Sari-Sari Manokan'}
              fill
              className="object-cover"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* 3. FAVORITES SHOWCASE */}
      <ScrollReveal>
        <FavoritesShowcase
          dishes={showcaseData}
          logo={{
            src: logoImage,
            alt: 'Sari-Sari Manokan Logo',
          }}
          activeColorClass="bg-paluto-green"
          indicatorColorClass="bg-paluto-green/40"
          dividerColorClass="bg-paluto-green/10"
          buttonWidthClass="md:w-80"
        />
      </ScrollReveal>

      {/* 4. FEEDBACK SECTION */}
      <ScrollReveal>
        <FeedbackSection feedbacks={feedbackData} />
      </ScrollReveal>

      {/* 5. CONTACT & GOOGLE MAPS SECTION */}
      <ScrollReveal>
        <section className="bg-white py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-black tracking-tighter text-center">
                Contact <span className="text-paluto-green">Sari-sari Manokan</span>
              </h2>
              <div className="w-24 h-1.5 bg-paluto-yellow mt-2" />
            </div>

            <div className="flex flex-col lg:flex-row items-stretch bg-[#E5E5E5] rounded-xl overflow-hidden shadow-lg">
              <div className="w-full lg:w-1/2 grid grid-cols-2 lg:grid-cols-2 gap-y-12 gap-x-4 p-6 md:p-12">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <MapPinIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Address:</h3>
                  <p className="text-gray-700 text-sm max-w-55 leading-snug">
                    Coastal Road Brgy. Bito-on, Jaro, Iloilo City, Philippines, 5000
                  </p>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <EnvelopeIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Email:</h3>
                  <p className="text-gray-700 text-sm break-all">management@quiraogroup.com</p>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <PhoneIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Call Us:</h3>
                  <p className="text-gray-700 text-sm font-bold">0927 847 7110</p>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <ShareIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Socials:</h3>
                  <div className="flex gap-3 mt-1">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <svg
                        className="w-6 h-6 fill-black"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Facebook"
                      >
                        <title>Facebook</title>
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <svg
                        className="w-6 h-6 fill-black"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Instagram"
                      >
                        <title>Instagram</title>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-112.5 lg:h-auto min-h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2264.308734117296!2d122.59259123058459!3d10.758815803751753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee5cc2c4cd41b%3A0x5227806edabd0f50!2sSari-Sari%20Manokan!5e0!3m2!1sen!2sph!4v1772765274696!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sari-Sari Manokan Location"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 6. FAQ SECTION */}
      <ScrollReveal>
        <section className="bg-qgc-gray-soft px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-black tracking-tighter text-center">
                FREQUENTLY ASKED <span className="text-paluto-green">QUESTIONS</span>
              </h2>
              <div className="w-24 h-1.5 bg-paluto-yellow mt-2" />
            </div>
            <div className="space-y-4">
              {faqsData.map((faq: StrapiFaqs) => (
                <FAQItem key={faq.id} question={faq.question || ''} answer={faq.answer || ''} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
