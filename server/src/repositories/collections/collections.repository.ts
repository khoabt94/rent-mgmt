import { GetAllResponse } from "@interfaces/common";
import { CollectionRepositoryInterface } from "@modules/collection/interfaces/collection";
import { Collection } from "@modules/collection/schemas/collection.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepositoryAbstract } from "@repositories/base/base.abstract.repository";
import { FilterQuery, Model, QueryOptions } from "mongoose";
@Injectable()
export class CollectionsRepository
  extends BaseRepositoryAbstract<Collection>
  implements CollectionRepositoryInterface {
  constructor(
    @InjectModel(Collection.name)
    private readonly CollectionModel: Model<Collection>,
  ) {
    super(CollectionModel);
  }
}