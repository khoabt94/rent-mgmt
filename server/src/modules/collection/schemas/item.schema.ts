import { RoomDocument } from '@modules/room/schemas/room.schema';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { CollectionItemStatuses, CollectionStatuses } from '@modules/shared/constants/collection';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { HydratedDocument, Model, Schema as SchemaType } from 'mongoose';

export type CollectionItemDocument = HydratedDocument<CollectionItem>;

@Schema()
export class CollectionItem extends BaseEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  })
  room: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    required: true
  })
  area: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    enum: CollectionItemStatuses,
    required: true,
  })
  status: CollectionItemStatuses

  @Prop({
    required: true,
    min: 1,
  })
  rent_fee: number;

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

  @Prop({
    required: true,
    min: 0,
  })
  begin_electricity: number;

  @Prop({
    default: 0,
    min: 0,
  })
  end_electricity: number;

  @Prop({
    required: true,
    min: 0,
  })
  begin_water: number;

  @Prop({
    default: 0,
    min: 0,
  })
  end_water: number;

  @Prop({
    default: 0
  })
  other_fee: number;

  @Prop({
    default: 0
  })
  amount_due: number;

  @Prop({
    default: 0
  })
  deduction: number;

  @Prop({
    default: 0
  })
  total_amount_due: number;
}

export const CollectionItemSchema = SchemaFactory.createForClass(CollectionItem);




