

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { Transform } from 'class-transformer';
import { Area } from '@modules/area/schemas/area.schema';
import { Room } from '@modules/room/schemas/room.schema';
import { User } from '@modules/user/schemas/user.schema';

export type RenteeDocument = HydratedDocument<Rentee>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Rentee extends BaseEntity {
  @Prop({
    required: true,
    maxlength: 12,
    unique: true,
  })
  @Transform(({ value }: { value: string }) => value.trim())
  rentee_id: string;

  @Prop({
    required: true,
    minlength: 1,
    maxlength: 50,
  })
  @Transform(({ value }: { value: string }) => value.trim())
  rentee_name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: mongoose.Schema.Types.ObjectId

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  })
  room: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    virtual: true
  })
  area: mongoose.Schema.Types.ObjectId

  @Prop({
    required: true,
  })
  image_url: string

  @Prop({
    required: true,
  })
  address: string

  @Prop({
    required: true,
  })
  dob: string
}

export const RenteeSchema = SchemaFactory.createForClass(Rentee);




