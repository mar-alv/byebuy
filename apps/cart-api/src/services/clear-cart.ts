import { cartRepository } from "@repo/db";

export async function clearCartService(buyerClerkId: string) {
  return cartRepository.clearCart(buyerClerkId);
}
