import type {
  AboutUsSection,
  CardItem,
  ContactUsSection,
  FAQ,
  FeedbackItem,
  HeroSection,
} from './strapi-shared';

export type SariSariManokanPageData = {
  hero?: HeroSection[]; // Repeatable Component
  aboutUs?: AboutUsSection;
  Showcase?: CardItem[];
  feedback?: FeedbackItem[];
  faqs?: FAQ[];
  contactUs?: ContactUsSection;
};
