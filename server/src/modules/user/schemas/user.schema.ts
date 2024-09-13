
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { BaseEntity } from '@modules/shared/base/base.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User extends BaseEntity {
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

  @Prop({
    default:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  })
  avatar: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaFactory = () => {
  const schema = UserSchema;

  schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 8)
    next()
  })
  return schema;
};




