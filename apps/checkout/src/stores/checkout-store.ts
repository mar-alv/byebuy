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

export interface CompletedPurchaseItem {
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
}

export interface CompletedPurchase {
  id: string;
  createdAt: string;
  paymentMethod: "pix" | "credit_card" | "debit_card";
  installments?: number;
  subtotalPrice: number;
  shippingPrice: number;
  totalPrice: number;
  items: CompletedPurchaseItem[];
}

interface CheckoutStore {
  items: CartItem[];
  deliveryItems: CheckoutDeliveryItem[];
  payment: CheckoutPayment;

  completedPurchase?: CompletedPurchase;

  setCompletedPurchase: (purchase: CompletedPurchase) => void;

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

  completedPurchase: undefined,

  setCompletedPurchase: (purchase) =>
    set({
      completedPurchase: purchase,
    }),

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
      completedPurchase: undefined,
    }),
}));
