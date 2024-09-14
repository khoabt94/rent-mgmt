import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAreaDto {
  @MaxLength(50, { message: 'Tên khu nhà không dài quá 50 ký tự' })
  @MinLength(5, { message: 'Tên khu nhà phải ít nhất 5 ký tự' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp tên khu nhà' })
  area_name: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp tên chủ khu nhà' })
  user: string;
}
