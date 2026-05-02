import { productRepository } from "../../adapters/outbound/persistence/product.repository";
import { AddProductInput } from "../ports/inbound/add-product.port";

export async function addProductUseCase(data: AddProductInput) {
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
