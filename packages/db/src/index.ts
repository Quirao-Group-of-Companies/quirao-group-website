// packages/db/src/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../drizzle/schema";

// Use the DATABASE_URL from your root .env
const connectionString = process.env.DATABASE_URL!;

/**
 * For Supabase, we use the postgres-js driver.
 * We disable 'prepare' because Supabase's connection pooler 
 * (the one on port 6543/5432) works better with it off.
 */
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });

// Export everything from schema so we can use it in our apps
export * from "../drizzle/schema";
export * from "drizzle-orm";