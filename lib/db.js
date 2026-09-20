import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  throw new Error(
    'Database connection string is missing. Add DATABASE_URL or DATABASE_URL_UNPOOLED in Vercel Environment Variables.'
  );
}

export const sql = neon(connectionString);
