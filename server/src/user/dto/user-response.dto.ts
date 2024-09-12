import { Expose } from "class-transformer";

export class ResponseUserDto {
  @Expose()
  _id: string

  @Expose()
  username: string;

  @Expose()
  email: string;
}