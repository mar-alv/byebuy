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
  let shippingPrice = 0;

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

      const itemShippingPrice =
        item.delivery?.deliveryMethod === "shipping"
          ? (product.delivery?.shippingPrice ?? 0)
          : 0;

      shippingPrice += itemShippingPrice;

      return {
        productId: product.id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
        productNameAtPurchase: product.name,

        deliveryMethod: item.delivery?.deliveryMethod,

        address: item.delivery?.address,
      };
    }),
  );

  const purchase = await purchaseRepository.create({
    buyerClerkId,

    payment: data.payment,

    shippingPrice,

    items,
  });

  await cartRepository.clearCart(buyerClerkId);

  const subtotalPrice = purchase.items.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0,
  );

  return {
    id: purchase.id,
    createdAt: purchase.createdAt,
    paymentMethod: purchase.paymentMethod,
    installments: purchase.installments,
    subtotalPrice,
    shippingPrice: purchase.shippingPrice,
    totalPrice: purchase.totalPrice,

    items: purchase.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.productNameAtPurchase,
      quantity: item.quantity,
      price: item.priceAtPurchase,
      subtotal: item.priceAtPurchase * item.quantity,

      deliveryMethod: item.deliveryMethod,

      address:
        item.deliveryMethod === "shipping"
          ? {
              zipCode: item.zipCode,
              street: item.street,
              number: item.number,
              complement: item.complement,
              neighborhood: item.neighborhood,
              city: item.city,
              state: item.state,
              country: item.country,
            }
          : undefined,
    })),
  };
}
