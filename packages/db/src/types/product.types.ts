import { Condition, Prisma } from "../../generated/prisma";

type LocationInput = Prisma.ProductLocationCreateWithoutProductInput;
type DeliveryInput = Prisma.ProductDeliveryCreateWithoutProductInput;

export interface AddProductInput {
  name: string;
  description: string;
  price: number;
  quantity: number;

  condition: Condition;
  usageTime?: string;
  defects?: string;

  sellerClerkId: string;

  location?: LocationInput;
  delivery?: DeliveryInput;
}
