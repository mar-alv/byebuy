import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLocation = {
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  country: string;
};

export type CartDelivery = {
  hasShipping: boolean;
  shippingType?: "free" | "fixed" | "calculated";
  shippingPrice?: number;
  hasPickup: boolean;
  pickupInstructions?: string;
};

export type CartItem = {
  id: string;
  name: string;
  image?: string;

  price: number;
  quantity: number;
  inCart: number;

  location?: CartLocation;
  delivery?: CartDelivery;
};

type CartStore = {
  items: CartItem[];

  addItem(product: Omit<CartItem, "inCart">): void;
  removeItem(id: string): void;
  increase(id: string): void;
  decrease(id: string): void;
  clearCart(): void;

  totalItems(): number;
  totalUnits(): number;

  subtotalPrice(): number;
  shippingPrice(): number;
  totalPrice(): number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;

        const existing = items.find((i) => i.id === product.id);

        if (existing) {
          if (existing.inCart >= existing.quantity) return;

          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, inCart: i.inCart + 1 } : i,
            ),
          });

          return;
        }

        set({
          items: [...items, { ...product, inCart: 1 }],
        });
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((i) => i.id !== id),
        });
      },

      increase: (id) => {
        set({
          items: get().items.map((i) => {
            if (i.id !== id) return i;

            if (i.inCart >= i.quantity) return i;

            return {
              ...i,
              inCart: i.inCart + 1,
            };
          }),
        });
      },

      decrease: (id) => {
        set({
          items: get()
            .items.map((i) => {
              if (i.id !== id) return i;

              return {
                ...i,
                inCart: i.inCart - 1,
              };
            })
            .filter((i) => i.inCart > 0),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.length,

      totalUnits: () => get().items.reduce((sum, item) => sum + item.inCart, 0),

      subtotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.inCart, 0),

      shippingPrice: () =>
        get().items.reduce((sum, item) => {
          if (!item.delivery?.hasShipping) return sum;

          return sum + (item.delivery.shippingPrice || 0);
        }, 0),

      totalPrice: () => get().subtotalPrice() + get().shippingPrice(),
    }),
    {
      name: "cart-storage",
    },
  ),
);
