import type { AboutUsSection, CardItem, ContactUsSection, FAQ, HeroSection } from './strapi-shared';

export type WatergatePageData = {
  hero?: HeroSection[]; // Repeatable Component
  aboutUs?: AboutUsSection;
  cards?: CardItem[];
  contactUs?: ContactUsSection;
  faqs?: FAQ[];
};
