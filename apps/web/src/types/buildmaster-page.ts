import type {
  AboutUsSection,
  CardItem,
  ContactUsSection,
  FAQ,
  HeroSection,
  StrapiCTA,
  StrapiImage,
} from './strapi-shared';

export type BuildMasterPageData = {
  hero?: HeroSection[]; // Repeatable Component
  features?: CardItem[];
  cta?: StrapiCTA | null;
  aboutUs?: AboutUsSection;
  podcasts?: CardItem[];
  link?: StrapiCTA | null;
  download?: {
    id: number;
    title: string;
    description: string;
    image: StrapiImage | null;
    cta: StrapiCTA[]; // Repeatable Component (Link)
  };
  contactUS?: ContactUsSection;
  faqs?: FAQ[];
};
