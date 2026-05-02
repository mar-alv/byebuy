import { AddProduct } from "@repo/schemas";
import { request } from "./api";

interface AddProductResponse {
  productId: string;
}

export async function addProduct(data: AddProduct) {
  return request<AddProductResponse>({
    url: "/products",
    method: "POST",
    data,
  });
}
