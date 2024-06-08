import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
const dbUrl =
  process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL_CONFIG ||
  "postgresql://namazegdb_owner:BchkDRv1EQd0@ep-morning-sky-a236jwn4.eu-central-1.aws.neon.tech/namazegdb?sslmode=require";

console.log("db", process.env.NEXT_PUBLIC_GEMINI_API_KEY);
if (!dbUrl) {
  throw new Error("Database URL configuration is missing");
}

export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
