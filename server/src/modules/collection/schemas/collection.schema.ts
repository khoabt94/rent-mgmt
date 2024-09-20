import { BaseEntity } from '@modules/shared/base/base.entity';
import { CollectionStatuses } from '@modules/shared/constants/collection';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
})
export class Collection extends BaseEntity {
  @Prop({
    minlength: 1,
    maxlength: 50,
    required: true,
  })
  collection_name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: mongoose.Schema.Types.ObjectId

  @Prop({
    type: String,
    enum: CollectionStatuses,
    required: true,
    default: CollectionStatuses.DRAFT
  })
  status: CollectionStatuses

  @Prop({
    default: 0
  })
  amount_collect: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  })
  room: mongoose.Schema.Types.ObjectId;

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
    required: true,
  })
  end_water: number;

  @Prop({
    default: 0,
    required: true,
  })
  other_fee: number;

  @Prop({
    default: 0,
    required: true,
  })
  deduction: number;

  @Prop({
    default: 0,
    required: true,
  })
  amount_due: number;

}

export const CollectionSchema = SchemaFactory.createForClass(Collection);

export const CollectionSchemaFactory = (
) => {
  const schema = CollectionSchema;

  return schema;
};




