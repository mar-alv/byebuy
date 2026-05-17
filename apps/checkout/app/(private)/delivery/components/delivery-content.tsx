"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocation, useGetCart } from "@repo/api";
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
import { Input } from "@repo/ui/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { Separator } from "@repo/ui/components/ui/separator";
import { MapPin, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/stores/checkout-store";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  CheckoutDelivery,
  CheckoutDeliveryInput,
  checkoutDeliverySchema,
} from "../schemas";

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}

export function CheckoutDeliveryContent() {
  const router = useRouter();

  const { data: cart = { items: [] } } = useGetCart();

  const { setItems, setDeliveryMethod, setDeliveryAddress } =
    useCheckoutStore();

  const form = useForm<CheckoutDeliveryInput>({
    resolver: zodResolver(checkoutDeliverySchema),
    defaultValues: {
      items: cart.items.map((item) => ({
        productId: item.id,
        deliveryMethod:
          item.delivery?.hasShipping && !item.delivery?.hasPickup
            ? "shipping"
            : "pickup",
        address: {
          country: "Brasil",
          city: "",
          state: "",
        },
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "items",
  });

  async function fetchCep(zipCode: string) {
    const clean = zipCode.replace(/\D/g, "");

    if (clean.length !== 8) return null;

    const [error, data] = await getLocation({ zipCode });

    if (error || data?.erro) return null;

    return data;
  }

  async function applyCep(index: number) {
    const zipCode = form.watch(`items.${index}.address.zipCode`);

    if (!zipCode) return;

    const data = await fetchCep(zipCode);

    if (!data) return;

    form.setValue(`items.${index}.address.state`, data.uf);
    form.setValue(`items.${index}.address.city`, data.localidade);
    form.setValue(`items.${index}.address.neighborhood`, data.bairro);
    form.setValue(`items.${index}.address.street`, data.logradouro);
  }

  async function handleSubmit(data: CheckoutDelivery) {
    setItems(cart.items);

    data.items.forEach((item) => {
      setDeliveryMethod(item.productId, item.deliveryMethod);

      if (item.address) {
        setDeliveryAddress(item.productId, item.address);
      }
    });

    router.push("/checkout/payment");
  }

  useEffect(() => {
    fields.forEach((_, index) => {
      applyCep(index);
    });
  }, [fields]);

  const subtotalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.inCart,
    0,
  );

  const shippingPrice = cart.items.reduce((total, item) => {
    if (!item.delivery?.hasShipping) return total;

    return total + (item.delivery.shippingPrice ?? 0);
  }, 0);

  const totalPrice = subtotalPrice + shippingPrice;

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6"
    >
      <div className="space-y-4">
        {fields.map((field, index) => {
          const item = cart.items[index];

          if (!item) return null;

          const deliveryMethod = form.watch(`items.${index}.deliveryMethod`);

          const canShip = item.delivery?.hasShipping;
          const canPickup = item.delivery?.hasPickup;

          return (
            <Card key={field.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{item.name}</CardTitle>

                    <CardDescription>{formatPrice(item.price)}</CardDescription>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.location && (
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="size-3" />
                        {item.location.city}, {item.location.state}
                      </Badge>
                    )}

                    {canShip && (
                      <Badge variant="outline" className="gap-1">
                        <Truck className="size-3" />
                        Entrega disponível
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <FieldSet>
                  <FieldGroup className="gap-0 space-y-6">
                    <Controller
                      name={`items.${index}.deliveryMethod`}
                      control={form.control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Como você quer receber?</FieldLabel>

                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-wrap gap-6 mt-2"
                          >
                            {canPickup && (
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  value="pickup"
                                  id={`pickup-${index}`}
                                />

                                <label
                                  htmlFor={`pickup-${index}`}
                                  className="text-sm font-medium leading-none"
                                >
                                  Retirar no local
                                </label>
                              </div>
                            )}

                            {canShip && (
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  value="shipping"
                                  id={`shipping-${index}`}
                                />

                                <label
                                  htmlFor={`shipping-${index}`}
                                  className="text-sm font-medium leading-none"
                                >
                                  Receber em casa
                                </label>
                              </div>
                            )}
                          </RadioGroup>
                        </Field>
                      )}
                    />

                    {deliveryMethod === "pickup" && item.location && (
                      <div className="rounded-xl border p-4 space-y-2">
                        <div>
                          <h3 className="font-medium">Local de retirada</h3>

                          <p className="text-sm text-muted-foreground">
                            Combine a retirada com o vendedor
                          </p>
                        </div>

                        <Separator />

                        <div className="space-y-1 text-sm">
                          <p>
                            {item.location.street}, {item.location.number}
                          </p>

                          <p>{item.location.neighborhood}</p>

                          <p>
                            {item.location.city} - {item.location.state}
                          </p>
                        </div>

                        {item.delivery?.pickupInstructions && (
                          <div className="pt-2">
                            <p className="text-sm text-muted-foreground">
                              {item.delivery.pickupInstructions}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {deliveryMethod === "shipping" && (
                      <div className="rounded-xl border p-4 space-y-4">
                        <div>
                          <h3 className="font-medium">Endereço de entrega</h3>

                          <p className="text-sm text-muted-foreground">
                            Informe onde deseja receber o produto
                          </p>
                        </div>

                        <Controller
                          name={`items.${index}.address.zipCode`}
                          control={form.control}
                          render={({ field }) => (
                            <Field>
                              <FieldLabel>CEP</FieldLabel>

                              <Input placeholder="00000-000" {...field} />
                            </Field>
                          )}
                        />

                        <div className="grid grid-cols-3 gap-4">
                          <Controller
                            name={`items.${index}.address.street`}
                            control={form.control}
                            render={({ field }) => (
                              <Field className="col-span-2">
                                <FieldLabel>Rua</FieldLabel>

                                <Input placeholder="Av. Paulista" {...field} />
                              </Field>
                            )}
                          />

                          <Controller
                            name={`items.${index}.address.number`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Número</FieldLabel>

                                <Input placeholder="123" {...field} />

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </div>

                        <Controller
                          name={`items.${index}.address.complement`}
                          control={form.control}
                          render={({ field }) => (
                            <Field>
                              <FieldLabel>Complemento</FieldLabel>

                              <Input placeholder="Apto, bloco..." {...field} />
                            </Field>
                          )}
                        />

                        <Controller
                          name={`items.${index}.address.neighborhood`}
                          control={form.control}
                          render={({ field }) => (
                            <Field>
                              <FieldLabel>Bairro</FieldLabel>

                              <Input placeholder="Centro" {...field} />
                            </Field>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <Controller
                            name={`items.${index}.address.city`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Cidade</FieldLabel>

                                <Input placeholder="Porto Alegre" {...field} />

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />

                          <Controller
                            name={`items.${index}.address.state`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Estado</FieldLabel>

                                <Input placeholder="RS" {...field} />

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </FieldGroup>
                </FieldSet>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <Card className="sticky top-6">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Resumo do pedido</h2>

              <p className="text-sm text-muted-foreground">
                Confira os valores antes de continuar
              </p>
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

            <Button type="submit" size="lg" className="w-full">
              Ir para pagamento
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
