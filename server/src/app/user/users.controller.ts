import { NextFunction, Request, RequestHandler, Response } from 'express';
import { NotFound } from 'http-errors';
import { UserService } from '@app/user/users.service';
import { checkMongooseId, checkMongooseIds } from '@utils/helper';

export class UsersController {
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const newUser = await this.userService.createUser(user);
    return res.apiResponse.setData({ user: newUser }).sendJson();
  };

  public findByEmail: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFound('User not found');
    return res.apiResponse.setData({ user }).sendJson();
  };

  public findByEmails: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { emails } = req.body;
    const users = await this.userService.findByEmails(emails);
    return res.apiResponse.setData({ users }).sendJson();
  };

  public findByIds: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.body;
    checkMongooseIds(ids);
    const users = await this.userService.findByIds(ids);
    return res.apiResponse.setData({ users }).sendJson();
  };

  public findById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    checkMongooseId(id);
    const user = await this.userService.findById(id);
    if (!user) throw new NotFound('User not found');
    return res.apiResponse.setData({ user }).sendJson();
  };

  public findAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { pagination } = req;
    const { search } = req.query;
    let users: any = await this.userService.findAllWithCount(pagination.skip, pagination.limit, search as string);
    users = {
      ...users,
    };
    return res.apiResponse
      .setData({
        users,
      })
      .sendJson();
  };
}
