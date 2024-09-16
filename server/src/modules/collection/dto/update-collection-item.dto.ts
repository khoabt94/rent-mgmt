import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class UpdateCollectionItemDto {
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
  @IsNotEmpty()
  other_fee: number;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  deduction: number;


}
