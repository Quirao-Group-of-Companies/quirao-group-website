import type {
  AboutUsSection,
  CardItem,
  LogoComponent,
  StrapiCTA,
  StrapiImage,
} from './strapi-shared';

export type AboutUsPageData = {
  heroSection?: {
    id: number;
    title: string;
    description: string;
    cta: StrapiCTA | null;
    image: StrapiImage | null;
    logo: LogoComponent | null;
  };
  aboutUs?: AboutUsSection;
  missionVision?: CardItem[]; // Repeatable Component (Cards)
  qgcGroupStructure?: {
    id: number;
    title: string;
    description: string;
    image: StrapiImage | null;
    cta: StrapiCTA[]; // Repeatable Component (Link)
  };
  meetOurLeaders?: CardItem[]; // Repeatable Component (Cards)
};
