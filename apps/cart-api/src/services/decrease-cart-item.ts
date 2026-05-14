import { cartRepository } from "@repo/db";

type DecreaseCartItemInput = {
  buyerClerkId: string;
  productId: string;
};

export async function decreaseCartItemService({
  buyerClerkId,
  productId,
}: DecreaseCartItemInput) {
  return cartRepository.decreaseItem({
    buyerClerkId,
    productId,
  });
}
