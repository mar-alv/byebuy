"use client";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Separator } from "@repo/ui/components/ui/separator";
import { useCheckoutStore } from "@/stores/checkout-store";
import {
  CheckCircle2,
  CreditCard,
  Landmark,
  MapPin,
  QrCode,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}

function formatPaymentMethod(method: string) {
  switch (method) {
    case "pix":
      return "PIX";

    case "credit_card":
      return "Cartão de crédito";

    case "debit_card":
      return "Cartão de débito";

    default:
      return method;
  }
}

function PaymentIcon({ method }: { method: string }) {
  if (method === "pix") {
    return <QrCode className="size-4" />;
  }

  if (method === "credit_card") {
    return <CreditCard className="size-4" />;
  }

  return <Landmark className="size-4" />;
}

export function CheckoutSuccessContent() {
  const purchase = useCheckoutStore((state) => state.completedPurchase);
  const router = useRouter();

	console.log('purchase', purchase);
	
  /* useEffect(() => {
    if (!purchase) {
      router.replace("/");
    }
  }, [purchase, router]); */

  if (!purchase) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-6">
        <Card className="border-green-500/30">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="rounded-full bg-green-500/10 p-3">
              <CheckCircle2 className="size-6 text-green-600" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-semibold">
                Pedido realizado com sucesso
              </h2>

              <p className="text-sm text-muted-foreground">
                Pedido #{purchase.id.slice(0, 8)}
              </p>

              <p className="text-sm text-muted-foreground">
                Realizado em{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "full",
                  timeStyle: "short",
                }).format(new Date(purchase.createdAt))}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Itens comprados</CardTitle>

            <CardDescription>Confira os produtos do seu pedido</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {purchase.items.map((item, index) => (
              <div key={item.id} className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.name}</h3>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {item.quantity}x unidade
                        </Badge>

                        <Badge variant="outline">
                          {item.deliveryMethod === "shipping"
                            ? "Entrega"
                            : "Retirada"}
                        </Badge>
                      </div>
                    </div>

                    {item.deliveryMethod === "shipping" && item.address && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-4 mt-0.5" />

                        <div>
                          <p>
                            {item.address.street}, {item.address.number}
                          </p>

                          <p>{item.address.neighborhood}</p>

                          <p>
                            {item.address.city} - {item.address.state}
                          </p>

                          <p>{item.address.zipCode}</p>
                        </div>
                      </div>
                    )}

                    {item.deliveryMethod === "pickup" && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Store className="size-4" />

                        <span>Retirada combinada com vendedor</span>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.subtotal)}</p>

                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)} cada
                    </p>
                  </div>
                </div>

                {index !== purchase.items.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-6">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Resumo do pagamento</h2>

              <p className="text-sm text-muted-foreground">
                Informações da compra
              </p>
            </div>

            <Separator />

            <div className="rounded-2xl border p-4 flex items-start gap-3">
              <div className="rounded-full bg-muted p-2">
                <PaymentIcon method={purchase.paymentMethod} />
              </div>

              <div className="space-y-1">
                <p className="font-medium">
                  {formatPaymentMethod(purchase.paymentMethod)}
                </p>

                {purchase.installments && (
                  <p className="text-sm text-muted-foreground">
                    {purchase.installments}x parcelas
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>

                <span>{formatPrice(purchase.subtotalPrice)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Entrega</span>

                <span>
                  {purchase.shippingPrice === 0
                    ? "Grátis"
                    : formatPrice(purchase.shippingPrice)}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>

                <span>{formatPrice(purchase.totalPrice)}</span>
              </div>
            </div>

            <Button asChild size="lg" className="w-full">
              <Link href="/">Continuar comprando</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/purchases">Ver meus pedidos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
