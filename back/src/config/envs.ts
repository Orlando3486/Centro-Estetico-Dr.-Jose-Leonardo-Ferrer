import "dotenv/config";

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

export const DATABASE_URL: string | undefined = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : "postgresql://orlando:KAWg0SZrMFJVKyNc1rC0u4qzPp1ES02b@dpg-d3bghgruibrs73femd20-a/consultorioesteticojl";

export const DB_HOST: string | undefined = process.env.DB_HOST
  ? process.env.DB_HOST
  : "localhost";

export const DB_PORT: number = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : 5432;

export const DB_USERNAME: string | undefined = process.env.DB_USERNAME;

export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;

export const DB_DATABASE: string | undefined = process.env.DB_DATABASE;

export const DB_SYNCHRONIZE: boolean = process.env.DB_SYNCHRONIZE
  ? process.env.DB_SYNCHRONIZE === "true"
  : true;

export const DB_DROP: boolean = process.env.DB_DROP
  ? process.env.DB_DROP === "true"
  : true;

export const DB_LOGGING: boolean = process.env.DB_LOGGING
  ? process.env.DB_LOGGING === "true"
  : true;

export const EMAIL_USER: string | undefined = process.env.EMAIL_USER;

export const EMAIL_PASS: string | undefined = process.env.EMAIL_PASS;

export const SENDGRID_API_KEY: string | undefined =
  process.env.SENDGRID_API_KEY;
