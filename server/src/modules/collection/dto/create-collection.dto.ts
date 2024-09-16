import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class CollectionItem {
  @IsMongoId()
  @IsNotEmpty()
  room: mongoose.Schema.Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  area: mongoose.Schema.Types.ObjectId;
}

export class CreateCollectionDto {
  @MaxLength(50, { message: 'Tên kỳ thu tiền không dài quá 50 ký tự' })
  @MinLength(1, { message: 'Tên kỳ thu tiền phải ít nhất 5 ký tự' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp tên kỳ thu tiền' })
  collection_name: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CollectionItem)
  collection_items: CollectionItem[];
}
