import { RoomRepositoryInterface } from "@modules/room/interfaces/room";
import { Room } from "@modules/room/schemas/room.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepositoryAbstract } from "@repositories/base/base.abstract.repository";
import { Model } from "mongoose";

@Injectable()
export class RoomsRepository
  extends BaseRepositoryAbstract<Room>
  implements RoomRepositoryInterface {
  constructor(
    @InjectModel(Room.name)
    private readonly RoomModel: Model<Room>,
  ) {
    super(RoomModel);
  }

}