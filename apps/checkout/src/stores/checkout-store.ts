import { create } from "zustand";
import { CartItem, CartLocation } from "@repo/api";

export interface CheckoutDeliveryAddress extends CartLocation {}

export interface CheckoutDeliveryItem {
  productId: string;
  deliveryMethod: "pickup" | "shipping";
  address?: CheckoutDeliveryAddress;
}

export interface CheckoutPayment {
  method?: "pix" | "credit_card" | "debit_card";
  installments?: number;
}

interface CheckoutStore {
  items: CartItem[];
  deliveryItems: CheckoutDeliveryItem[];
  payment: CheckoutPayment;

  setItems: (items: CartItem[]) => void;

  setDeliveryMethod: (productId: string, method: "pickup" | "shipping") => void;

  setDeliveryAddress: (
    productId: string,
    address: CheckoutDeliveryAddress,
  ) => void;

  setPayment: (payment: CheckoutPayment) => void;

  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  items: [],
  deliveryItems: [],
  payment: {},

  setItems: (items) =>
    set({
      items,
    }),

  setDeliveryMethod: (productId, method) =>
    set((state) => {
      const existing = state.deliveryItems.find(
        (item) => item.productId === productId,
      );

      if (existing) {
        return {
          deliveryItems: state.deliveryItems.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  deliveryMethod: method,
                }
              : item,
          ),
        };
      }

      return {
        deliveryItems: [
          ...state.deliveryItems,
          {
            productId,
            deliveryMethod: method,
          },
        ],
      };
    }),

  setDeliveryAddress: (productId, address) =>
    set((state) => {
      const existing = state.deliveryItems.find(
        (item) => item.productId === productId,
      );

      if (existing) {
        return {
          deliveryItems: state.deliveryItems.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  address,
                }
              : item,
          ),
        };
      }

      return {
        deliveryItems: [
          ...state.deliveryItems,
          {
            productId,
            deliveryMethod: "shipping",
            address,
          },
        ],
      };
    }),

  setPayment: (payment) =>
    set({
      payment,
    }),

  reset: () =>
    set({
      items: [],
      deliveryItems: [],
      payment: {},
    }),
}));
