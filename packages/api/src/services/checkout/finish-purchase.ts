import { useAuthenticatedMutation, useCheckoutApi } from "../../hooks";

interface FinishPurchaseRequest {
  items: {
    productId: string;
    quantity: number;

    delivery: {
      productId: string;
      deliveryMethod: "pickup" | "shipping";

      address?: {
        zipCode?: string;
        street?: string;
        number?: string;
        complement?: string;
        neighborhood?: string;
        city: string;
        state: string;
        country: string;
      };
    } | null;
  }[];

  payment: {
    method: "pix" | "credit_card" | "debit_card";
    installments?: number;
  };
}

export function useFinishPurchase() {
  const { request } = useCheckoutApi();

  return useAuthenticatedMutation({
    mutationFn: (data: FinishPurchaseRequest) =>
      request({
        url: "/finish",
        method: "POST",
        data,
      }),
  });
}
