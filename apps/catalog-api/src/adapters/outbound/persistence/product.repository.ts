import { productRepository as prismaRepo } from "@repo/db";

export const productRepository = {
  listRecentActive: prismaRepo.listRecentActive,
};
