
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    minlength: 5,
    maxlength: 50
  })
  username: string;

  @IsEmail()
  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    required: true,
    length: 6,
    select: false
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 8)
  next()
})
