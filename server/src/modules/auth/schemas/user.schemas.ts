import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from "@nestjs/common";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  avatar: string;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);

UserSchema.pre('save', async function (next: NextFunction) {
  if (!this?.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8);
  next()
})

UserSchema.post('save', async function (error, _doc, next: NextFunction) {
  if (error.name === 'ValidationError') {
    throw new BadRequestException(error.message);
  } else {
    next();
  }
})