import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './service/auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Controller('user/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const signUpData = await this.authService.signUp(signUpDto);
    return signUpData;
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const signInData = await this.authService.signIn(signInDto);
    return signInData;
  }
}
