import { AddProduct } from "@repo/schemas";
import { toast } from "sonner";
import { useAuthenticatedMutation, useSellerApi } from "../../hooks";

interface AddProductResponse {
  productId: string;
}

export function useAddProduct() {
  const { request } = useSellerApi();

  return useAuthenticatedMutation({
    mutationFn: (data: AddProduct) =>
      request<AddProductResponse>({
        url: "/products",
        method: "POST",
        data,
      }),
    onSuccess() {
      toast.success("Produto adicionado com sucesso!");
    },
    onError() {
      toast.error("Não foi possível adicionar o produto. Tente novamente.");
    },
  });
}
