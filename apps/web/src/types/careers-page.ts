import type {
  AboutUsSection,
  ContactItem,
  HighlightSection,
  LogoComponent,
  StrapiCTA,
  StrapiImage,
} from './strapi-shared';

export type SubsidiaryItem = {
  id: number;
  subName: string;
  description: string;
  image: StrapiImage | null;
  logo: LogoComponent | null;
  cta: StrapiCTA | null;
  cardImage: StrapiImage | null;
};

export type CareersPageData = {
  heroSection?: {
    id: number;
    title: string;
    description: string;
    cta: StrapiCTA | null;
    image: StrapiImage | null;
    logo: LogoComponent | null;
  };
  overview?: AboutUsSection;
  overviewVideo?: StrapiCTA | null;
  subsidiaryOverview?: SubsidiaryItem[]; // Repeatable Component (Sub Preview)
  valuesSection?: HighlightSection;
  whyJoinUs?: HighlightSection;
  subContacts?: ContactItem[];
};
