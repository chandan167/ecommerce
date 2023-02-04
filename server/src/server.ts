import App from './app';
import AuthRoute from '@app/user/auth/auth.route';
import UsersRoute from '@app/user/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([ new UsersRoute(), new AuthRoute()]);

app.listen();
