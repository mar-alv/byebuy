import { useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedMutation, useCartApi } from "../../hooks";

interface AddCartItemRequest {
  productId: string;
}

interface AddCartItemResponse {
  productId: string;
  id: string;
  quantity: number;
  cartId: string;
}

export function useAddCartItem() {
  const { request } = useCartApi();

  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ productId }: AddCartItemRequest) =>
      request<AddCartItemResponse>({
        url: "/",
        method: "POST",
        data: { productId },
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      }),
  });
}
