import { GetAllResponse } from "@interfaces/common";

export interface Write<T> {
  create(item: T | any): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface Read<T> {
  getManyByQuery(
    filter?: object,
    options?: object,
  ): Promise<GetAllResponse<T>>;
  getOneById(id: string): Promise<T>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> { }