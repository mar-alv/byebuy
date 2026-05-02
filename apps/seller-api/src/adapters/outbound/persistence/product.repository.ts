import { productRepository as prismaRepo } from "@repo/db";

export const productRepository = {
  create: prismaRepo.create,
};
