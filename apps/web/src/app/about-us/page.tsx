import { getAboutUsPage } from '@cms/services';
import type { AboutUsPageData } from '@cms/types';
import type { Metadata } from 'next';
import Image from 'next/image';
import { after } from 'next/server';
import ScrollReveal from '@/components/paluto/ScrollReveal.client';
import { logger } from '@/lib/axiom/server';

export async function generateMetadata(): Promise<Metadata> {
  const data = (await getAboutUsPage()) as AboutUsPageData;
  const hero = data?.heroSection;

  return {
    title: hero?.title || 'About Us | Quirao Group of Companies',
    description: hero?.description || 'Learn more about Quirao Group of Companies.',
  };
}

/**
 * About Us Page
 * Features a high-impact Hero section and informative company content.
 */
export default async function AboutUsPage() {
  const data = (await getAboutUsPage()) as AboutUsPageData;

  // Axiom Logging for observability
  logger.info('About Us page hero rendered');
  logger.info('About Us overview section rendered');
  after(() => {
    logger.flush();
  });

  // Destructure content directly from the generated AboutUsPageData type
  const hero = data?.heroSection;
  const aboutUs = data?.aboutUs;

  const normalizeUrl = (url?: string) => {
    if (!url) {
      return '';
    }
    // Handle double slashes after the domain origin
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <main className="w-full pt-16 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {hero?.image?.url ? (
            <Image
              src={normalizeUrl(hero.image.url)}
              alt={hero.image.alternativeText || 'About Us Hero Background'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <Image
              src="/images/about-us/about-us-hero.jpg"
              alt="About Us Hero Background"
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <ScrollReveal>
            <span className="block text-[24px] font-bold tracking-[0.25em] mb-4 uppercase font-akrux">
              ABOUT
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-[64px] font-black uppercase leading-tight tracking-tight drop-shadow-lg font-akrux">
              QUIRAO GROUP <br className="hidden md:block" /> OF COMPANIES
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION: Investing in Innovation and Excellence */}
      {aboutUs && (
        <section className="bg-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Content (7/12) */}
            <div className="lg:col-span-7 space-y-8">
              {aboutUs.title && (
                <ScrollReveal>
                  <h2 className="text-[48px] font-black text-black leading-[1.1] uppercase font-akrux tracking-tighter">
                    {aboutUs.title}
                  </h2>
                </ScrollReveal>
              )}

              {aboutUs.description && (
                <ScrollReveal delay={0.2}>
                  <div className="space-y-6 max-w-2xl">
                    {aboutUs.description.split('\n\n').map((para: string, i: number) => (
                      <p
                        key={`${para.substring(0, 16)}-${i}`}
                        className="text-gray-600 text-[20px] leading-relaxed font-poppins font-medium"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Right Column: Visual (5/12) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              {aboutUs.image?.url && (
                <ScrollReveal delay={0.4}>
                  <div className="relative w-full max-w-md aspect-[4/5] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                    <Image
                      src={normalizeUrl(aboutUs.image.url)}
                      alt={aboutUs.image.alternativeText || 'About Us Overview'}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
