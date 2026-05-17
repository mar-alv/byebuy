import { cartRepository } from "@repo/db";

export async function getCartService(buyerClerkId: string) {
  const cart = await cartRepository.getByBuyer(buyerClerkId);

  if (!cart) {
    return {
      items: [],
    };
  }

  return {
    items: cart.items.map((item) => ({
      ...item.product,
      image: item.product.images[0]?.url,
      inCart: item.quantity,
    })),
  };
}
