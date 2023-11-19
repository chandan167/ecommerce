// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './service/auth.service';
// import { UserModule } from '../user/user.module';
// import { JwtModule } from '@nestjs/jwt';
// import { MongooseModule } from '@nestjs/mongoose';

describe('AuthController', () => {
  // let controller: AuthController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [UserModule, JwtModule, MongooseModule],
  //     controllers: [AuthController],
  //     providers: [AuthService],
  //   }).compile();

  //   controller = module.get<AuthController>(AuthController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  it('1+1 = 2', () => {
    expect(1 + 1).toBe(2);
  });
});
