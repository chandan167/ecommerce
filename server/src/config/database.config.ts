import { MONGO_URI } from '@config/env.config';

export const dbConnection: any = {
  url: MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
