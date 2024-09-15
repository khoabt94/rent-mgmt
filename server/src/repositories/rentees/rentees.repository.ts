import { RenteeRepositoryInterface } from "@modules/rentee/interfaces/rentee";
import { Rentee } from "@modules/rentee/schemas/rentee.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepositoryAbstract } from "@repositories/base/base.abstract.repository";
import { Model } from "mongoose";

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

}