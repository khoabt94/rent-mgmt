import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class QueryRoomDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp thông tin khu nhà' })
  area: string;
}
