import userModel, { User } from '@app/user/users.model';

export class AuthService {
  public users = userModel;

  signUp(user: User) {
    return this.users.create(user);
  }
}
