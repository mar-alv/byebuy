import { productRepository } from "@repo/db";

export async function getReleasesService() {
  return productRepository.listRecentActive();
}
