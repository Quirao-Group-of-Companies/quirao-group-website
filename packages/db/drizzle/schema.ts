import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// --- TABLE DEFINITIONS ---
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
    contentImages: jsonb('content_images'),
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
  sss: boolean('sss').default(false).notNull(),
  philhealth: boolean('philhealth').default(false).notNull(),
  pagIbig: boolean('pag_ibig').default(false).notNull(),
});

// --- ZOD SCHEMAS ---

// Inquiries Schema
export const insertInquirySchema = createInsertSchema(inquiries, {
  id: z.string().optional(),
  createdAt: z.string().optional(),
  email: z.string().email(),
});

// Application Forms Schema
export const insertApplicationSchema = createInsertSchema(applicationForms, {
  id: z.string().optional(),
  createdAt: z.string().optional(),
  email: z.string().email(),
});

export type Inquiry = z.infer<typeof insertInquirySchema>;
export type Application = z.infer<typeof insertApplicationSchema>;
