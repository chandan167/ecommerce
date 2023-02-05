import { v4 as uuidV4 } from 'uuid';
import { DateUtil } from '@utils/data';
import forgotPasswordModel from '@app/forgot-password/forgot-password.model';
import { ForgotPasswordEnum } from '@app/forgot-password/forgot-password.enum';

export class ForgotPasswordService {
  public forgotPassword = forgotPasswordModel;

  private otp: number | null = null;
  private token: string | null = null;
  private email: string | null = null;
  private phone: string | null = null;
  private userId: string | null = null;
  private expireAt: Date | number | null = null;
  private recordType: string | null = null;

  setOtp(otp: number): this {
    this.otp = otp;
    return this;
  }

  setToken(token: string): this {
    this.token = token;
    return this;
  }

  get AllRecordType() {
    return ForgotPasswordEnum;
  }

  setRecordType(recordType: ForgotPasswordEnum): this {
    this.recordType = recordType;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    this.phone = null;
    return this;
  }

  setPhone(phone: string): this {
    this.email = null;
    this.phone = phone;
    return this;
  }

  setUserId(userId: string | any): this {
    this.userId = userId;
    return this;
  }

  generateExpireAt(minute = 10) {
    this.expireAt = DateUtil.addMinutes(minute);
    return this.expireAt;
  }

  generateToken() {
    this.token = uuidV4();
    return this.token;
  }

  allClear() {
    this.otp = null;
    this.email = null;
    this.expireAt = null;
    this.phone = null;
    this.userId = null;
    this.token = null;
    this.recordType = null;
  }

  async generateForgotPassword() {
    const filter: any = {
      userId: this.userId,
    };
    if (this.email) {
      filter.email = this.email;
    } else {
      filter.phone = this.phone;
    }
    await this.forgotPassword.deleteMany(filter);
    this.generateExpireAt();
    this.generateToken();
    const forgetPasswordData = await this.forgotPassword.create(this);
    this.allClear();
    return forgetPasswordData;
  }

  async findTokenByEmail(email: string, token: string) {
    return await this.forgotPassword.findOne({ email, token });
  }
}
