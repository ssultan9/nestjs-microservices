import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "PRODUCT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 4002, // Connect to product service microservice port
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
