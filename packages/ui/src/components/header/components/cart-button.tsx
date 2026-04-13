"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { APP_URLS } from "../../../config";

export function CartButton() {
  // TODO: when signed-in show count in cart, if there is

  return (
    <Button asChild size="icon" variant="ghost">
      <Link href={`${APP_URLS.checkout}/cart`}>
        <ShoppingCart className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
      </Link>
    </Button>
  );
}
