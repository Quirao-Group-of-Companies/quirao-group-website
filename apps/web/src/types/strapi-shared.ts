// ============================================================
// STRAPI SHARED TYPES
// Base primitives and reusable components used across
// multiple page type files.
// ============================================================

// ------------------------------------------------------------
// Primitives
// ------------------------------------------------------------

export type StrapiCTA = {
  title: string;
  href: string;
};

export type StrapiImage = {
  url: string;
  alternativeText: string | null;
};

export type LogoComponent = {
  id: number;
  logoName: string;
  image: StrapiImage | null;
};

// ------------------------------------------------------------
// Reusable Page Section Components
// ------------------------------------------------------------

/** Repeatable Hero section — used in: Brightline, BuildMaster, Paluto, Sari-Sari Manokan, Watergate */
export type HeroSection = {
  id: number;
  title: string;
  description: string;
  cta: StrapiCTA | null;
  image: StrapiImage | null;
  logo: LogoComponent | null;
};

/** About Us section — used in: About Us, Brightline, BuildMaster, Paluto, Sari-Sari Manokan, Watergate */
export type AboutUsSection = {
  id: number;
  title: string;
  description: string;
  image: StrapiImage | null;
  cta: StrapiCTA | null;
  gallery: StrapiImage[]; // Multiple Media
};

/** Cards component — used in: About Us, Brightline, BuildMaster, Paluto, Sari-Sari Manokan, Watergate */
export type CardItem = {
  id: number;
  title: string;
  description: string;
  image: StrapiImage | null;
  icon: StrapiImage[]; // Multiple Media
  cta: StrapiCTA | null;
};

/** FAQ component — used in: Homepage, Brightline, BuildMaster, Paluto, Sari-Sari Manokan, Watergate */
export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

/** Feedback component — used in: Paluto, Sari-Sari Manokan */
export type FeedbackItem = {
  id: number;
  image: StrapiImage | null;
  text: {
    id: number;
    title: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    description: string;
  } | null;
  stars: number;
};

/** Contact Us section — used in: Brightline, BuildMaster, Paluto, Sari-Sari Manokan, Watergate */
export type ContactUsSection = {
  id: number;
  details: {
    id: number;
    title: string;
    h1: string;
    h2: string;
    h3: string;
    description: string;
  }[]; // Repeatable Component (Text)
  embedLinks: StrapiCTA[]; // Repeatable Component (Link)
  embedMap: StrapiCTA | null; // Single Component (Link)
};

/** Sub Contacts component — used in: Careers, Contact Us */
export type ContactItem = {
  id: number;
  subName: string;
  address: string;
  contactNum: string;
  email: string;
  logo: LogoComponent | null;
  cta: StrapiCTA | null;
  cardImage: StrapiImage | null;
  displayImage: StrapiImage | null;
};

/** Highlights component — used in: Careers */
export type HighlightSection = {
  id: number;
  headline: string;
  title: string;
  description: unknown[]; // Rich text (Blocks)
  image: StrapiImage | null;
  cta: StrapiCTA | null;
};
