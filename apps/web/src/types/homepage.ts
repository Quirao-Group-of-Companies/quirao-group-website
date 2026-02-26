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
