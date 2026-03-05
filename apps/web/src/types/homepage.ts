import type { FAQ, LogoComponent, StrapiCTA, StrapiImage } from './strapi-shared';

export type HeroItem = {
  id: number;
  title: string;
  description: string;
  image?: StrapiImage | null;
  cta?: StrapiCTA | null;
};

export type AboutCard = {
  id: number;
  title: string;
  description: string;
  image?: StrapiImage | null;
};

export type Achievement = {
  id: number;
  title: string;
  description: string;
  image: string | null;
};

export type Business = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  cardImage: string | null;
  logo: string | null;
  cta: StrapiCTA | null;
};

export type SubPreviewItem = {
  id: number;
  logo?: LogoComponent;
  description: string;
  image?: { url: string };
  cardImage?: { url: string };
  cta?: StrapiCTA;
};

export type HomepageData = {
  HeroSection?: HeroItem[];
  AboutUs?: {
    id: number;
    title: string;
    description: string;
    subtitle: string;
    cards: AboutCard[];
    image?: StrapiImage | null;
    cta?: StrapiCTA | null;
  }[];
  Achievements?: {
    id: number;
    title: string;
    description: string;
    image?: { url: string } | null;
  }[];
  SubPreview?: SubPreviewItem[];
  FAQs?: FAQ[];
};
