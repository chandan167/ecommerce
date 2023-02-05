import { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } from '@config/env.config';

export const queueConnection: any = {
  redis: { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASSWORD },
};
