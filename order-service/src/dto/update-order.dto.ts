import { IsOptional, IsString, IsIn } from "class-validator";

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  @IsIn(["CREATED", "PAID", "CANCELLED"])
  status?: "CREATED" | "PAID" | "CANCELLED";
}
