interface CartItem {
  productId: string;
  userId: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}
export class CreateOrderDetailDto {
  orderId: number;
  orderDetails: CartItem[];
}
