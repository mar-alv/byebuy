import { useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedMutation, useCartApi } from "../../hooks";

interface DecreaseCartItemRequest {
  productId: string;
}

export function useDecreaseCartItem() {
  const { request } = useCartApi();

  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ productId }: DecreaseCartItemRequest) =>
      request({
        url: `/${productId}/decrease`,
        method: "PATCH",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      }),
  });
}
