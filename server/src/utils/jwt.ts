import { JWT_EXPIRE, JWT_REFRESH_EXPIRE } from '@config/env.config';
import fs from 'fs';
import Jwt from 'jsonwebtoken';

export class JwtUtil {
  static privateKey = fs.readFileSync('cert/private.key');
  static publicKey = fs.readFileSync('cert/public.key');

  static generateToken(payload: Record<string, any>, audience: any) {
    return {
      authToken: this.generateAuthToken(payload, audience),
      refreshToken: this.generateRefreshToken(payload, audience),
    };
  }

  static generateAuthToken(payload: Record<string, any>, audience: any, expiresIn: string | null = JWT_EXPIRE) {
    return Jwt.sign(payload, this.privateKey, {
      expiresIn: expiresIn,
      audience: audience,
      subject: 'auth.token',
      algorithm: 'RS256',
    });
  }

  static generateRefreshToken(payload: Record<string, any>, audience: any, expiresIn: string | null = JWT_REFRESH_EXPIRE) {
    return Jwt.sign(payload, this.privateKey, {
      expiresIn: expiresIn,
      audience: audience,
      subject: 'refresh.token',
      algorithm: 'RS256',
    });
  }

  static verifyAuthToken(token: string, audience: any) {
    return Jwt.verify(token, this.publicKey, {
      audience: audience,
      subject: 'auth.token',
      algorithms: ['RS256'],
    });
  }

  static verifyRefreshToken(token: string, audience: any) {
    return Jwt.verify(token, this.publicKey, {
      audience: audience,
      subject: 'refresh.token',
      algorithms: ['RS256'],
    });
  }
}
