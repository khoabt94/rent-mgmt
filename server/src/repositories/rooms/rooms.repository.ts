import { GetAllResponse } from "@interfaces/common";
import { RoomRepositoryInterface } from "@modules/room/interfaces/room";
import { Room } from "@modules/room/schemas/room.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepositoryAbstract } from "@repositories/base/base.abstract.repository";
import { FilterQuery, Model, QueryOptions } from "mongoose";
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

  async getOneByQuery(condition = {}): Promise<Room> {
    return await this.RoomModel
      .findOne(condition)
      .populate('rentees', 'rentee_name')
      .populate('area')
      .exec();
  }

  async getOneById(id: string): Promise<Room> {
    return await this.RoomModel
      .findById(id)
      .populate('rentees', 'rentee_name')
      .populate('area')
      .exec();
  }

  async getManyByQuery(
    condition: FilterQuery<Room>,
    options?: QueryOptions<Room>,
  ): Promise<GetAllResponse<Room>> {
    const [count, items] = await Promise.all([
      this.RoomModel.countDocuments(condition),
      this.RoomModel.find(condition, options?.projection, options).populate('rentees area', 'rentee_name').populate('area'),
    ]);


    return {
      total: count,
      items,
    };
  }
}