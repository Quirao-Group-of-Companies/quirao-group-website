import type {
  StrapiAboutUs,
  StrapiCards,
  StrapiFaqs,
  StrapiHeroSection,
  StrapiSubPreview,
} from 'cms/types';
import Image from 'next/image';
import { getHomepage } from '@/lib/services/strapi-homepage';

export default async function Page() {
  const data = await getHomepage();

  if (!data) {
    return <p>No content available.</p>;
  }

  const hero = (data.HeroSection || []) as StrapiHeroSection[];
  const aboutUs = (data.AboutUs || []) as StrapiAboutUs[];
  const achievements = (data.Achievements || []) as StrapiCards[];
  const subPreview = (data.SubPreview || []) as StrapiSubPreview[];
  const faqs = (data.FAQs || []) as StrapiFaqs[];

  return (
    <main className="container mx-auto px-4">
      {/* HERO SECTION */}
      {hero.map((item) => (
        <section key={item.id} className="py-20 text-center">
          {item.logo?.image?.url && (
            <div className="flex justify-center mb-6">
              <Image
                src={item.logo.image.url}
                alt={'Brand Logo'}
                width={120}
                height={60}
                priority
              />
            </div>
          )}
          <h1 className="text-4xl font-bold">{item.title}</h1>
          <p className="mt-4 text-gray-600">{item.description}</p>
          {item.image?.url && (
            <div className="mt-10 relative w-full h-[400px]">
              <Image
                src={item.image.url}
                alt={'Hero Image'}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}
        </section>
      ))}

      {/* ACHIEVEMENTS / CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        {achievements.map((card) => (
          <div key={card.id} className="p-6 border rounded-lg shadow-sm">
            {card.image?.url && (
              <Image src={card.image.url} alt={'Achievement Image'} width={50} height={50} />
            )}
            <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
            <p className="text-gray-500">{card.description}</p>
          </div>
        ))}
      </section>

      {/* ABOUT US */}
      {aboutUs.map((item) => (
        <section key={item.id} className="flex flex-col md:flex-row gap-10 py-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{item.title}</h2>
            <p className="mt-4 leading-relaxed">{item.description}</p>
          </div>
          {item.image?.url && (
            <div className="flex-1 relative w-full h-80">
              <Image
                src={item.image.url}
                alt={'About Us'}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </section>
      ))}

      {/* SUB PREVIEW */}
      {subPreview.map((item) => (
        <section key={item.id} className="bg-gray-50 p-10 rounded-2xl my-10">
          <h2 className="text-2xl font-bold">{item.description}</h2>
          <p>{item.description}</p>
        </section>
      ))}

      {/* FAQS */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">FAQs</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <details key={faq.id} className="p-4 border rounded-md group">
              <summary className="font-medium cursor-pointer list-none flex justify-between">
                {faq.question}
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
