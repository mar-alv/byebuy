import { productRepository } from "@repo/db";

export async function getReleasesService(userId: string) {
  return productRepository.listRecentActive(userId);
}
