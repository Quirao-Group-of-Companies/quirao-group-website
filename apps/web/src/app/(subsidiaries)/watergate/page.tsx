import { getWatergatePage } from '@cms/services';
import type { WatergatePageData } from '@cms/types';
import { EnvelopeIcon, MapPinIcon, PhoneIcon, ShareIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import FAQItem from '@/components/ui/FAQItem.client';
import WatergateAbout from '@/components/watergate/About.client';
import WatergateFeatures from '@/components/watergate/Features.client';
import WatergateHero from '@/components/watergate/Hero.client';

function img(url?: string | null): string {
  if (!url) {
    return '';
  }
  const base = (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || '').replace(
    /\/$/,
    '',
  );
  return url.startsWith('http') ? url : `${base}${url}`;
}

function SocialIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  if (t.includes('facebook')) {
    return (
      <svg aria-label="Facebook" role="img" className="w-6 h-6 fill-black" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    );
  }
  if (t.includes('instagram')) {
    return (
      <svg aria-label="Instagram" role="img" className="w-6 h-6 fill-black" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  if (t.includes('youtube')) {
    return (
      <svg aria-label="YouTube" role="img" className="w-6 h-6 fill-black" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (t.includes('tiktok')) {
    return (
      <svg aria-label="TikTok" role="img" className="w-6 h-6 fill-black" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    );
  }
  return <span className="text-xs font-bold">{title}</span>;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWatergatePage();
  const hero = data?.heroSection?.[0];
  return {
    title: hero?.title || 'Watergate Water Services',
    description: hero?.description || 'Clean and reliable water supply services.',
  };
}

export default async function WatergatePage() {
  const cms: WatergatePageData | null = await getWatergatePage();

  if (!cms) {
    return (
      <main className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">No Watergate page data found.</p>
      </main>
    );
  }

  // Hero
  const heroSlides = cms.heroSection?.map((h) => img(h.image?.url)).filter(Boolean) ?? [];
  const firstHero = cms.heroSection?.[0];
  const heroLogoSrc = img(firstHero?.logo?.image?.url);
  const heroBrandName = firstHero?.title ?? 'Watergate';
  const heroTagline = firstHero?.description ?? '';

  // About Us
  const about = cms.aboutUs;
  const aboutTitle = about?.title ?? '';
  const aboutDescription = about?.description ?? '';
  const aboutImageSrc = img(about?.image?.url);
  const aboutLogoSrc = img(about?.gallery?.[0]?.url);
  const aboutCtaTitle = about?.cta?.title ?? '';
  const aboutCtaHref =
    about?.cta?.href && !about.cta.href.startsWith('http')
      ? `https://${about.cta.href}`
      : (about?.cta?.href ?? '');

  // Feature cards
  const featureCards =
    cms.featureCards?.map((c) => ({
      id: c.id,
      title: c.title ?? '',
      description: c.description ?? '',
    })) ?? [];

  // Contact
  const contactData = cms.contactUs;
  const contactDetails = contactData?.details ?? [];
  const contactLinks = (contactData?.embedLinks ?? []).map((link) => ({
    ...link,
    href: link.href && !link.href.startsWith('http') ? `https://${link.href}` : link.href,
  }));
  const contactMapHref =
    contactData?.embedMap?.href ??
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1018.3902873574484!2d122.59354003252722!3d10.759332700082894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee5bb488af5ad%3A0x9e517c36dbc70075!2sBuildmaster%20PH!5e0!3m2!1sen!2sph!4v1774256219656!5m2!1sen!2sph';

  // FAQs
  const faqs =
    cms.faqs?.map((f) => ({
      id: f.id,
      question: f.question ?? '',
      answer: f.answer ?? '',
    })) ?? [];

  return (
    <main className="w-full min-h-screen bg-white">
      {/* ── HERO ── */}
      {heroSlides.length > 0 && (
        <WatergateHero
          slides={heroSlides}
          logoSrc={heroLogoSrc}
          brandName={heroBrandName}
          tagline={heroTagline}
        />
      )}

      {/* ── ABOUT US ── */}
      {about && (
        <WatergateAbout
          title={aboutTitle}
          description={aboutDescription}
          imageSrc={aboutImageSrc}
          logoSrc={aboutLogoSrc}
          ctaTitle={aboutCtaTitle}
          ctaHref={aboutCtaHref}
        />
      )}

      {/* ── FEATURES ── */}
      {featureCards.length > 0 && (
        <WatergateFeatures
          heading="PURITY YOU CAN TASTE"
          tagline="Reliable Water Supply Solutions for Homes, Businesses, and Industries."
          cards={featureCards}
        />
      )}

      {/* ── CONTACT ── */}
      {contactData && (
        <section className="w-full bg-white py-8 sm:py-12 px-4 sm:px-6 md:px-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
              CONTACT <span style={{ color: '#20305f' }}>WATERGATE</span>
            </h2>
            <div className="w-20 h-1 bg-bm-vivid-blue mt-2" />
          </div>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-qgc-gray-soft rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-y-6 sm:gap-y-12 gap-x-4 p-6 md:p-12">
              {contactDetails[0] && (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <MapPinIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">
                    {contactDetails[0].title ?? ''}
                  </h3>
                  <p className="text-gray-700 text-sm max-w-55 leading-snug">
                    {contactDetails[0].description ?? ''}
                  </p>
                </div>
              )}
              {contactDetails[1] && (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <EnvelopeIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">
                    {contactDetails[1].title ?? ''}
                  </h3>
                  <p className="text-gray-700 text-sm break-all">
                    {contactDetails[1].description ?? ''}
                  </p>
                </div>
              )}
              {contactDetails[2] && (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <PhoneIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">
                    {contactDetails[2].title ?? ''}
                  </h3>
                  <p className="text-gray-700 text-sm font-bold">
                    {contactDetails[2].description ?? ''}
                  </p>
                </div>
              )}
              {contactLinks.length > 0 && (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <ShareIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Socials</h3>
                  <div className="flex gap-3 mt-1">
                    {contactLinks.map((social, idx: number) => (
                      <a
                        key={`${social.id}-${idx}`}
                        href={social.href ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:scale-110 transition-transform"
                        title={social.title ?? ''}
                      >
                        <SocialIcon title={social.title ?? ''} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {contactMapHref && (
              <div className="w-full lg:w-1/2 h-[300px] sm:h-[380px] lg:h-auto lg:min-h-[500px]">
                <iframe
                  src={contactMapHref}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Watergate Location Map"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FAQS ── */}
      {faqs.length > 0 && (
        <section className="w-full bg-qgc-gray-soft py-8 sm:py-12 px-4 sm:px-6 md:px-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
              FREQUENTLY ASKED <span style={{ color: '#20305f' }}>QUESTIONS</span>
            </h2>
            <div className="w-20 h-1 bg-bm-vivid-blue mt-2" />
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
