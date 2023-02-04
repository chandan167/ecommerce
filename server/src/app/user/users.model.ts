import { Password } from '@utils/password';
import { model, Schema, Document, InferSchemaType } from 'mongoose';
import { RoleEnum } from '@app/user/role';

const password = new Password();

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerifiedAt :{
    type: Date,
  },
  phone: {
    type: String,
    index: true,
  },
  phoneVerifiedAt :{
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: RoleEnum,
    default: RoleEnum.CUSTOMER
  }
},{
  timestamps: true,
  toJSON: {
    transform(doc, ret){
      delete ret.__v;
      delete ret.password
      ret.id = ret._id;
      return ret
    }
  },
  toObject: {
    transform(doc, ret){
      ret.id = ret._id;
      return ret
    }
  }
});
export type User = InferSchemaType<typeof userSchema>;

userSchema.pre('save', async function(next) {
  if(this.isModified('password')){
    this.password = await password.hash(this.password)
  }
  next()
})

const userModel = model('User', userSchema);

export default userModel;
