import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGO_URI: str(),
    REDIS_PORT: port(),
    REDIS_HOST: str(),
    REDIS_PASSWORD: str(),
  });
};

export default validateEnv;
