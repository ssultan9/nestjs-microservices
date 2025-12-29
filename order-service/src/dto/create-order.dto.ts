import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

class CreateOrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
