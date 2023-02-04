import { ValidationChain, body, param } from 'express-validator';
import { UserService } from '@app/user/users.service';
import { checkMongooseId } from '@utils/helper';

const userService = new UserService();
export class UserValidation {
  public createSchema: ValidationChain[] = [
    body('firstName').trim().notEmpty().withMessage('First name is required').bail(),
    body('lastName').trim().optional({ nullable: true, checkFalsy: true }).bail(),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .bail()
      .normalizeEmail()
      .isEmail()
      .withMessage('Enter valid email-id')
      .bail()
      .custom(async email => {
        const user = await userService.findByEmail(email);
        if (user) return Promise.reject('E-mail already in use');
        return true;
      }),
    body('phone')
      .trim()
      .optional({ nullable: true, checkFalsy: true })
      .bail()
      .custom(phone => {
        if (phone) {
          const user = userService.findByPhone(phone);
          if (user) return Promise.reject('Phone already in use');
          return true;
        }
      }),
    body('password').trim().notEmpty().withMessage('Password is required').bail(),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ];

  public findByEmailSchema: ValidationChain[] = [
    param('email').trim().notEmpty().withMessage('Email is required').bail().normalizeEmail().isEmail().withMessage('Enter valid email-id').bail(),
  ];

  public findByEmailsSchema: ValidationChain[] = [
    body('emails').isArray().withMessage('emails is list of email').bail(),
    body('emails.*').trim().notEmpty().withMessage('email is required').normalizeEmail().isEmail().withMessage('Enter valid email-id').bail(),
  ];

  public findByIdsSchema: ValidationChain[] = [
    body('ids').isArray().withMessage('Ids is list of id').bail(),
    body('ids.*')
      .trim()
      .notEmpty()
      .withMessage('Id is required')
      .bail()
      .custom(id => {
        return checkMongooseId(id);
      }),
  ];

  public findByIdSchema: ValidationChain[] = [
    body('id')
      .trim()
      .notEmpty()
      .withMessage('Id is required')
      .bail()
      .custom(id => {
        return checkMongooseId(id);
      }),
  ];
}
