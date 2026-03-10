import { EnvelopeIcon, MapPinIcon, PhoneIcon, ShareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import AboutSection from '@/components/buildmaster/aboutUsSection';
import FeaturesCarousel from '@/components/buildmaster/featuresCarousel';
import HeroCarousel from '@/components/buildmaster/heroCarousel';
import PodcastsSection from '@/components/buildmaster/podcastSection';
import { getBuildMasterPage } from '@/lib/services/strapi-buildmaster';
import type {
  BuildmasterPageData,
  StrapiHeroSection,
  StrapiCards,
  StrapiAboutUs,
  StrapiContactUs,
  StrapiFaqs,
  StrapiText,
  StrapiLink,
} from '../../../../../cms/types/strapi-components';

function extractYoutubeId(url?: string | null): string {
  if (!url) return '';
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  return match?.[1] ?? url;
}

function img(url?: string | null): string {
  if (!url) return '';
  const base = (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || '').replace(/\/$/, '');
  return url.startsWith('http') ? url : `${base}${url}`;
}

function SocialIcon({ title }: { title: string }) {
  const t = title.toLowerCase();

  if (t.includes('facebook')) {
    return (
      <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    );
  }

  if (t.includes('instagram')) {
    return (
      <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  if (t.includes('youtube')) {
    return (
      <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  if (t.includes('tiktok')) {
    return (
      <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    );
  }

  // Fallback for unrecognized platforms
  return <span className="text-xs font-bold">{title}</span>;
}

export default async function BuildMasterPage() {
  const cms: BuildmasterPageData = await getBuildMasterPage();

  if (!cms) {
    return (
      <main className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">No BuildMaster page data found.</p>
      </main>
    );
  }

  // ── 1. HERO ────────────────────────────────────────────────
  const heroSlides =
    cms.hero?.map((h: StrapiHeroSection) => img(h.image?.url)).filter(Boolean) ?? [];
  const firstHero = cms.hero?.[0];
  const heroLogoSrc = img(firstHero?.logo?.image?.url);
  const heroBrandName = firstHero?.title ?? '';
  const heroTagline = firstHero?.description ?? '';

  // ── 2. FEATURES ───────────────────────────────────────────
  const features =
    cms.features?.map((f: StrapiCards) => ({
      id: f.id,
      image: img(f.image?.url),
      description: f.description ?? '',
    })) ?? [];
  const featureCtaHref = cms.cta?.href ?? '';

  // ── 3. ABOUT US ───────────────────────────────────────────
  const TAB_LABELS = ['Mission', 'Vision', 'Core Values'];
  const aboutData: StrapiAboutUs | undefined = cms.aboutUs ?? undefined;
  const aboutTabs =
    aboutData?.gallery?.map((image, idx) => ({
      id: `tab-${idx}`,
      label: TAB_LABELS[idx] ?? `Tab ${idx + 1}`,
      image: img(image.url),
      body: aboutData.description ?? '',
    })) ?? [];
  const aboutBgSrc = img(aboutData?.image?.url);
  const aboutWordmarkSrc = img(firstHero?.logo?.image?.url);

  // ── 4. PODCASTS ───────────────────────────────────────────
  const podcasts =
    cms.podcasts?.map((p: StrapiCards) => ({
      id: p.id,
      image: img(p.image?.url),
      youtubeId: extractYoutubeId(p.cta?.href),
    })) ?? [];

  // ── 5. APP BANNER ─────────────────────────────────────────
  const bannerSrc = img(cms.download?.image?.url);
  const googlePlayHref = cms.download?.cta?.[0]?.href ?? '';
  const appStoreHref = cms.download?.cta?.[1]?.href ?? '';

  // ── 6. CONTACT ────────────────────────────────────────────
  const contactData: StrapiContactUs | undefined = cms.contactUS ?? undefined;
  const contactDetails: StrapiText[] = contactData?.details ?? [];
  const contactLinks: StrapiLink[] = contactData?.embedLinks ?? [];
  const contactMapHref =
    contactData?.embedMap?.href ??
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d346.51004397058824!2d122.56992756495173!3d10.710274974974633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee5b4dd1a329d%3A0x1e62622958e67a57!2sTrualliant!5e0!3m2!1sen!2sph!4v1773111988244!5m2!1sen!2sph';

  // ── 7. FAQS ───────────────────────────────────────────────
  const faqs =
    cms.faqs?.map((f: StrapiFaqs) => ({
      id: f.id,
      question: f.question ?? '',
      answer: f.answer ?? '',
    })) ?? [];

  return (
    <main className="w-full min-h-screen bg-white">
      {heroSlides.length > 0 && (
        <HeroCarousel
          slides={heroSlides}
          logoSrc={heroLogoSrc}
          brandName={heroBrandName}
          tagline={heroTagline}
        />
      )}

      {features.length > 0 && <FeaturesCarousel features={features} ctaHref={featureCtaHref} />}

      {aboutTabs.length > 0 && (
        <AboutSection
          tabs={aboutTabs}
          backgroundSrc={aboutBgSrc}
          wordmarkLogoSrc={aboutWordmarkSrc}
        />
      )}

      {podcasts.length > 0 && <PodcastsSection podcasts={podcasts} />}

      {bannerSrc && (
        <section className="relative w-full overflow-hidden min-h-[400px] flex items-center justify-center py-12">
          <div className="absolute inset-0">
            <Image
              src={bannerSrc}
              alt={cms.download?.title ?? 'BuildMaster App Banner'}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center py-20 px-6 text-center gap-6">
            {cms.download?.title && (
              <h2 className="text-white font-bold text-2xl">{cms.download.title}</h2>
            )}
            {cms.download?.description && (
              <p className="text-white/80 text-sm max-w-md">{cms.download.description}</p>
            )}
            <div className="flex gap-4 flex-wrap justify-center">
              {googlePlayHref && (
                <a
                  href={googlePlayHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/10 border border-white/25 text-white px-5 py-3 rounded-xl backdrop-blur hover:scale-105 transition-transform"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
                    <path d="M3.18 23.76a2 2 0 0 0 2.07-.22l11.4-6.57-2.54-2.54-10.93 9.33zM20.43 9.37l-2.67-1.54-2.84 2.84 2.84 2.84 2.7-1.56a1.98 1.98 0 0 0-.03-3.58zM1.18.55A2 2 0 0 0 .75 1.8v20.4a2 2 0 0 0 .43 1.25l.07.07 11.43-11.43v-.27L1.25.48l-.07.07zM14.53 8.17L3.18.43 1.11 2.5l10.93 9.33 2.49-3.66z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] text-white/50 uppercase tracking-wide">Get it on</div>
                    <div className="text-[14px] font-bold">
                      {cms.download?.cta?.[0]?.title ?? 'Google Play'}
                    </div>
                  </div>
                </a>
              )}
              {appStoreHref && (
                <a
                  href={appStoreHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/10 border border-white/25 text-white px-5 py-3 rounded-xl backdrop-blur hover:scale-105 transition-transform"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] text-white/50 uppercase tracking-wide">
                      Download on the
                    </div>
                    <div className="text-[14px] font-bold">
                      {cms.download?.cta?.[1]?.title ?? 'App Store'}
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {contactData && (
        <section className="w-full bg-white py-12 px-6 md:px-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
              CONTACT <span style={{ color: '#0a285a' }}>BUILDMASTER</span>
            </h2>
            <div className="w-20 h-1 bg-bm-vivid-blue mt-2" />
          </div>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-qgc-gray-soft rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
            <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 p-12">
              {contactDetails[0] && (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <MapPinIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">
                    {contactDetails[0].title ?? ''}
                  </h3>
                  <p className="text-gray-700 text-sm max-w-[220px] leading-snug">
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
                    {contactLinks.map((social: StrapiLink, idx: number) => (
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
              <div className="w-full lg:w-1/2 h-[450px] lg:h-auto min-h-[500px]">
                <iframe
                  src={contactMapHref}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="BuildMaster Location Map"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="w-full bg-white py-12 px-6 md:px-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic text-black tracking-tighter">
              FREQUENTLY ASKED <span style={{ color: '#0a285a' }}>QUESTIONS</span>
            </h2>
            <div className="w-20 h-1 bg-bm-vivid-blue mt-2" />
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group bg-gray-100 rounded-2xl px-6 py-4 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-medium text-[#111] text-sm list-none">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-180">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}