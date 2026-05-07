import { ProductStatus } from "../../generated/prisma";
import { prisma } from "../client";
import { AddProductInput } from "../types/product.types";

export const productRepository = {
  create: async (data: AddProductInput) => {
    return prisma.product.create({
      data: {
        // images: undefined, // TODO: remove
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        condition: data.condition,
        usageTime: data.usageTime,
        defects: data.defects,
        sellerClerkId: data.sellerClerkId,
        location: data.location ? { create: data.location } : undefined,
        delivery: data.delivery ? { create: data.delivery } : undefined,
      },
      include: {
        location: true,
        delivery: true,
        images: true,
      },
    });
  },

  findById: async (id: string) => {
    return prisma.product.findUnique({
      where: { id },
      include: {
        location: true,
        delivery: true,
        images: true,
      },
    });
  },

  listActive: async () => {
    return prisma.product.findMany({
      where: { status: ProductStatus.active },
      orderBy: { createdAt: "desc" },
    });
  },

  listBySeller: async (sellerClerkId: string) => {
    return prisma.product.findMany({
      where: { sellerClerkId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
        images: {
          select: {
            id: true,
            url: true,
            order: true,
          },
        },
      },
    });
  },

  listRecentActive: async () => {
    const date = new Date();
    date.setDate(date.getDate() - 10);

    return prisma.product.findMany({
      where: {
        status: ProductStatus.active,
        createdAt: {
          gte: date,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
        images: {
          select: {
            id: true,
            url: true,
            order: true,
          },
        },
      },
    });
  },

  searchByText: async (query: string) => {
    return prisma.product.findMany({
      where: {
        status: ProductStatus.active,
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
        images: {
          select: {
            id: true,
            url: true,
            order: true,
          },
        },
      },
    });
  },

  updateStatus: async (id: string, status: ProductStatus) => {
    return prisma.product.update({
      where: { id },
      data: { status },
    });
  },
};
