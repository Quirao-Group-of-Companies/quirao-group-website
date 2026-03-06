import type { StrapiImage } from './strapi-shared';

export type Article = {
  id: number;
  title: string;
  slug: string;
  author_name: string;
  excerpt: string;
  content_body: unknown[]; // Rich text (Blocks)
  cover_image: StrapiImage | null;
  content_media: StrapiImage[]; // Multiple Media
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ArticleListData = {
  articles: Article[];
};
