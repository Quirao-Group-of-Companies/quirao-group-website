import type {
  HomepageData,
  StrapiCards,
  StrapiFaqs,
  StrapiHeroSection,
  StrapiSubPreview,
} from '@cms/types/strapi-components';
import Image from 'next/image';
import { blogs } from '@/app/data/homepage-data';
import HeroCarousel, { type HeroItem } from '@/components/homepage/HeroCarousel';
import LatestNews from '@/components/homepage/LatestNews';
import Button from '@/components/ui/Button';
import FAQItem from '@/components/ui/FAQItem';
import SubsidiaryShowcase, { type Business } from '@/components/ui/SubsidiaryShowcase';
import { getHomepage } from '@/lib/services/strapi-homepage';

/* =========================================================
   MAIN LANDING PAGE COMPONENT
========================================================= */

export default async function Home() {
  /* ---------- Hero State ---------- */
  const data: HomepageData | null = await getHomepage();

  if (!data) {
    return <p>No content available</p>;
  }

  const heroSlides: HeroItem[] =
    data.HeroSection?.map((item: StrapiHeroSection) => ({
      id: item.id,
      title: item.title || '',
      description: item.description || '',
      image: item.image
        ? {
            url: item.image.url,
            alternativeText: item.image.alternativeText || null,
          }
        : null,
      cta: item.cta
        ? {
            title: item.cta.title || '',
            href: item.cta.href || '#',
          }
        : null,
    })) || [];

  const aboutSection =
    data.AboutUs && data.AboutUs.length > 0
      ? {
          id: data.AboutUs[0].id,
          title: data.AboutUs[0].title || '',
          description: data.AboutUs[0].description || '',
          image: data.AboutUs[0].image
            ? {
                url: data.AboutUs[0].image.url,
                alternativeText: data.AboutUs[0].image.alternativeText || null,
              }
            : null,
          cta: data.AboutUs[0].cta
            ? {
                title: data.AboutUs[0].cta.title || '',
                href: data.AboutUs[0].cta.href || '#',
              }
            : null,
        }
      : null;

  // Business Preview
  const businessesData: Business[] =
    data.SubPreview?.map((b: StrapiSubPreview) => ({
      id: b.id,
      name: b.logo?.logoName || b.subName || `business-${b.id}`,
      description: b.description || '',

      // MAIN PREVIEW IMAGE
      image: b.image?.url || null,
      // CARD IMAGE (small selectable ones)
      cardImage: b.cardImage?.url || null,
      // LOGO IMAGE (nested)
      logo: b.logo?.image?.url || null,

      cta: b.cta
        ? {
            title: b.cta.title || '',
            href: b.cta.href || '#',
          }
        : null,
    })) || [];

  // =========================FAQ data =======================//
  const faqsData =
    data.FAQs?.map((faq: StrapiFaqs) => ({
      id: faq.id,
      question: faq.question || '',
      answer: faq.answer || '',
    })) || [];

  // =========================
  // Achievements data (CMS)
  // =========================
  const achievementsData =
    data.Achievements?.map((item: StrapiCards) => ({
      id: item.id,
      title: item.title || item.description || '',
      description: item.description || '',
      image: item.image?.url || null,
    })) || [];

  return (
    <>
      {/* =====================================================
         HERO CAROUSEL
      ===================================================== */}

      <HeroCarousel slides={heroSlides} />
      {/* =====================================================
         WHAT WE DO SECTION
      ===================================================== */}
      {aboutSection && (
        <section className="bg-qgc-gray-soft py-20">
          <h2 className="text-4xl font-bold text-center text-qgc-black mb-16 font-akrux">
            What We Do
          </h2>
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12">
            {aboutSection.image && (
              <div className="w-full md:w-1/3 p-4 rounded-xl relative h-64 md:h-96 ">
                <div className="absolute inset-12 top-20 bottom-0  bg-qgc-gray-deep rounded-tl-4xl z-0" />

                <Image
                  src={aboutSection.image.url}
                  alt={aboutSection.image.alternativeText || aboutSection.title}
                  fill
                  className="object-contain  relative z-10"
                />
              </div>
            )}
            <div className="md:w-1/2 flex flex-col gap-6 items-start mt-10">
              <h2 className="text-3xl font-bold text-gray-800">{aboutSection.title}</h2>
              <p className="text-gray-600 text-lg whitespace-pre-line">
                {aboutSection.description}
              </p>
              {aboutSection.cta?.href && (
                <Button
                  href={aboutSection.cta.href}
                  text={aboutSection.cta.title}
                  variant="dark"
                  className="px-8 py-2 w-fit"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
         OUR BUSINESS SECTION
      ===================================================== */}

      <SubsidiaryShowcase items={businessesData} title="Our Business Preview" imagePosition="left" />

      {/* =====================================================
         ACHIEVEMENTS SECTION
      ===================================================== */}
      <section className="bg-qgc-gray-soft px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-qgc-black mb-16 font-akrux">
          Business and Financial Growth
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {achievementsData.map(
            (achievement: { id: number; title: string; image: string | null }) => (
              <div key={achievement.id} className="group cursor-pointer">
                <div className="relative w-full h-110 rounded-xl overflow-hidden shadow-lg bg-white flex flex-col p-8">
                  <div className="relative flex-1 w-full mb-8">
                    {achievement.image && (
                      <Image
                        src={achievement.image}
                        alt={achievement.title}
                        fill
                        className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                    )}
                  </div>

                  <div className="text-center">
                    <h3 className="text-qgc-black text-xl font-semibold font-akrux">
                      {achievement.title}
                    </h3>
                  </div>

                  <div className="absolute inset-0 group-hover:bg-black/5 transition duration-500 pointer-events-none" />
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* =====================================================
        BLOG SECTION
      ===================================================== */}
      <LatestNews blogs={blogs} />
      {/* =====================================================
          FAQ SECTION
      ===================================================== */}
      <section className="bg-gray-100 px-6 py-24">
        <h2 className="text-4xl font-bold text-center text-qgc-black mb-16 font-akrux">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqsData.map((faq: { id: number; question: string; answer: string }) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </>
  );
}
