import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  const testUser = {
    name: 'test',
    email: 'test@gmail.com',
    phone: null,
    password: 'password',
  };
  beforeEach(async () => {
    const userServiceMock = {
      createUser: jest.fn((data) => ({ _id: 'test_id', ...data })),
    };
    const jwtServiceMock = {
      signAsync: jest.fn(() => 'test_jwt_token'),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be signUp defined', () => {
    expect(service.signUp).toBeDefined();
  });

  it('should be call signUp method', () => {
    const user = service.signUp(testUser);
    expect(user).toBeTruthy();
  });

  it('should be signIn defined', () => {
    expect(service.signIn).toBeDefined();
  });
});
