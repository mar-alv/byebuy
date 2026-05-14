import { useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedMutation, useCartApi } from "../../hooks";

interface IncreaseCartItemRequest {
  productId: string;
}

export function useIncreaseCartItem() {
  const { request } = useCartApi();

  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ productId }: IncreaseCartItemRequest) =>
      request({
        url: `/${productId}/increase`,
        method: "PATCH",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      }),
  });
}
