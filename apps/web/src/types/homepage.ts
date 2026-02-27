export type StrapiCTA = {
  title: string;
  href: string;
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

export type HeroItem = {
  id: number;
  title: string;
  description: string;
  image?: {
    url: string;
    alternativeText: string | null;
  } | null;
  cta?: StrapiCTA | null;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export type Achievement = {
  id: number;
  title: string;
  description: string;
  image: string | null;
};

export type AboutCard = {
  id: number;
  title: string;
  description: string;
  image?: {
    url: string;
    alternativeText: string | null;
  } | null;
};

export type SubPreviewItem = {
  id: number;
  logo?: {
    logoName?: string;
    image?: {
      url: string;
    };
  };
  description: string;
  image?: {
    url: string;
  };
  cardImage?: {
    url: string;
  };
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
    image?: {
      url: string;
      alternativeText: string | null;
    } | null;
    cta?: StrapiCTA | null;
  }[];
  Achievements?: {
    id: number;
    title: string;
    description: string;
    image?: {
      url: string;
    } | null;
  }[];
  SubPreview?: SubPreviewItem[];
  FAQs?: FAQ[];
};
