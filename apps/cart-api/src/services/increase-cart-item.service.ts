import { productRepository, cartRepository } from "@repo/db";

type IncreaseCartItemInput = {
  buyerClerkId: string;
  productId: string;
};

export async function increaseCartItemService({
  buyerClerkId,
  productId,
}: IncreaseCartItemInput) {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  if (product.status !== "active") {
    throw new Error("Produto indisponível.");
  }

  const cart = await cartRepository.getByBuyer(buyerClerkId);

  const existingItem = cart?.items.find((item) => item.productId === productId);

  if (!existingItem) {
    throw new Error("Item não encontrado no carrinho.");
  }

  if (existingItem.quantity >= product.quantity) {
    throw new Error("Quantidade máxima disponível atingida.");
  }

  return cartRepository.increaseItem({
    buyerClerkId,
    productId,
  });
}
