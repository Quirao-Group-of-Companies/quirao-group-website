/**
 * ⚠️  AUTO-GENERATED — DO NOT EDIT MANUALLY
 * Source: apps/cms/scripts/generate-types.ts
 * Regenerate: bun run generate-types (from apps/cms)
 * Generated: 2026-03-11T08:54:54.155Z
 */

/** Shared Strapi media type */
export type StrapiMedia = {
  url: string;
  alternativeText: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string;
  name?: string;
};

// ─── Component Types ──────────────────────────────────────────────────────

/** Auto-generated from Strapi component: blocks.about-us */
export type StrapiAboutUs = {
  id: number;
  title?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  cta?: StrapiLink | null;
  gallery?: StrapiMedia[] | null;
};

/** Auto-generated from Strapi component: blocks.banner */
export type StrapiBanner = {
  id: number;
  title?: string | null;
  description?: string | null;
  logo?: StrapiMedia | null;
  image?: StrapiMedia | null;
  cta?: StrapiLink[] | null;
};

/** Auto-generated from Strapi component: blocks.cards */
export type StrapiCards = {
  id: number;
  title?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  icon?: StrapiMedia[] | null;
  cta?: StrapiLink | null;
};

/** Auto-generated from Strapi component: blocks.contact-us */
export type StrapiContactUs = {
  id: number;
  details?: StrapiText[] | null;
  embedLinks?: StrapiLink[] | null;
  embedMap?: StrapiLink | null;
};

/** Auto-generated from Strapi component: blocks.fa-qs */
export type StrapiFaqs = {
  id: number;
  question?: string | null;
  answer?: string | null;
};

/** Auto-generated from Strapi component: blocks.feedback */
export type StrapiFeedback = {
  id: number;
  image?: StrapiMedia | null;
  text?: StrapiText | null;
  stars?: number | null;
};

/** Auto-generated from Strapi component: blocks.hero-section */
export type StrapiHeroSection = {
  id: number;
  title?: string | null;
  description?: string | null;
  cta?: StrapiLink | null;
  image?: StrapiMedia | null;
  logo?: StrapiLogo | null;
};

/** Auto-generated from Strapi component: blocks.highlights */
export type StrapiHighlights = {
  id: number;
  headline?: string | null;
  title?: string | null;
  description?: unknown | null;
  image?: StrapiMedia | null;
  cta?: StrapiLink | null;
};

/** Auto-generated from Strapi component: blocks.sub-contacts */
export type StrapiSubContacts = {
  id: number;
  subName?: string | null;
  address?: string | null;
  contactNum?: string | null;
  email?: string | null;
  logo?: StrapiLogo | null;
  cta?: StrapiLink | null;
  cardImage?: StrapiMedia | null;
  displayImage?: StrapiMedia | null;
};

/** Auto-generated from Strapi component: blocks.sub-preview */
export type StrapiSubPreview = {
  id: number;
  subName?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  logo?: StrapiLogo | null;
  cta?: StrapiLink | null;
  cardImage?: StrapiMedia | null;
};

/** Auto-generated from Strapi component: elements.item */
export type StrapiItem = {
  id: number;
  title?: string | null;
  text?: string | null;
  image?: StrapiMedia | null;
  cta?: StrapiLink | null;
};

/** Auto-generated from Strapi component: elements.link */
export type StrapiLink = {
  id: number;
  title?: string | null;
  href?: string | null;
};

/** Auto-generated from Strapi component: elements.logo */
export type StrapiLogo = {
  id: number;
  logoName?: string | null;
  image?: StrapiMedia | null;
};

/** Auto-generated from Strapi component: elements.text */
export type StrapiText = {
  id: number;
  title?: string | null;
  h1?: string | null;
  h2?: string | null;
  h3?: string | null;
  h4?: string | null;
  description?: string | null;
};

// ─── Page Data Types ─────────────────────────────────────────────────────

/** Auto-generated from Strapi content type: About us page */
export type AboutUsPageData = {
  heroSection?: StrapiHeroSection | null;
  aboutUs?: StrapiAboutUs | null;
  missionVision?: StrapiCards[] | null;
  qgcGroupStructure?: StrapiBanner | null;
  meetOurLeaders?: StrapiCards[] | null;
};

