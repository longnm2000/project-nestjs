interface CartItem {
  productId: string;
  userId: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export class CreateOrderDto {
  totalAmount: number;
  shippingAddress: string;
  orderDetails: CartItem[];
  user: number;
}
