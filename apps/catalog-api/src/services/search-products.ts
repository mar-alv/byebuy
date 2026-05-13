import { productRepository } from "@repo/db";
import { Search } from "@repo/schemas";

export async function searchProductsService(data: Search) {
  return productRepository.searchByText(data.query);
}
