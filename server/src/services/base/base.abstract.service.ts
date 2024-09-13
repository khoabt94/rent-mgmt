import { GetAllResponse } from "@interfaces/common";
import { BaseEntity } from "@modules/shared/base/base.entity";
import { BaseRepositoryInterface } from "@repositories/base/base.interface.repository";
import { BaseServiceInterface } from "@services/base/base.interface.service";

export abstract class BaseServiceAbstract<T extends BaseEntity>
  implements BaseServiceInterface<T> {
  constructor(private readonly repository: BaseRepositoryInterface<T>) { }

  async getManyByQuery(
    filter?: object,
    options?: object,
  ): Promise<GetAllResponse<T>> {
    return await this.repository.getManyByQuery(filter, options);
  }

  async getOneById(id: string) {
    return await this.repository.getOneById(id);
  }

  async create(create_dto: T | any): Promise<T> {
    return await this.repository.create(create_dto);
  }

  async update(id: string, update_dto: Partial<T>) {
    return await this.repository.update(id, update_dto);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}