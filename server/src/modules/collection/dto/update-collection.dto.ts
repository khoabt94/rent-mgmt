import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateCollectionDto } from "./create-collection.dto";
import { IsNumber, IsOptional, Min } from "class-validator";

export class UpdateCollectionDto extends PartialType(OmitType(CreateCollectionDto, ['room', 'collection_name'] as const)) {
  @Min(0)
  @IsNumber()
  @IsOptional()
  amount_collect: number;
}
