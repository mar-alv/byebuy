"use client";

import { GetReleasesResponse } from "@/services/get-releases";
import { useCartStore } from "@repo/cart-store";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardFooter } from "@repo/ui/components/ui/card";
import { Heart, Minus, Plus } from "lucide-react";

interface ProductProps {
  product: GetReleasesResponse["products"][number];
}

export function Product({ product }: ProductProps) {
  const addItem = useCartStore((state) => state.addItem);
  const decrease = useCartStore((state) => state.decrease);
  const increase = useCartStore((state) => state.increase);

  const items = useCartStore((state) => state.items);

  const cartItem = items.find((i) => i.id === product.id);

  const inCart = !!cartItem;
  const quantity = cartItem?.inCart ?? 0;

  // TODO: use actual value
  const isFavorite = true;

  async function onFavorite() {
    // TODO: implement
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative h-48 bg-muted flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Imagem em breve</span>

        {/* TODO: uncomment */}
        {/* <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 rounded-full"
              onClick={onFavorite}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button> */}
      </div>

      <CardContent className="space-y-2 p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>

        <p className="text-sm text-muted-foreground">
          Quantidade: {product.quantity}
        </p>

        <p className="text-lg font-bold">R$ {product.price / 100}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 p-4 pt-0 border-0 bg-transparent">
        {!inCart && (
          <Button className="w-full" onClick={() => addItem(product)}>
            Adicionar ao carrinho
          </Button>
        )}

        {inCart && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => decrease(product.id)}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="text-sm font-medium min-w-6 text-center">
              {quantity}
            </span>

            <Button size="icon" onClick={() => increase(product.id)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
