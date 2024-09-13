import { GetAllResponse } from "@interfaces/common";

export interface BaseRepositoryInterface<T> {
  create(dto: T | any): Promise<T>;

  getOneById(id: string, projection?: string): Promise<T>;

  getOneByQuery(condition?: object, projection?: string): Promise<T>;

  getManyByQuery(
    condition: object,
    options?: object,
  ): Promise<GetAllResponse<T>>;

  update(id: string, dto: Partial<T>): Promise<T>;

  delete(id: string): Promise<boolean>;

}