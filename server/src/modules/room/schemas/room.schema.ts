
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { Transform } from 'class-transformer';
import { Area } from '@modules/area/schemas/area.schema';
import { Rentee } from '@modules/rentee/schemas/rentee.schema';

export type RoomDocument = HydratedDocument<Room>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Room extends BaseEntity {
  @Prop({
    required: true,
    minlength: 1,
    maxlength: 50,
    unique: true,
  })
  @Transform(({ value }: { value: string }) => value.trim())
  room_name: string;

  @Prop({
    required: true,
    min: 1,
  })
  rent_fee: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    required: true
  })
  area: Area;

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rentee',
    }],
  })
  rentees: Rentee[];

}

export const RoomSchema = SchemaFactory.createForClass(Room);


export const RoomSchemaFactory = () => {
  const schema = RoomSchema;
  return schema;
};



