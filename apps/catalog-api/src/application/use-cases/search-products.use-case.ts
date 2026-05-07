import { productRepository } from "../../adapters/outbound/persistence/product.repository";
import { SearchProductsInput } from "../ports/inbound/search-products.port";

export async function searchProductsUseCase(data: SearchProductsInput) {
  return productRepository.searchByText(data.query);
}
