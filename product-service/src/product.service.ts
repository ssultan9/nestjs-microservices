import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private currentId = 1;

  create(dto: CreateProductDto): Product {
    const product: Product = {
      id: this.currentId++,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
      isActive: dto.isActive ?? true,
    };
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      return null;
    }
    return product;
  }

  update(id: number, dto: UpdateProductDto): Product {
    const product = this.findOne(id);
    Object.assign(product, dto);
    return product;
  }

  remove(id: number): void {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException("Product not found");
    }
    this.products.splice(index, 1);
  }

  decreaseStock(id: number, quantity: number): Product {
    const product = this.findOne(id);
    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }
    product.stock -= quantity;
    return product;
  }
}
