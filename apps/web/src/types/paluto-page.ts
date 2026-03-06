import type {
  StrapiCTA,
  StrapiImage,
  AboutUsSection,
  CardItem,
  ContactUsSection,
  FAQ,
  FeedbackItem,
  HeroSection,
  LogoComponent,
} from './strapi-shared';

/** Single Component (Item) — used in eventsAndCateringSection */
export type EventsAndCateringItem = {
  id: number;
  title: string;
  text: string;
  image: StrapiImage | null;
  cta: StrapiCTA | null;
};

export type PalutoPageData = {
  hero?: HeroSection[]; // Repeatable Component
  aboutUs?: AboutUsSection;
  showcaseLogo?: LogoComponent | null;
  showcase?: CardItem[];

  // Banner section
  bannerSection?: {
    id: number;
    title: string;
    description: string;
    logo: StrapiImage | null; // Single Media (not LogoComponent)
    image: StrapiImage | null;
    cta: StrapiCTA[]; // Repeatable Component (Link)
  };

  // Branches
  branchesSectionTitle?: string;
  branchesCards?: CardItem[]; // Repeatable Component (Cards)

  // Events & Catering
  eventsAndCateringSection?: EventsAndCateringItem; // Single Component (Item)
  eventsAndCateringCarouselImages?: StrapiImage[]; // Multiple Media

  feedback?: FeedbackItem[];
  contactUs?: ContactUsSection;
  faqs?: FAQ[];
};