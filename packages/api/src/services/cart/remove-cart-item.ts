import { useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedMutation, useCartApi } from "../../hooks";

interface RemoveCartItemRequest {
  productId: string;
}

export function useRemoveCartItem() {
  const { request } = useCartApi();

  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ productId }: RemoveCartItemRequest) =>
      request({
        url: `/items/${productId}`,
        method: "DELETE",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      }),
  });
}
