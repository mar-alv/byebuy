import { AddProduct } from "@repo/schemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { request } from "./api";

interface AddProductResponse {
  productId: string;
}

export function useAddProduct() {
  return useMutation({
    mutationFn: addProduct,
    onSuccess() {
      toast.success("Produto adicionado com sucesso!");
    },
    onError() {
      toast.error("Não foi possível adicionar o produto. Tente novamente.");
    },
  });
}

export async function addProduct(data: AddProduct) {
  return request<AddProductResponse>({
    url: "/products",
    method: "POST",
    data,
  });
}
