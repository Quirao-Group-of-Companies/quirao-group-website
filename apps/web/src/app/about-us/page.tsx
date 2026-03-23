import { getAboutUsPage } from '@cms/services';
import type { AboutUsPageData, StrapiCard } from '@cms/types';
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
  logger.info('Company structure section rendered from CMS');
  after(() => {
    logger.flush();
  });

  // Destructure content directly from the generated AboutUsPageData type
  const hero = data?.heroSection;
  const aboutUs = data?.aboutUs;
  const missionVision = data?.missionVision;
  const missionVisionImage = data?.missionVisionImage;
  const groupStructure = data?.groupStructureBanner;

  const normalizeUrl = (url?: string) => {
    if (!url) {
      return '';
    }
    // Handle double slashes after the domain origin
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  // Helper to get mission/vision/core-values by title or index
  const getMVItem = (title: string, index: number): StrapiCard | undefined => {
    if (!missionVision) return undefined;
    return (
      missionVision.find((item) => item.title?.toUpperCase() === title.toUpperCase()) ||
      missionVision[index]
    );
  };

  const mission = getMVItem('MISSION', 0);
  const vision = getMVItem('VISION', 1);
  const coreValues = getMVItem('CORE VALUES', 2);

  return (
    <main className="w-full pt-16 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[100vh] flex flex-col items-center justify-center overflow-hidden">
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

      {/* 3. MISSION VISION SECTION */}
      {(mission || vision || coreValues || missionVisionImage) && (
        <section className="relative w-full py-12 px-6 md:px-[120px] overflow-hidden min-h-[600px] flex flex-col justify-center">
          {/* Background with Overlays */}
          <div className="absolute inset-0 z-0">
            {missionVisionImage?.url && (
              <Image
                src={normalizeUrl(missionVisionImage.url)}
                alt={missionVisionImage.alternativeText || 'Mission and Vision Background'}
                fill
                className="object-cover"
              />
            )}
            <div
              className="absolute inset-0 z-10"
              style={{ backgroundColor: 'rgba(43, 46, 51, 0.5)' }}
            />
            <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-[#2b2e33] to-transparent z-15" />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-[#2b2e33] to-transparent z-15" />
          </div>

          <div className="relative z-20 w-full flex flex-col gap-[12px]">
            {/* MISSION */}
            {mission && (
              <div className="flex flex-col items-start text-left">
                <ScrollReveal>
                  <h2 className="text-[48px] font-light text-white uppercase font-akrux mb-[24px]">
                    {mission.title}
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-[24px] text-white font-poppins max-w-[882px] leading-relaxed">
                    {mission.description}
                  </p>
                </ScrollReveal>
              </div>
            )}

            {/* VISION */}
            {vision && (
              <div className="flex flex-col items-end text-right w-full">
                <ScrollReveal>
                  <h2 className="text-[48px] font-light text-white uppercase font-akrux mb-[24px]">
                    {vision.title}
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.2} width="100%">
                  <div className="flex flex-col items-end w-full">
                    <p className="text-[24px] text-white font-poppins max-w-[882px] leading-relaxed">
                      {vision.description}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* CORE VALUES */}
            {coreValues && (
              <div className="flex flex-col items-start text-left">
                <ScrollReveal>
                  <h2 className="text-[48px] font-light text-white uppercase font-akrux mb-[24px]">
                    {coreValues.title}
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-[24px] text-white font-poppins max-w-[882px] leading-relaxed">
                    {coreValues.description}
                  </p>
                </ScrollReveal>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. COMPANY STRUCTURE SECTION */}
      {groupStructure && (
        <section className="bg-qgc-gray-soft pt-[48px] pb-[48px] px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              {groupStructure.title && (
                <div className="text-center mb-[24px]">
                  <h2 className="text-[48px] font-black text-black font-akrux tracking-tighter">
                    {groupStructure.title}
                  </h2>
                </div>
              )}

              {/* Image Container */}
              {groupStructure.image?.url && (
                <div className="overflow-x-auto px-4 flex justify-center">
                  <div className="min-w-[826px] w-[826px] h-[465px] relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                    <Image
                      src={normalizeUrl(groupStructure.image.url)}
                      alt={
                        groupStructure.image.alternativeText ||
                        'Quirao Group of Companies Organizational Chart'
                      }
                      width={826}
                      height={465}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>
      )}
    </main>
  );
}
