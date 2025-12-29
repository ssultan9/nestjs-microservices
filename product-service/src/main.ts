import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  // Create HTTP server for external API calls
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Connect microservice for internal communication
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: Number(process.env.PRODUCT_MICROSERVICE_PORT ?? 4002), // Microservice port
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PRODUCT_HTTP_PORT ?? 4001); // HTTP port
}

bootstrap();
