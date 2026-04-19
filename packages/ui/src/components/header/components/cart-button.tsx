"use client";

import { urls } from "@repo/configs";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";

export function CartButton() {
  // TODO: when signed-in show count in cart, if there is

  return (
    <Button asChild size="icon" variant="ghost">
      <Link href={`${urls.checkout}/cart`}>
        <ShoppingCart className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
      </Link>
    </Button>
  );
}
