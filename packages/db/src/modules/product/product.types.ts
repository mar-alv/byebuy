import { Condition, ShippingType } from "../../../generated/prisma";

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  quantity: number;
  condition: Condition;
  usageTime?: string;
  defects?: string;
  sellerClerkId: string;
  location?: {
    zipCode?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city: string;
    state: string;
    country: string;
  };
  delivery?: {
    hasShipping: boolean;
    shippingType?: ShippingType;
    shippingPrice?: number;
    hasPickup: boolean;
    pickupInstructions?: string;
  };
}
