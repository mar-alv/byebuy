import { productRepository } from "@repo/db";
import { Search } from "@repo/schemas";

export async function searchProductsService(data: Search & { userId: string }) {
  return productRepository.searchByText(data.query, data.userId);
}
