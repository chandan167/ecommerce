import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  User = 'User', //or User = "user",
  Admin = 'Admin', // or Admin = "admin",
  Seller = 'Seller', // pr Seller = "seller"
}

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      ret.id = ret._id;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  emailVerifyAt: Date;

  @Prop({ index: true, default: null })
  phone: string;

  @Prop({ default: null })
  phoneVerifyAt: Date;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: String, enum: Role, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
