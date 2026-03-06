import type { ContactItem } from './strapi-shared';

export type ContactUsPageData = {
  qgcText?: {
    id: number;
    title: string;
    description: string;
  };
  qgcContacts?: ContactItem; // Single Component (main office)
  subsContacts?: ContactItem[]; // Repeatable Component (branches)
};
