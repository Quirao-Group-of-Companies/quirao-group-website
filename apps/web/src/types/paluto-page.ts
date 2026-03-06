import type {
  AboutUsSection,
  CardItem,
  ContactUsSection,
  FAQ,
  FeedbackItem,
  HeroSection,
  LogoComponent,
} from './strapi-shared';

export type PalutoPageData = {
  hero?: HeroSection[]; // Repeatable Component
  aboutUs?: AboutUsSection;
  showcaseLogo?: LogoComponent | null;
  showcase?: CardItem[];
  feedback?: FeedbackItem[];
  contactUs?: ContactUsSection;
  faqs?: FAQ[];
};
