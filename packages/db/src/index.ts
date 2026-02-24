// packages/db/index.ts

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../drizzle/schema';

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, { prepare: false });

// This EXPORT is what makes it a module
export const db = drizzle(client, { schema });

export * from 'drizzle-orm';
export * from '../drizzle/schema';

export type Article = InferSelectModel<typeof schema.articles>;
export type NewArticle = InferInsertModel<typeof schema.articles>;
