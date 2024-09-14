import { AreaRepositoryInterface } from '@modules/area/interfaces/area';
import { Area } from '@modules/area/schemas/area.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepositoryAbstract } from "@repositories/base/base.abstract.repository";
import { Model } from "mongoose";

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

}