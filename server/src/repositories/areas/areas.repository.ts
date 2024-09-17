import { GetAllResponse } from '@interfaces/common';
import { AreaRepositoryInterface } from '@modules/area/interfaces/area';
import { Area } from '@modules/area/schemas/area.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepositoryAbstract } from "@repositories/base/base.abstract.repository";
import { FilterQuery, Model, QueryOptions } from "mongoose";

@Injectable()
export class AreasRepository
  extends BaseRepositoryAbstract<Area>
  implements AreaRepositoryInterface {
  constructor(
    @InjectModel(Area.name)
    private readonly areaModel: Model<Area>,
  ) {
    super(areaModel);
  }
  async getManyByQuery(
    condition: FilterQuery<Area>,
    options?: QueryOptions<Area>,
  ): Promise<GetAllResponse<Area>> {
    const [count, items] = await Promise.all([
      this.areaModel.countDocuments(condition),
      this.areaModel.find(condition, options?.projection, options).populate('room', '_id room_name'),
    ]);
    return {
      total: count,
      items,
    };
  }
}