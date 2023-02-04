import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, MONGO_URI, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN,
    REDIS_PORT, REDIS_HOST, REDIS_PASSWORD, EMAIL_FROM } = process.env;
