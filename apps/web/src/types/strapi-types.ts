/**
 * ⚠️  AUTO-GENERATED — DO NOT EDIT MANUALLY
 * Source: apps/cms/scripts/generate-types.ts
 * Regenerate: bun run generate-types (from apps/cms)
 * Generated: 2026-03-17T07:07:22.125Z
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
export type StrapiAboutus = {
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
export type StrapiCard = {
  id: number;
  title?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  icon?: StrapiMedia[] | null;
  cta?: StrapiLink | null;
};

/** Auto-generated from Strapi component: blocks.contact-us */
export type StrapiContactus = {
  id: number;
  details?: StrapiTextblock[] | null;
  embedLinks?: StrapiLink[] | null;
  embedMap?: StrapiLink | null;
};

/** Auto-generated from Strapi component: blocks.fa-qs */
export type StrapiFaq = {
  id: number;
  question?: string | null;
  answer?: string | null;
};

/** Auto-generated from Strapi component: blocks.feedback */
export type StrapiFeedback = {
  id: number;
  image?: StrapiMedia | null;
  review?: StrapiTextblock | null;
  stars?: number | null;
};

/** Auto-generated from Strapi component: blocks.hero-section */
export type StrapiHerosection = {
  id: number;
  title?: string | null;
  description?: string | null;
  cta?: StrapiLink | null;
  image?: StrapiMedia | null;
  logo?: StrapiLogo | null;
};

/** Auto-generated from Strapi component: blocks.highlights */
export type StrapiHighlight = {
  id: number;
  headline?: string | null;
  title?: string | null;
  description?: unknown | null;
  image?: StrapiMedia | null;
  cta?: StrapiLink | null;
};

/** Auto-generated from Strapi component: blocks.sub-contacts */
export type StrapiSubcontact = {
  id: number;
  subName?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  logo?: StrapiLogo | null;
  cta?: StrapiLink | null;
  cardImage?: StrapiMedia | null;
  featuredImage?: StrapiMedia | null;
};

/** Auto-generated from Strapi component: blocks.sub-preview */
export type StrapiSubpreview = {
  id: number;
  subName?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  logo?: StrapiLogo | null;
  cta?: StrapiLink | null;
  cardImage?: StrapiMedia | null;
};

/** Auto-generated from Strapi component: elements.item */
export type StrapiContentitem = {
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
  name?: string | null;
  image?: StrapiMedia | null;
};

/** Auto-generated from Strapi component: elements.text */
export type StrapiTextblock = {
  id: number;
  title?: string | null;
  heading1?: string | null;
  heading2?: string | null;
  heading3?: string | null;
  heading4?: string | null;
  description?: string | null;
};

// ─── Page Data Types ─────────────────────────────────────────────────────

/** Auto-generated from Strapi content type: About Us Page */
export type AboutUsPageData = {
  heroSection?: StrapiHerosection | null;
  aboutUs?: StrapiAboutus | null;
  missionVision?: StrapiCard[] | null;
  missionVisionImage?: StrapiMedia | null;
  groupStructureBanner?: StrapiBanner | null;
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
  heroSection?: StrapiHerosection[] | null;
  aboutUs?: StrapiAboutus | null;
  features?: StrapiCard[] | null;
  delivery?: StrapiCard[] | null;
  banner?: StrapiBanner | null;
  contactUs?: StrapiContactus | null;
  faqs?: StrapiFaq[] | null;
};

/** Auto-generated from Strapi content type: BuildMaster Page */
export type BuildmasterPageData = {
  heroSection?: StrapiHerosection[] | null;
  features?: StrapiCard[] | null;
  cta?: StrapiLink | null;
  aboutUsTitle?: string | null;
  aboutUsBackgroundImage?: StrapiMedia | null;
  aboutUsSection?: StrapiCard[] | null;
  podcasts?: StrapiCard[] | null;
  link?: StrapiLink | null;
  download?: StrapiBanner | null;
  contactUs?: StrapiContactus | null;
  faqs?: StrapiFaq[] | null;
};

/** Auto-generated from Strapi content type: Careers page */
export type CareersPageData = {
  heroSection?: StrapiHerosection | null;
  overview?: StrapiAboutus | null;
  overviewVideo?: StrapiLink | null;
  subsidiaryOverview?: StrapiSubpreview[] | null;
  valuesSection?: StrapiHighlight | null;
  whyJoinUs?: StrapiHighlight | null;
  subContacts?: StrapiSubcontact[] | null;
};

/** Auto-generated from Strapi content type: Contact Us Page */
export type ContactUsPageData = {
  introText?: StrapiTextblock | null;
  mainContact?: StrapiSubcontact | null;
  subsidiaryContacts?: StrapiSubcontact[] | null;
};

/** Auto-generated from Strapi content type: Homepage */
export type HomepageData = {
  heroSection?: StrapiHerosection[] | null;
  aboutUs?: StrapiAboutus[] | null;
  SubPreview?: StrapiSubpreview[] | null;
  achievements?: StrapiCard[] | null;
  faqs?: StrapiFaq[] | null;
};

/** Auto-generated from Strapi content type: Paluto Page */
export type PalutoPageData = {
  heroSection?: StrapiHerosection[] | null;
  aboutUs?: StrapiAboutus | null;
  showcaseLogo?: StrapiLogo | null;
  showcase?: StrapiCard[] | null;
  bannerHighlight?: StrapiBanner | null;
  branchesSectionTitle?: string | null;
  branchesCards?: StrapiCard[] | null;
  eventsAndCatering?: StrapiContentitem | null;
  eventsAndCateringImages?: StrapiMedia[] | null;
  feedback?: StrapiFeedback[] | null;
  contactUs?: StrapiContactus | null;
  faqs?: StrapiFaq[] | null;
};

/** Auto-generated from Strapi content type: Sari-Sari Manokan Page */
export type SariSariManokanPageData = {
  heroSection?: StrapiHerosection[] | null;
  aboutUs?: StrapiAboutus | null;
  showcase?: StrapiCard[] | null;
  feedback?: StrapiFeedback[] | null;
  contactUs?: StrapiContactus | null;
  faqs?: StrapiFaq[] | null;
};

/** Auto-generated from Strapi content type: Watergate Page */
export type WatergatePageData = {
  heroSection?: StrapiHerosection[] | null;
  aboutUs?: StrapiAboutus | null;
  featureCards?: StrapiCard[] | null;
  contactUs?: StrapiContactus | null;
  faqs?: StrapiFaq[] | null;
};
