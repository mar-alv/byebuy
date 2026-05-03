import { productRepository } from "../../adapters/outbound/persistence/product.repository";
import { GetAddedProductsInput } from "../ports/inbound/get-added-products.port";

export async function getAddedProductsUseCase({
  sellerClerkId,
}: GetAddedProductsInput) {
  return productRepository.listBySeller(sellerClerkId);
}
