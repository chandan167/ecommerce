import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGO_URI: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    REDIS_PORT: port(),
    REDIS_HOST: str(),
    REDIS_PASSWORD: str(),
    EMAIL_FROM: str(),
    JWT_EXPIRE: str(),
    JWT_REFRESH_EXPIRE: str(),
    EMAIL_VERIFY_LINK: str(),
  });
};

export default validateEnv;
