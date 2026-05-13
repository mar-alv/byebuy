import { productRepository } from "@repo/db";

export async function getAddedProductsService({
  sellerClerkId,
}: {
  sellerClerkId: string;
}) {
  return productRepository.listBySeller(sellerClerkId);
}
