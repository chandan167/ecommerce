import { NODE_ENV, EMAIL_FROM } from '@config/env.config';
import nodemailer from 'nodemailer';

export interface EmailOption {
  to: string; // list of receivers
  subject: string; // Subject line
  text?: string; // plain text body
  html?: string; // html body
}
export async function sendMail(emailOption: EmailOption) {
  const testAccount = await nodemailer.createTestAccount();
  let transporter = null;
  // create reusable transporter object using the default SMTP transport
  if (NODE_ENV == 'development' || NODE_ENV == 'test') {
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  } else {
  }

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: EMAIL_FROM, // sender address
    to: emailOption.to, // list of receivers
    subject: emailOption.subject, // Subject line
    text: emailOption.text, // plain text body
    html: emailOption.html, // html body
  });

  if (NODE_ENV == 'development' || NODE_ENV == 'test') {
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    info.previewUrl = nodemailer.getTestMessageUrl(info);
  }
  return info;
}
