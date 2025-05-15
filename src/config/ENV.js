import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3001,

  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,

  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
};
