import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { validateSchema } from '@middleware/validation.middleware';
import { group } from '@/utils/group-routes';
import { asyncResolver } from '@/utils/async-resolver';
import { AuthController } from '@app/auth/auth.controller';
import { AuthValidation } from '@app/auth/auth.validation';



export class AuthRoute implements Routes {
    public path = '/auth';
    public router = Router();
    public authController : AuthController
    public authValidation: AuthValidation


    constructor() {
        this.authController = new AuthController()
        this.authValidation = new AuthValidation()
        this.initializeRoutes()
    }


    private initializeRoutes() {
        this.router.use(
          `${this.path}`,
          group(route => {
            route.post('/sign-up', validateSchema(this.authValidation.signUpSchema), asyncResolver(this.authController.signUp));
          }),
        );
      }
}