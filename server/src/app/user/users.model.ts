import { Password } from '@utils/password';
import { model, Schema, Document, InferSchemaType, Model } from 'mongoose';
import { RoleEnum } from '@app/user/role';
import { DateUtil } from '@utils/data';

const password = new Password();

interface IUserMethods {
  verifyEmail(): boolean;
}

type UserModel = Model<{}, {}, IUserMethods>;

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },
    phone: {
      type: String,
      index: true,
      default: null,
    },
    phoneVerifiedAt: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: RoleEnum,
      default: RoleEnum.CUSTOMER,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.password;
        ret.id = ret._id;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id;
        return ret;
      },
    },
  },
);

userSchema.method('verifyEmail', function verifyEmail() {
  this.emailVerifiedAt = DateUtil.now();
});

export type User = InferSchemaType<typeof userSchema>;

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await password.hash(this.password);
  }
  next();
});

const userModel = model('User', userSchema);

export default userModel;
