import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import mongoose from "mongoose";


export class CreateCollectionDto {
  @MaxLength(50, { message: 'Tên kỳ thu tiền không dài quá 50 ký tự' })
  @MinLength(1, { message: 'Tên kỳ thu tiền phải ít nhất 5 ký tự' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp tên kỳ thu tiền' })
  collection_name: string;

  @IsMongoId()
  @IsNotEmpty()
  room: mongoose.Schema.Types.ObjectId;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  end_electricity: number;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  end_water: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  other_fee: number;

  @Max(0)
  @IsNumber()
  @IsOptional()
  deduction: number;
}
