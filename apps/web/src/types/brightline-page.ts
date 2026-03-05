import type {
  AboutUsSection,
  CardItem,
  ContactUsSection,
  FAQ,
  HeroSection,
  StrapiCTA,
  StrapiImage,
} from './strapi-shared';

export type BrightlinePageData = {
  hero?: HeroSection[]; // Repeatable Component
  aboutUS?: AboutUsSection;
  features?: CardItem[];
  delivery?: CardItem[];
  banner?: {
    id: number;
    title: string;
    description: string;
    image: StrapiImage | null;
    cta: StrapiCTA[]; // Repeatable Component (Link)
  };
  contactUs?: ContactUsSection;
  faqs?: FAQ[];
};
