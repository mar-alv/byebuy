"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFinishPurchase } from "@repo/api";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@repo/ui/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Separator } from "@repo/ui/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { useCheckoutStore } from "@/stores/checkout-store";
import { CreditCard, Landmark, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
  CheckoutPayment,
  CheckoutPaymentInput,
  checkoutPaymentSchema,
} from "../schemas";

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}

export function CheckoutPaymentContent() {
  const router = useRouter();

  const { items, deliveryItems, payment, reset, setPayment } =
    useCheckoutStore();

  const { mutateAsync, isPending } = useFinishPurchase();

  const subtotalPrice = items.reduce(
    (total, item) => total + item.price * item.inCart,
    0,
  );

  const shippingPrice = items.reduce((total, item) => {
    const delivery = deliveryItems.find(
      (delivery) => delivery.productId === item.id,
    );

    if (delivery?.deliveryMethod !== "shipping") {
      return total;
    }

    return total + (item.delivery?.shippingPrice ?? 0);
  }, 0);

  const totalPrice = subtotalPrice + shippingPrice;

  const form = useForm<CheckoutPaymentInput>({
    resolver: zodResolver(checkoutPaymentSchema),
    defaultValues: {
      method: payment.method,
      installments: payment.installments || 1,
    },
  });

  async function handleSubmit(data: CheckoutPayment) {
    setPayment(data);

    const response = await mutateAsync({
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.inCart,
        delivery:
          deliveryItems.find((delivery) => delivery.productId === item.id) ||
          null,
      })),
      payment: data,
    });

    useCheckoutStore.setState({
      completedPurchase: response,
      items: [],
      deliveryItems: [],
      payment: {},
    });

    router.push("/success");
  }

  const selectedMethod = form.watch("method");

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6"
    >
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Forma de pagamento</CardTitle>

            <CardDescription>
              Escolha como deseja concluir o pagamento
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet>
              <FieldGroup className="gap-6">
                <Controller
                  name="method"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Método</FieldLabel>

                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                      >
                        <label
                          htmlFor="pix"
                          className="border rounded-2xl p-4 cursor-pointer transition hover:border-primary"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <QrCode className="size-4" />

                                <span className="font-medium">PIX</span>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                Aprovação instantânea
                              </p>
                            </div>

                            <RadioGroupItem value="pix" id="pix" />
                          </div>
                        </label>

                        <label
                          htmlFor="credit_card"
                          className="border rounded-2xl p-4 cursor-pointer transition hover:border-primary"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <CreditCard className="size-4" />

                                <span className="font-medium">
                                  Cartão de crédito
                                </span>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                Parcelamento disponível
                              </p>
                            </div>

                            <RadioGroupItem
                              value="credit_card"
                              id="credit_card"
                            />
                          </div>
                        </label>

                        <label
                          htmlFor="debit_card"
                          className="border rounded-2xl p-4 cursor-pointer transition hover:border-primary"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Landmark className="size-4" />

                                <span className="font-medium">
                                  Cartão de débito
                                </span>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                Pagamento imediato
                              </p>
                            </div>

                            <RadioGroupItem
                              value="debit_card"
                              id="debit_card"
                            />
                          </div>
                        </label>
                      </RadioGroup>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {selectedMethod === "credit_card" && (
                  <Controller
                    name="installments"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Parcelas</FieldLabel>

                        <Select
                          value={String(field.value)}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>

                          <SelectContent>
                            {Array.from({ length: 12 }).map((_, index) => (
                              <SelectItem
                                key={index + 1}
                                value={String(index + 1)}
                              >
                                {index + 1}x de{" "}
                                {formatPrice(
                                  Math.ceil(totalPrice / (index + 1)),
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}

                {selectedMethod === "pix" && (
                  <div className="rounded-2xl border p-5 space-y-3">
                    <Badge>PIX</Badge>

                    <div className="space-y-1">
                      <h3 className="font-medium">Pagamento rápido e seguro</h3>

                      <p className="text-sm text-muted-foreground">
                        Após finalizar o pedido você verá o QR Code para pagar.
                      </p>
                    </div>
                  </div>
                )}
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-6">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Resumo do pedido</h2>

              <p className="text-sm text-muted-foreground">
                Confira os valores da sua compra
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>

                    <p className="text-muted-foreground">
                      {item.inCart}x unidade
                    </p>
                  </div>

                  <span>{formatPrice(item.price * item.inCart)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>

                <span>{formatPrice(subtotalPrice)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Entrega</span>

                <span>
                  {shippingPrice === 0 ? "Grátis" : formatPrice(shippingPrice)}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>

                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Finalizando..." : "Finalizar compra"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
