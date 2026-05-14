"use client";

import Image from "next/image";
import { Trash2, Plus, Minus, MapPin, Truck } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Separator } from "@repo/ui/components/ui/separator";
import { Badge } from "@repo/ui/components/ui/badge";

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}

export function CartContent() {
  const {
    items,
    increase,
    decrease,
    removeItem,
    subtotalPrice,
    shippingPrice,
    totalPrice,
  } = useCartStore();

  if (!items.length) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-16 flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-5xl">🛒</span>

          <div>
            <h2 className="font-medium">Seu carrinho tá vazio</h2>

            <p className="text-sm text-muted-foreground">
              Bora garimpar umas relíquias?
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-muted">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>

                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.location && (
                        <Badge variant="secondary" className="gap-1">
                          <MapPin className="size-3" />
                          {item.location.city}, {item.location.state}
                        </Badge>
                      )}

                      {item.delivery?.hasShipping && (
                        <Badge variant="outline" className="gap-1">
                          <Truck className="size-3" />
                          Entrega disponível
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => decrease(item.id)}
                      >
                        <Minus className="size-4" />
                      </Button>

                      <span className="w-10 text-center text-sm">
                        {item.inCart}
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => increase(item.id)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>

                    <p className="font-semibold">
                      {formatPrice(item.price * item.inCart)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Card className="sticky top-6">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Resumo do pedido</h2>

              <p className="text-sm text-muted-foreground">
                Valores totais da sua compra
              </p>
            </div>

            <Separator />

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>

                <span>{formatPrice(subtotalPrice())}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Entrega</span>

                <span>
                  {shippingPrice() === 0
                    ? "Grátis"
                    : formatPrice(shippingPrice())}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>

                <span>{formatPrice(totalPrice())}</span>
              </div>
            </div>

            <Button size="lg" className="w-full">
              Finalizar compra
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
