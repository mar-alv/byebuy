import { AddProduct } from "@repo/schemas";

export type AddProductInput = AddProduct & {
  sellerClerkId: string;
};
