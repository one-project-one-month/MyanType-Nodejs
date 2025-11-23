import { defineConfig } from "@prisma/config";
import { mysqlAdapter } from "@prisma/adapter-mysql";

export default defineConfig({
  schema: "./prisma/schema.prisma",

  datasource: {
    db: {
      adapter: mysqlAdapter(process.env.DATABASE_URL),
    },
  },
});
