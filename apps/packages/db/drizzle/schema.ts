import { sql } from 'drizzle-orm';
import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const articleCategory = pgEnum('article_category', [
  'News',
  'Announcement',
  'Industry Insight',
  'etc...',
]);

export const articles = pgTable(
  'articles',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    title: varchar().notNull(),
    slug: varchar().notNull(),
    authorName: varchar('author_name'),
    excerpt: text(),
    contentBody: text('content_body'),
    coverImage: varchar('cover_image'),
    contentMedia: jsonb('content_media'),
    publishedAt: timestamp('published_at', { withTimezone: true, mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
  },
  (table) => [unique('articles_slug_key').on(table.slug)],
);

export const inquiries = pgTable('inquiries', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  subject: varchar(),
  message: text().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const applicationForms = pgTable('application_forms', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  fullName: varchar('full_name').notNull(),
  email: varchar().notNull(),
  phone: varchar(),
  address: text(),
  resumeFile: varchar('resume_file').notNull(),
  coverLetter: text('cover_letter'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries);
export const insertApplicationSchema = createInsertSchema(applicationForms);
export type Inquiry = z.infer<typeof insertInquirySchema>;
