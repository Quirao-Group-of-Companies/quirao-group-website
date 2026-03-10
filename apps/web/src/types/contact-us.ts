import type { StrapiCTA } from './strapi-shared';

export type StrapiImage = {
  url: string;
  alternativeText?: string | null;
};

export type ContactInfo = {
  id: number;
  subName: string;
  description?: string | null;
  address: string;
  contactNum: string;
  email: string;
  logo?: {
    image: StrapiImage;
  } | null;
  cardImage?: StrapiImage | null;
  displayImage?: StrapiImage | null;
  cta?: StrapiCTA | null;
};

export type ContactUsData = {
  qgcText?: {
    title: string;
    description: string;
  };
  qgcContacts?: ContactInfo;
  subsContacts?: ContactInfo[];
};
