
import Image from 'next/image';

import FAQItem from '../components/homepage/FAQItem';
import { blogs } from './data/homepage-data';
import HeroCarousel from '@/components/homepage/HeroCarousel';
import { getHomepage } from '@/lib/services/strapi-homepage';
import OurBusinessPreview from '@/components/homepage/BusinessPreview';


/* =========================================================
   MAIN LANDING PAGE COMPONENT
========================================================= */

type Achievement = {
  id: number;
  title: string;
  description: string;
  image: string | null;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export default async function Home() {

  /* ---------- Hero State ---------- */
  const data = await getHomepage();

  if (!data) {
    return <p>No content available</p>;
  }

 const heroSlides =
  data.HeroSection?.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image
      ? {
          url: item.image.url,
          alternativeText: item.image.alternativeText,
        }
      : null,
    cta: item.cta
      ? {
          title: item.cta.title,
          href: item.cta.href,
        }
      : null,
  })) || [];

  const aboutSection = data.AboutUs && data.AboutUs.length > 0
  ? {
      id: data.AboutUs[0].id,
      title: data.AboutUs[0].title,
      description: data.AboutUs[0].description,
      image: data.AboutUs[0].image
        ? { url: data.AboutUs[0].image.url, alternativeText: data.AboutUs[0].image.alternativeText }
        : null,
      cta: data.AboutUs[0].cta
        ? { title: data.AboutUs[0].cta.title, href: data.AboutUs[0].cta.href }
        : null,
      additionalComponents: {
        subtitle: data.AboutUs[0].subtitle,
        cards: data.AboutUs[0].cards,
      },
    }
  : null;

  // Business Preview
  const businessesData = data.SubPreview.map((b: any) => ({
  id: b.id,
  name: b.logo?.logoName || `business-${b.id}`,
  description: b.description,

  // MAIN PREVIEW IMAGE
  image: b.image?.url || null,
  // CARD IMAGE (small selectable ones)
  cardImage: b.cardImage?.url || null,
  // LOGO IMAGE (nested)
  logo: b.logo?.image?.url || null,

  cta: b.cta || null,
  }));
  
  // =========================FAQ data =======================//
  const faqsData: FAQ[] =
    data.FAQs?.map((faq: any): FAQ => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    })) || [];
  console.log('Homepage Data:', data);
  
    // =========================
    // Achievements data (CMS)
    // =========================
    const achievementsData: Achievement[] =
      data.Achievements?.map((item: any): Achievement => ({
        id: item.id,
        title: item.title || item.description,
        description: item.description,
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
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12">
            {aboutSection.image && (
              <div className="md:w-1/3 relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={aboutSection.image.url}
                  alt={aboutSection.image.alternativeText || aboutSection.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="md:w-1/2 flex flex-col gap-6">
              <h2 className="text-4xl font-bold text-gray-800">{aboutSection.title}</h2>
              {aboutSection.additionalComponents?.subtitle && (
                <h3 className="text-2xl font-medium text-gray-700">
                  {aboutSection.additionalComponents.subtitle}
                </h3>
              )}
              <p className="text-gray-600 text-lg whitespace-pre-line">
                {aboutSection.description}
              </p>
              {aboutSection.cta?.href && (
                <a
                  href={aboutSection.cta.href}
                  className="w-40 px-4 py-2 rounded-md bg-black text-white hover:bg-qgc-gray-deep transition inline-block text-center"
                >
                  {aboutSection.cta.title}
                </a>
              )}

              {aboutSection.additionalComponents?.cards?.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aboutSection.additionalComponents.cards.map((card: any) => (
                    <div
                      key={card.id}
                      className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
                    >
                      {card.image?.url && (
                        <Image
                          src={card.image.url}
                          alt={card.image.alternativeText || card.title}
                          width={150}
                          height={150}
                          className="object-contain mb-4"
                        />
                      )}
                      <h4 className="font-semibold">{card.title}</h4>
                      <p className="text-gray-500">{card.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
         OUR BUSINESS SECTION
      ===================================================== */}

      <OurBusinessPreview businesses={businessesData} />


      {/* =====================================================
         ACHIEVEMENTS SECTION
      ===================================================== */}
      <section className="bg-qgc-gray-soft px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-qgc-black mb-16">Our Achievements</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {achievementsData.map((achievement) => (
            <div key={achievement.id} className="group cursor-pointer">
              <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-lg">
                {achievement.image && (
                  <Image
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    className="object-contain p-15 transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 group-hover:bg-black/10 transition duration-500" />

                <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                  <h3 className="text-qgc-black text-xl font-semibold">
                    {achievement.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
        BLOG SECTION
      ===================================================== */}
      <section className="bg-white px-6 py-24">
        <h2 className="text-4xl font-bold text-center text-qgc-black mb-16">Latest News</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col md:flex-row bg-qgc-gray-soft rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between md:w-1/2">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{blog.date}</p>

                  <h3 className="text-xl font-semibold text-qgc-black mb-4">{blog.title}</h3>

                  <p className="text-gray-600 text-sm leading-relaxed">{blog.description}</p>
                </div>

                <button
                  type="button"
                  className="mt-6 bg-black  text-white rounded-lg  px-6 py-3 text-sm font-medium hover:bg-qgc-gray-deep transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* =====================================================
          FAQ SECTION
      ===================================================== */}
        <section className="bg-gray-100 px-6 py-24">
          <h2 className="text-4xl font-bold text-center text-qgc-black mb-16">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqsData.map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>
    </>
  );
}
