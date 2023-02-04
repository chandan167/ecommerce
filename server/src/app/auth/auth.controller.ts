import { NextFunction, Request, RequestHandler, Response } from "express";
import { EmailService } from "@app/email/services/email.service";
import { MessageTypeEnum } from "@/utils/api-response";
import { AuthService } from "@app/auth/auth.service";
import { renderToString } from "@utils/helper";


export class AuthController {
    public authService: AuthService;
    public emailService: EmailService

    constructor() {
        this.authService = new AuthService();
        this.emailService = new EmailService();
    }

    public signUp: RequestHandler = async (req:Request, res: Response, next: NextFunction) =>{
        const user = req.body;
        // const newUser = await this.authService.signUp(user);
        const template:any = await renderToString('home', {name: 'Chandan Singh'})
        this.emailService.sendSignUpEmail({to: user.email, subject: 'Signup Email', html: template})
        return res.apiResponse.setMessage(`We will send email confirmation mail on ${user.email} please check your inbox`, MessageTypeEnum.SUCCESS).sendJson()
    }
}