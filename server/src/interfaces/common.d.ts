export type GetAllResponse<T> = {
  total: number;
  // page: number;
  // limit: number;
  items: T[]
};

export type GetSingleResponse<T> = {
  item: T
};