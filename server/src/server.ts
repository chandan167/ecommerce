import App from './app';
import UsersRoute from '@app/user/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new UsersRoute()]);

app.listen();
