import { prisma } from "../client";

export const purchaseRepository = {
  create: async (data: {
    buyerClerkId: string;

    payment: {
      method: "pix" | "credit_card" | "debit_card";
      installments?: number;
    };

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

        paymentMethod: data.payment.method,

        installments: data.payment.installments,

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
