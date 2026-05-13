import { productRepository } from "@repo/db";
import { AddProduct } from "@repo/schemas";

export async function addProductService(
  data: AddProduct & {
    sellerClerkId: string;
  },
) {
  return productRepository.create({
    ...data,
    location: data.location ? { ...data.location } : undefined,
    delivery: data.delivery
      ? {
          hasShipping: data.delivery.methods.includes("shipping"),
          shippingType: data.delivery.shipping?.type,
          shippingPrice: data.delivery.shipping?.price,
          hasPickup: data.delivery.methods.includes("pickup"),
          pickupInstructions: data.delivery.pickup?.instructions,
        }
      : undefined,
  });
}
