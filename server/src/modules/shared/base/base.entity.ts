import { Prop } from '@nestjs/mongoose';

export class BaseEntity {
  _id?: string;

  created_at: Date
  updated_at: Date
}