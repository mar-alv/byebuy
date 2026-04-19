import { ProductStatus, Product } from "../../../generated/prisma";
import { prisma } from "../../client";
import { CreateProductInput } from "./product.types";

export const productRepo = {
  create: async (data: CreateProductInput) => {
    return prisma.product.create({
      data: {
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

  updateStatus: async (id: string, status: ProductStatus) => {
    return prisma.product.update({
      where: { id },
      data: { status },
    });
  },
};
