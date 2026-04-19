import { Prisma, Condition } from "../../generated/prisma";

export interface AddProductInput {
  name: string;
  description: string;
  price: number;
  quantity: number;

  condition: Condition;
  usageTime?: string;
  defects?: string;

  sellerClerkId: string;

  location?: Prisma.ProductLocationCreateWithoutProductInput;
  delivery?: Prisma.ProductDeliveryCreateWithoutProductInput;
}
