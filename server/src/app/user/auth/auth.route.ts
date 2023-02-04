import { Router } from 'express';
import AuthController from '@app/user/auth/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@app/user/auth/middleware/auth.middleware';
import validationMiddleware from '@middleware/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`,  this.authController.signUp);
    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
