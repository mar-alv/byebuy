import { useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedMutation, useCartApi } from "../../hooks";

export function useClearCart() {
  const { request } = useCartApi();

  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: () =>
      request({
        url: "/",
        method: "DELETE",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      }),
  });
}
