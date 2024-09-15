import { GetAllResponse } from "@interfaces/common";
import { RenteeRepositoryInterface } from "@modules/rentee/interfaces/rentee";
import { Rentee } from "@modules/rentee/schemas/rentee.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepositoryAbstract } from "@repositories/base/base.abstract.repository";
import { FilterQuery, Model, QueryOptions } from "mongoose";

@Injectable()
export class RenteesRepository
  extends BaseRepositoryAbstract<Rentee>
  implements RenteeRepositoryInterface {
  constructor(
    @InjectModel(Rentee.name)
    private readonly renteeModel: Model<Rentee>,
  ) {
    super(renteeModel);
  }

  async getOneByQuery(condition = {}): Promise<Rentee> {
    return await this.renteeModel
      .findOne(condition)
      .populate('room', 'area')
      .exec();
  }

  async getManyByQuery(
    condition: FilterQuery<Rentee>,
    options?: QueryOptions<Rentee>,
  ): Promise<GetAllResponse<Rentee>> {
    const [count, items] = await Promise.all([
      this.renteeModel.countDocuments(condition),
      this.renteeModel.find(condition, options?.projection, options).populate('room', 'area'),
    ]);
    return {
      total: count,
      items,
    };
  }

}