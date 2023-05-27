import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { HydratedDocument } from 'mongoose';
import { IsEmail } from 'class-validator';

export type AuthDocument = HydratedDocument<User>;

export enum Role {
  Guest = 'guest',
  SubAdmin = 'sub_admin',
  Admin = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  storename: string;

  @Prop({ required: true, unique: true })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.Guest })
  role: Role;
}

export const UserSchema =
  SchemaFactory.createForClass(User).plugin(uniqueValidator);
