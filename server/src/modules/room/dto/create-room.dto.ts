import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRoomDto {
  @MaxLength(50, { message: 'Tên phòng không dài quá 50 ký tự' })
  @MinLength(1, { message: 'Tên phòng phải ít nhất 5 ký tự' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp tên phòng' })
  room_name: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp thông tin khu nhà của phòng này' })
  area: string;
}