/** Auto-generated from Strapi content type: Article */
export type ArticleData = {
  title: string;
  slug?: string | null;
  author_name?: string | null;
  excerpt?: string | null;
  content_body?: unknown | null;
  cover_image?: StrapiMedia | null;
  content_media?: StrapiMedia[] | null;
};

/** Auto-generated from Strapi content type: Brightline Page */
export type BrightlinePageData = {
  hero?: StrapiHeroSection[] | null;
  aboutUS?: StrapiAboutUs | null;
  features?: StrapiCards[] | null;
  delivery?: StrapiCards[] | null;
  banner?: StrapiBanner | null;
  contactUs?: StrapiContactUs | null;
  faqs?: StrapiFaqs[] | null;
};

/** Auto-generated from Strapi content type: BuildMaster Page */
export type BuildmasterPageData = {
  hero?: StrapiHeroSection[] | null;
  features?: StrapiCards[] | null;
  cta?: StrapiLink | null;
  aboutUsTitle?: string | null;
  aboutUsBackgroundImage?: StrapiMedia | null;
  aboutUsSection?: StrapiCards[] | null;
  podcasts?: StrapiCards[] | null;
  link?: StrapiLink | null;
  download?: StrapiBanner | null;
  contactUS?: StrapiContactUs | null;
  faqs?: StrapiFaqs[] | null;
};

/** Auto-generated from Strapi content type: Careers page */
export type CareersPageData = {
  heroSection?: StrapiHeroSection | null;
  overview?: StrapiAboutUs | null;
  overviewVideo?: StrapiLink | null;
  subsidiaryOverview?: StrapiSubPreview[] | null;
  valuesSection?: StrapiHighlights | null;
  whyJoinUs?: StrapiHighlights | null;
  subContacts?: StrapiSubContacts[] | null;
};

/** Auto-generated from Strapi content type: Contact us page */
export type ContactUsPageData = {
  qgcText?: StrapiText | null;
  qgcContacts?: StrapiSubContacts | null;
  subsContacts?: StrapiSubContacts[] | null;
};

/** Auto-generated from Strapi content type: Homepage */
export type HomepageData = {
  HeroSection?: StrapiHeroSection[] | null;
  AboutUs?: StrapiAboutUs[] | null;
  SubPreview?: StrapiSubPreview[] | null;
  Achievements?: StrapiCards[] | null;
  FAQs?: StrapiFaqs[] | null;
};

/** Auto-generated from Strapi content type: Paluto Page */
export type PalutoPageData = {
  hero?: StrapiHeroSection[] | null;
  aboutUs?: StrapiAboutUs | null;
  showcaseLogo?: StrapiLogo | null;
  showcase?: StrapiCards[] | null;
  bannerSection?: StrapiBanner | null;
  branchesSectionTitle?: string | null;
  branchesCards?: StrapiCards[] | null;
  eventsAndCateringSection?: StrapiItem | null;
  eventsAndCateringCarouselImages?: StrapiMedia[] | null;
  feedback?: StrapiFeedback[] | null;
  contactUs?: StrapiContactUs | null;
  faqs?: StrapiFaqs[] | null;
};

/** Auto-generated from Strapi content type: Sari-Sari Manokan Page */
export type SariSariManokanPageData = {
  hero?: StrapiHeroSection[] | null;
  aboutUs?: StrapiAboutUs | null;
  Showcase?: StrapiCards[] | null;
  feedback?: StrapiFeedback[] | null;
  faqs?: StrapiFaqs[] | null;
  contactUs?: StrapiContactUs | null;
};

/** Auto-generated from Strapi content type: Watergate Page */
export type WatergatePageData = {
  hero?: StrapiHeroSection[] | null;
  aboutUs?: StrapiAboutUs | null;
  cards?: StrapiCards[] | null;
  contactUs?: StrapiContactUs | null;
  faqs?: StrapiFaqs[] | null;
};
