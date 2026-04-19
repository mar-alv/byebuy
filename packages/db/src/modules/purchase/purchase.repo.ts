import { prisma } from "../../client";

export const purchaseRepo = {
  create: async (data: {
    buyerClerkId: string;
    items: {
      productId: string;
      quantity: number;
      priceAtPurchase: number;
      productNameAtPurchase?: string;
    }[];
  }) => {
    return prisma.purchase.create({
      data: {
        buyerClerkId: data.buyerClerkId,
        totalPrice: data.items.reduce(
          (sum, item) => sum + item.priceAtPurchase * item.quantity,
          0,
        ),
        items: {
          create: data.items,
        },
      },
      include: {
        items: true,
      },
    });
  },
};
