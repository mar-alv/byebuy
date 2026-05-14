import { prisma } from "../client";

export const cartRepository = {
  getByBuyer: async (buyerClerkId: string) => {
    return prisma.cart.findUnique({
      where: {
        buyerClerkId,
      },

      include: {
        items: {
          include: {
            product: {
              include: {
                location: true,
                delivery: true,
                images: true,
              },
            },
          },
        },
      },
    });
  },

  createIfNotExists: async (buyerClerkId: string) => {
    return prisma.cart.upsert({
      where: {
        buyerClerkId,
      },

      update: {},

      create: {
        buyerClerkId,
      },
    });
  },

  addItem: async ({
    buyerClerkId,
    productId,
  }: {
    buyerClerkId: string;
    productId: string;
  }) => {
    const cart = await prisma.cart.upsert({
      where: {
        buyerClerkId,
      },

      update: {},

      create: {
        buyerClerkId,
      },
    });

    const existing = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existing) {
      return prisma.cartItem.update({
        where: {
          id: existing.id,
        },

        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  },

  increaseItem: async ({
    buyerClerkId,
    productId,
  }: {
    buyerClerkId: string;
    productId: string;
  }) => {
    const cart = await prisma.cart.findUniqueOrThrow({
      where: {
        buyerClerkId,
      },
    });

    return prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },

      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  },

  decreaseItem: async ({
    buyerClerkId,
    productId,
  }: {
    buyerClerkId: string;
    productId: string;
  }) => {
    const cart = await prisma.cart.findUniqueOrThrow({
      where: {
        buyerClerkId,
      },
    });

    const item = await prisma.cartItem.findUniqueOrThrow({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (item.quantity <= 1) {
      return prisma.cartItem.delete({
        where: {
          id: item.id,
        },
      });
    }

    return prisma.cartItem.update({
      where: {
        id: item.id,
      },

      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  },

  removeItem: async ({
    buyerClerkId,
    productId,
  }: {
    buyerClerkId: string;
    productId: string;
  }) => {
    const cart = await prisma.cart.findUniqueOrThrow({
      where: {
        buyerClerkId,
      },
    });

    return prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
  },

  clearCart: async (buyerClerkId: string) => {
    const cart = await prisma.cart.findUnique({
      where: {
        buyerClerkId,
      },
    });

    if (!cart) return;

    return prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
  },
};
