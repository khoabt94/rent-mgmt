import { IsMongoId, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateAreaDto {
  @MaxLength(50, { message: 'Tên khu nhà không dài quá 50 ký tự' })
  @MinLength(5, { message: 'Tên khu nhà phải ít nhất 5 ký tự' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp tên khu nhà' })
  area_name: string;

  @Min(0, { message: 'Vui lòng cung cấp đơn giá điện' })
  @IsNumber()
  @IsNotEmpty({ message: 'Vui lòng cung cấp đơn giá điện' })
  electricity_unit_price: number;

  @Min(0, { message: 'Vui lòng cung cấp đơn giá nước' })
  @IsNumber()
  @IsNotEmpty({ message: 'Vui lòng cung cấp đơn giá nước' })
  water_unit_price: number;
}
