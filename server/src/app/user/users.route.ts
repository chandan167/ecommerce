import { Router } from 'express';
import { UsersController } from '@app/user/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { validateSchema } from '@middleware/validation.middleware';
import { group } from '@/utils/group-routes';
import { asyncResolver } from '@/utils/async-resolver';
import { UserValidation } from '@app/user/user.validation';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController: UsersController;
  public userValidation: UserValidation;

  constructor() {
    this.usersController = new UsersController();
    this.userValidation = new UserValidation();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(
      `${this.path}`,
      group(route => {
        route.post('/', validateSchema(this.userValidation.createSchema), asyncResolver(this.usersController.createUser));
        route.get('/', asyncResolver(this.usersController.findAll));
        route.get('/find-by-email/:email', validateSchema(this.userValidation.findByEmailSchema), asyncResolver(this.usersController.findByEmail));
        route.post('/find-by-emails', validateSchema(this.userValidation.findByEmailsSchema), asyncResolver(this.usersController.findByEmails));
        route.post('/find-by-ids', validateSchema(this.userValidation.findByIdsSchema), asyncResolver(this.usersController.findByIds));
        route.get('/:id', asyncResolver(this.usersController.findById));
      }),
    );
  }
}

export default UsersRoute;
