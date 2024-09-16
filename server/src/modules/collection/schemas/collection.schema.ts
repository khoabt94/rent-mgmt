import { BaseEntity } from '@modules/shared/base/base.entity';
import { CollectionStatuses } from '@modules/shared/constants/collection';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CollectionItem } from '@modules/collection/schemas/item.schema';

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
  })
  status: CollectionStatuses

  @Prop({
    default: 0
  })
  total_amount_collect: number;

  @Prop({ type: [CollectionItem] })
  collection_items: CollectionItem[]

}

export const CollectionSchema = SchemaFactory.createForClass(Collection);

export const CollectionSchemaFactory = (
) => {
  const schema = CollectionSchema;

  return schema;
};




