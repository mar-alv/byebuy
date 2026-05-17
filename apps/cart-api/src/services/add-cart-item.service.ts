import { cartRepository, productRepository } from "@repo/db";

type AddCartItemInput = {
  buyerClerkId: string;
  productId: string;
};

export async function addCartItemService({
  buyerClerkId,
  productId,
}: AddCartItemInput) {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  if (product.status !== "active") {
    throw new Error("Produto indisponível.");
  }

  const cart = await cartRepository.getByBuyer(buyerClerkId);

  const existingItem = cart?.items.find((item) => item.productId === productId);

  const currentInCart = existingItem?.quantity || 0;

  if (currentInCart >= product.quantity) {
    throw new Error("Quantidade máxima disponível atingida.");
  }

  return cartRepository.addItem({
    buyerClerkId,
    productId,
  });
}
