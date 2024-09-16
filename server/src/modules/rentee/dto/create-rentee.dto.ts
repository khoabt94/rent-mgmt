import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import mongoose, { Types } from "mongoose";

export class CreateRenteeDto {
  @MaxLength(12, { message: 'Số CCCD không dài quá 12 ký tự' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp số CCCD' })
  rentee_id: string;

  @MaxLength(50, { message: 'Tên người thuê không dài quá 50 ký tự' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp tên người thuê' })
  rentee_name: string;

  @IsMongoId()
  @IsOptional()
  room: mongoose.Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp hình ảnh CCCD' })
  image_url: string

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp địa chỉ' })
  address: string

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp ngày sinh' })
  dob: string
}
