import { Transform } from "class-transformer";
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import mongoose, { Mongoose, Schema } from "mongoose";


export class QueryCollectionDto {
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  @IsOptional()
  area: mongoose.Schema.Types.ObjectId;

  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  @IsOptional()
  room: mongoose.Schema.Types.ObjectId;

  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  @IsOptional()
  owner: mongoose.Schema.Types.ObjectId;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  isUnpaid: boolean;

  [key: string]: unknown;
}
