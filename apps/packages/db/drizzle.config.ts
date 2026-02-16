// packages/db/drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import path from "path";

// Resolves to: current_folder/../../../.env
// Adjust the "../" count if your folder structure is different
const envPath = path.resolve(__dirname, "../../../.env"); 

dotenv.config({ path: envPath });

// DEBUG: Verify it is loading (Remove this later)
console.log(`Loading .env from: ${envPath}`);
console.log(`Database URL found: ${!!process.env.DATABASE_URL}`);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing! Check the path above.");
}

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});