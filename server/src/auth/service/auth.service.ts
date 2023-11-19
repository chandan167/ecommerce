import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/service/user.service';
import { SignInDto, SignUpDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  /**
   *
   * @param signUpData
   * @returns user, token
   */
  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.createUser(signUpDto);
    const payload = {
      id: user._id,
      role: user.role,
      createAt: Date.now(),
    };
    const token = await this.generateJwtToken(payload);
    return {
      user,
      token: token,
    };
  }

  /**
   *
   * @param signInDto
   * @returns user, token
   */
  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user || !(await bcrypt.compare(signInDto.password, user.password)))
      throw new UnauthorizedException(['Invalid Credentials']);

    const payload = {
      id: user._id,
      role: user.role,
      createAt: Date.now(),
    };
    const token = await this.generateJwtToken(payload);
    return {
      user,
      token: token,
    };
  }

  private async generateJwtToken(payload: any) {
    const authToken = await this.jwtService.signAsync(payload, {
      subject: 'auth.token',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      subject: 'refresh.token',
      expiresIn: '360d',
    });

    const token = {
      authToken,
      refreshToken,
    };
    return token;
  }
}
