import { Test, TestingModule } from '@nestjs/testing';

import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserService } from './user.service';
import { User, UserDocument } from '../schema/user.schema';
import { ConfigService } from '@nestjs/config';

describe('UserService', () => {
  let service: UserService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let user: Model<UserDocument>;

  const testUser = {
    name: 'test',
    email: 'test@gmail.com',
    phone: null,
    password: 'password',
  };
  beforeEach(async () => {
    const userMockRepo = {
      findOne: jest.fn(() => null),
      create: jest.fn((data) => data),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: userMockRepo, // <-- Use the Model Class from Mongoose
        },
        ConfigService,
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    user = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined the findByEmail', () => {
    expect(service.findByEmail).toBeDefined();
  });

  it('should be call the findOne method in model', async () => {
    const user = await service.findByEmail('test@gmail.com');
    expect(user).toBeFalsy();
  });

  it('should be defined the createUser', () => {
    expect(service.createUser).toBeDefined();
  });

  it('should be create user', async () => {
    const newUser = await service.createUser(testUser);
    expect(newUser).toBeTruthy();
  });
});
