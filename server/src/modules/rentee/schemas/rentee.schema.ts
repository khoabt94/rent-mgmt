import { RoomDocument } from '@modules/room/schemas/room.schema';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { HydratedDocument, Model, Schema as SchemaType } from 'mongoose';

export type RenteeDocument = HydratedDocument<Rentee>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
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

export const RenteeSchemaFactory = (
  roomDocument: Model<RoomDocument>,
) => {
  const schema = RenteeSchema;

  const replaceRentee = async (roomId: SchemaType.Types.ObjectId, renteeId: any, next: mongoose.CallbackWithoutResultAndOptionalError) => {
    const findRoomIn = await roomDocument.findById(roomId)
    if (!findRoomIn) return next()

    if (!(findRoomIn.rentees.find(r => r === renteeId))) {
      findRoomIn.rentees.push(renteeId)
      findRoomIn.save()
    }

    const findRoomOut = await roomDocument.findOne({
      rentees: renteeId
    })
    if (findRoomOut) {
      findRoomOut.rentees = findRoomOut.rentees.filter(r => r === renteeId)
      findRoomOut.save()
    }
  }

  schema.pre('save', async function (next) {
    if (!this.room) return next();

    await replaceRentee(this.room, this._id, next)

    next();
  })

  schema.pre('findOneAndUpdate', async function (next) {
    const d: any = this.getUpdate()
    const q: any = await this.model.findOne(this.getQuery())
    if (!d.room) return next();
    await replaceRentee(d.room, q._id, next)

    next();
  })

  return schema;
};



