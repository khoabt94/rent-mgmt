import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";


class ResponseUserObject {
  @Expose()
  readonly _id: string

  @Expose()
  readonly username: string;

  @Expose()
  readonly email: string;
}

export class ResponseUserDto {
  @Type(() => ResponseUserObject)
  @ValidateNested()
  @Expose()
  readonly user: ResponseUserObject
}

