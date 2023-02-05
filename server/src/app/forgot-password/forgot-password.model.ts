import { model, Schema, Document, InferSchemaType, Model } from 'mongoose';
import { ForgotPasswordEnum } from '@app/forgot-password/forgot-password.enum';
import { DateUtil } from '@utils/data';

interface IForgetPasswordMethods {
  verifyExpireAt(): boolean;
}

type ForgotPasswordModel = Model<{}, {}, IForgetPasswordMethods>;

const forgotPasswordSchema: Schema = new Schema<{}, {}, ForgotPasswordModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
      unique: true,
    },
    email: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
      index: true,
    },
    expireAt: {
      type: Number,
      require: true,
    },
    token: {
      type: String,
      index: true,
    },
    otp: {
      type: Number,
    },
    recordType: {
      type: String,
      enum: ForgotPasswordEnum,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
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
export type ForgotPassword = InferSchemaType<typeof forgotPasswordSchema>;

// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await password.hash(this.password);
//   }
//   next();
// });

forgotPasswordSchema.method('verifyExpireAt', function verifyExpireAt() {
  return DateUtil.now() < this.expireAt;
});

const forgotPasswordModel = model('ForgotPassword', forgotPasswordSchema);

export default forgotPasswordModel;
