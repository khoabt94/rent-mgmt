
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { User } from '@modules/user/schemas/user.schema';
import { Transform } from 'class-transformer';
import { Room } from '@modules/room/schemas/room.schema';

export type AreaDocument = HydratedDocument<Area>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Area extends BaseEntity {
  @Prop({
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  })
  @Transform(({ value }: { value: string }) => value.trim())
  area_name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  user: User;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Room',
    default: []
  })
  room: string[];


  @Prop({
    required: true,
    min: 0,
  })
  electricity_unit_price: number;

  @Prop({
    required: true,
    min: 0,
  })
  water_unit_price: number;

}

export const AreaSchema = SchemaFactory.createForClass(Area);

export const AreaSchemaFactory = () => {
  const schema = AreaSchema;
  schema.plugin(require('mongoose-unique-validator'))
  return schema;
};


