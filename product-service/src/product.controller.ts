import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(Number(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    this.productService.remove(Number(id));
    return { deleted: true };
  }

  // Microservice message handlers
  @MessagePattern({ cmd: "get-product" })
  getProduct(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern({ cmd: "decrease-stock" })
  decreaseStock(@Payload() data: { productId: number; quantity: number }) {
    return this.productService.decreaseStock(data.productId, data.quantity);
  }
}
