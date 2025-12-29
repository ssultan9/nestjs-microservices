import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get("with-products")
  findAllWithProducts() {
    return this.orderService.findAllWithProducts();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(Number(id));
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(Number(id), dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    this.orderService.delete(Number(id));
    return { deleted: true };
  }
}
