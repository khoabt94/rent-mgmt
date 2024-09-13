import { GetAllResponse } from "@interfaces/common";
import { BaseEntity } from "@modules/shared/base/base.entity";
import { BaseRepositoryInterface } from "@repositories/base/base.interface.repository";
import { FilterQuery, Model, QueryOptions } from "mongoose";

export abstract class BaseRepositoryAbstract<T extends BaseEntity> implements BaseRepositoryInterface<T> {
  protected constructor(private readonly model: Model<T>) { }

  async create(dto: T | any): Promise<T> {
    const created_data = await this.model.create(dto);
    return created_data.save();
  }

  async getOneById(id: string): Promise<T> {
    return await this.model.findById(id);
  }

  async getOneByQuery(condition = {}): Promise<T> {
    return await this.model
      .findOne(condition)
      .exec();
  }

  async getManyByQuery(
    condition: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<GetAllResponse<T>> {
    const [count, items] = await Promise.all([
      this.model.countDocuments(condition),
      this.model.find(condition, options?.projection, options),
    ]);
    return {
      total: count,
      items,
    };
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return await this.model.findOneAndUpdate(
      { _id: id },
      dto,
      { new: true },
    );
  }

  async delete(id: string): Promise<boolean> {
    const delete_item = await this.model.findById(id);
    if (!delete_item) {
      return false;
    }
    return !!(await this.model.findByIdAndDelete(id));
  }
}