import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { Order } from "./order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService {
  private orders: Order[] = [];
  private currentId = 1;

  constructor(
    @Inject("PRODUCT_SERVICE") private readonly productClient: ClientProxy
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    for (const item of dto.items) {
      await firstValueFrom(
        this.productClient.send({ cmd: "get-product" }, item.productId)
      );
      await firstValueFrom(
        this.productClient.send(
          { cmd: "decrease-stock" },
          { productId: item.productId, quantity: item.quantity }
        )
      );
    }

    const order: Order = {
      id: this.currentId++,
      customerName: dto.customerName,
      status: "CREATED",
      items: dto.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  update(id: number, dto: UpdateOrderDto): Order {
    const order = this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    if (dto.customerName !== undefined) {
      order.customerName = dto.customerName;
    }
    if (dto.status !== undefined) {
      order.status = dto.status;
    }
    return order;
  }

  delete(id: number): void {
    const index = this.orders.findIndex((o) => o.id === id);
    if (index === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    this.orders.splice(index, 1);
  }

  async findAllWithProducts(): Promise<any[]> {
    const ordersWithProducts = await Promise.all(
      this.orders.map(async (order) => {
        const itemsWithProducts = await Promise.all(
          order.items.map(async (item) => {
            try {
              const product = await firstValueFrom(
                this.productClient.send({ cmd: "get-product" }, item.productId)
              );
              return {
                ...item,
                product,
              };
            } catch (error) {
              return {
                ...item,
                product: null,
              };
            }
          })
        );

        return {
          ...order,
          items: itemsWithProducts,
        };
      })
    );

    return ordersWithProducts;
  }
}
