import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3001,

  DATABASE_URL: process.env.DATABASE_URL,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
};
