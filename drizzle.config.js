import { defineConfig } from "drizzle-kit";

console.log("Database URL:", "postgresql://neondb_owner:s4viRhNe3DSz@ep-icy-waterfall-a5nfdxkr.us-east-2.aws.neon.tech/Expenses?sslmode=require");  // Check if the URL is correctly loaded

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    url:"postgresql://neondb_owner:s4viRhNe3DSz@ep-icy-waterfall-a5nfdxkr.us-east-2.aws.neon.tech/Expenses?sslmode=require",  // Database URL from .env
  },
});