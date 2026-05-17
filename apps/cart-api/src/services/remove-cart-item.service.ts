import { cartRepository } from "@repo/db";

type RemoveCartItemInput = {
  buyerClerkId: string;
  productId: string;
};

export async function removeCartItemService({
  buyerClerkId,
  productId,
}: RemoveCartItemInput) {
  return cartRepository.removeItem({
    buyerClerkId,
    productId,
  });
}
