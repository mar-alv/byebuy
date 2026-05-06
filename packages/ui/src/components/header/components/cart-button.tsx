"use client";

import { useCartStore } from "@repo/cart-store";
import { urls } from "@repo/configs";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

export function CartButton() {
  const items = useCartStore((state) => state.items);

  const totalUnits = items.reduce((sum, item) => sum + item.inCart, 0);

  return (
    <Button asChild size="icon" variant="ghost" className="relative">
      <Link href={`${urls.checkout}/cart`}>
        <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />

        {totalUnits > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
            "
          >
            {totalUnits}
          </span>
        )}
      </Link>
    </Button>
  );
}
