export class CreateProductDto {
  name: string;
  price: number;
  quantity: number;
  wattage: number;
  pin: string;
  connect: string;
  weight: number;
  description: string;
  avatar?: string;
  optionalImages?: string[];
  categoryId: number;
}
