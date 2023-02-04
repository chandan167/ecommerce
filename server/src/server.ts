import App from './app';
import { UsersRoute } from '@app/user/users.route';
import { AuthRoute } from '@app/auth/auth.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
    new UsersRoute(),
    new AuthRoute()
], '/api');

app.listen();
