import {
  cartRepository,
  productRepository,
  purchaseRepository,
} from "@repo/db";
import { FinishPurchase } from "@repo/schemas";

type FinishPurchaseInput = {
  buyerClerkId: string;
  data: FinishPurchase;
};

export async function finishPurchaseService({
  buyerClerkId,
  data,
}: FinishPurchaseInput) {
  const items = await Promise.all(
    data.items.map(async (item) => {
      const product = await productRepository.findById(item.productId);

      if (!product) {
        throw new Error("Produto não encontrado.");
      }

      if (product.status !== "active") {
        throw new Error("Produto indisponível.");
      }

      if (item.quantity > product.quantity) {
        throw new Error("Quantidade indisponível.");
      }

      return {
        productId: product.id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
        productNameAtPurchase: product.name,
      };
    }),
  );

  const purchase = await purchaseRepository.create({
    buyerClerkId,

    payment: data.payment,

    items,
  });

  await cartRepository.clearCart(buyerClerkId);

  return purchase;
}
