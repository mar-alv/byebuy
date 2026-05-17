import { prisma } from "../client";

export const purchaseRepository = {
  create: async (data: {
    buyerClerkId: string;

    payment: {
      method: "pix" | "credit_card" | "debit_card";
      installments?: number;
    };

    shippingPrice: number;

    items: {
      productId: string;
      quantity: number;
      priceAtPurchase: number;
      productNameAtPurchase?: string;

      deliveryMethod?: "pickup" | "shipping";

      address?: {
        zipCode?: string;
        street?: string;
        number?: string;
        complement?: string;
        neighborhood?: string;
        city?: string;
        state?: string;
        country?: string;
      };
    }[];
  }) => {
    const subtotalPrice = data.items.reduce(
      (sum, item) => sum + item.priceAtPurchase * item.quantity,
      0,
    );

    return prisma.purchase.create({
      data: {
        buyerClerkId: data.buyerClerkId,

        paymentMethod: data.payment.method,

        installments: data.payment.installments,

        shippingPrice: data.shippingPrice,

        totalPrice: subtotalPrice + data.shippingPrice,

        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
            productNameAtPurchase: item.productNameAtPurchase,

            deliveryMethod: item.deliveryMethod,

            zipCode: item.address?.zipCode,
            street: item.address?.street,
            number: item.address?.number,
            complement: item.address?.complement,
            neighborhood: item.address?.neighborhood,
            city: item.address?.city,
            state: item.address?.state,
            country: item.address?.country,
          })),
        },
      },

      include: {
        items: true,
      },
    });
  },
};
