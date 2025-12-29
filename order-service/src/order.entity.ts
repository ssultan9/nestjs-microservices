export class OrderItem {
  productId: number;
  quantity: number;
}

export class Order {
  id: number;
  customerName: string;
  status: "CREATED" | "PAID" | "CANCELLED";
  items: OrderItem[];
  createdAt: Date;
}
