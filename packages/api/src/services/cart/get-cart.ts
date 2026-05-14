"use client";

import { useAuthenticatedQuery, useCartApi } from "../../hooks";

export interface CartLocation {
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  country: string;
}

export interface CartDelivery {
  hasShipping: boolean;
  shippingType?: "free" | "fixed" | "calculated";
  shippingPrice?: number;
  hasPickup: boolean;
  pickupInstructions?: string;
}

export interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  inCart: number;
  location?: CartLocation;
  delivery?: CartDelivery;
}

export interface GetCartResponse {
  items: CartItem[];
}

export function useGetCart() {
  const { request } = useCartApi();

  return useAuthenticatedQuery({
    queryKey: ["getCart"],
    queryFn: () =>
      request<GetCartResponse>({
        url: "/",
        method: "GET",
      }),
  });
}
