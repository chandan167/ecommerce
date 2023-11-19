import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    // check email is exist or not
    const userExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExist) throw new ConflictException(['Email already exist']);

    if (createUserDto.phone) {
      // check phone is exist or not
      const userExist = await this.userModel.findOne({
        phone: createUserDto.phone,
      });
      if (userExist) throw new ConflictException(['Phone already exist']);
    }
    // create new user
    const saltOrRounds = await bcrypt.genSalt(
      this.configService.get<number>('password.salt'),
    );
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const newUser = this.userModel.create(createUserDto);
    return newUser;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
