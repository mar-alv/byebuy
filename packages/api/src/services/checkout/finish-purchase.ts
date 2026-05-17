import { useAuthenticatedMutation, useCheckoutApi } from "../../hooks";

export interface FinishPurchaseResponse {
  id: string;
  createdAt: string;

  paymentMethod: "pix" | "credit_card" | "debit_card";

  installments?: number;

  subtotalPrice: number;
  shippingPrice: number;
  totalPrice: number;

  items: {
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;

    deliveryMethod: "pickup" | "shipping";

    address?: {
      zipCode?: string;
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
      country?: string;
    };
  }[];
}

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

  return useAuthenticatedMutation<
    FinishPurchaseResponse,
    Error,
    FinishPurchaseRequest
  >({
    mutationFn: (data: FinishPurchaseRequest) =>
      request({
        url: "/finish",
        method: "POST",
        data,
      }),
  });
}
