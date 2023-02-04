import { hasNextPage } from '@utils/helper';
import userModel, { User } from '@app/user/users.model';

export class UserService {
  public users = userModel;

  createUser(user: User) {
    return this.users.create(user);
  }

  findByEmail(email: string) {
    return this.users.findOne({ email });
  }

  findByPhone(phone: string) {
    return this.users.findOne({ phone });
  }

  findByEmails(emails: [String]) {
    return this.users.find({
      email: { $in: emails },
    });
  }

  findByIds(ids: [String]) {
    return this.users.find({
      _id: { $in: ids },
    });
  }

  findById(id: string) {
    return this.users.findById(id);
  }

  async findAllWithCount(skip:number = 0, limit: number = undefined, search: string = undefined) {
    const searchKey = ['firstName', 'lastName', 'email', 'phone'];
    let filter = {};
    if (search) {
      filter = {
        ...filter,
        $or: searchKey.map(key => {
          return {
            [key]: {
              $regex: search,
              $options: 'i',
            },
          };
        }),
      };
    }
    const [users, count] = await Promise.all([
      this.users.find(
        filter,
        {},
        {
          skip: skip,
          limit: limit,
          sort: { createdAt: 'desc' },
        },
      ),
      this.users.find().count(filter),
    ]);
    return {
      data: users,
      count: count,
      hasNextPage: hasNextPage(skip, limit, count),
    };
  }
}
