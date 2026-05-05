import { productRepository } from "../../adapters/outbound/persistence/product.repository";

export async function getReleasesUseCase() {
  return productRepository.listRecentActive();
}
