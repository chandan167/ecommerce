import { NextFunction, Request, RequestHandler, Response } from 'express';
import { NotFound } from 'http-errors';
import { EmailService } from '@app/email/services/email.service';
import { MessageTypeEnum } from '@/utils/api-response';
import { AuthService } from '@app/auth/auth.service';
import { ForgotPasswordService } from '@app/forgot-password/forgot-password.service';
import { JwtUtil } from '@utils/jwt';
import { UserService } from '@app/user/users.service';
import { EMAIL_VERIFY_LINK } from '@config/env.config';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
  public authService: AuthService;
  public emailService: EmailService;
  public forgotPasswordService: ForgotPasswordService;
  public userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.emailService = new EmailService();
    this.forgotPasswordService = new ForgotPasswordService();
    this.userService = new UserService();
  }

  public signUp: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
    const user = req.body;
    // CREATE NEW USER
    const newUser = await this.authService.signUp(user);

    // SEND EMAIL
    await this.sendEmailVerificationLink(newUser);

    // GENERATE AUTH AND REFRESH TOKEN
    const client = req.headers['user-agent'];
    const token = JwtUtil.generateToken({ id: newUser._id }, client);
    return res.apiResponse
      .setMessage(`We will send email confirmation mail on ${newUser.email} please check your inbox`, MessageTypeEnum.SUCCESS)
      .setData({ token }).setStatus(StatusCodes.CREATED)
      .sendJson();
  };

  public reSendEmailVerificationLink: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await this.userService.findByEmail(email as string);
    if (!user) throw new NotFound('User not found');
    // SEND EMAIL
    await this.sendEmailVerificationLink(user);
    return res.apiResponse
      .setMessage(`We will send email confirmation mail on ${user.email} please check your inbox`, MessageTypeEnum.SUCCESS)
      .sendJson();
  };

  public verifyEmail: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, token } = req.query;
    if (email && token) {
      const forgotPassword = await this.forgotPasswordService.findTokenByEmail(email as string, token as string);
      if (!forgotPassword) {
        return res.render('expire-link');
      }
      if (!forgotPassword.verifyExpireAt()) {
        await forgotPassword.delete();
      } else {
        const user = await this.userService.findByEmail(email as string);
        console.log(user);
        if (user) {
          user.verifyEmail();
          await user.save();
        }
      }
      await forgotPassword.delete();
    }
    return res.render('expire-link');
  };

  private sendEmailVerificationLink = async (user: any) => {
    // GENERATE EMAIL VERIFY TOKEN
    this.forgotPasswordService.setEmail(user.email).setUserId(user._id).setRecordType(this.forgotPasswordService.AllRecordType.EMAIL_VERIFY);
    const forgotPasswordData = await this.forgotPasswordService.generateForgotPassword();

    // GENERATE EMAIL TEMPLATE
    this.emailService
      .clearAll()
      .addHeading('Welcome to My Shop')
      .addLine('Please click below button or link and verify your email.')
      .addLine('Link will be expire soon')
      .addButton('Click here', `${EMAIL_VERIFY_LINK}?token=${forgotPasswordData.token}&email=${user.email}`);

    const template = await this.emailService.generateTemplate();

    // SEND EMAIL
    this.emailService.sendSignUpEmail({ to: user.email, subject: 'Verify Email | MY SHOP', html: template });
  };
}
