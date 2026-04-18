"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { AddProduct, addProductSchema } from "../schemas";

export function AddProductForm() {
  const form = useForm({
    resolver: zodResolver(addProductSchema),
  });

  async function handleSubmit({}: AddProduct) {
    // TODO: add new product
    // TODO: show error toast
    /* if (error) {
      toast.error("Não foi possível concluir o cadastro. Tente novamente.");

      return;
    } */
    // TODO: show success toast
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="border-b">
        <CardTitle>Adicionar novo produto</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para publicar seu produto à venda
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="add-product-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="space-y-8">
            <FieldSet>
              <FieldLegend>Informações do produto</FieldLegend>
              <FieldDescription>
                Dados principais do item que você deseja vender
              </FieldDescription>

              <FieldGroup className="mt-4 space-y-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Nome</FieldLabel>
                      <Input placeholder="Teclado mecânico" {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Descrição</FieldLabel>
                      <Input placeholder="Descreva seu produto..." {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Preço</FieldLabel>
                        <Input type="number" {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="quantity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Quantidade</FieldLabel>
                        <Input type="number" {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Estado do produto</FieldLegend>
              <FieldDescription>
                Informe as condições atuais do item
              </FieldDescription>

              <FieldGroup className="mt-4 space-y-4">
                <Controller
                  name="condition"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Condição</FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma condição" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="new">Novo</SelectItem>
                          <SelectItem value="like_new">Como novo</SelectItem>
                          <SelectItem value="good">Bom</SelectItem>
                          <SelectItem value="fair">Regular</SelectItem>
                          <SelectItem value="poor">Ruim</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="usageTime"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Tempo de uso</FieldLabel>
                      <Input placeholder="Ex: 6 meses" {...field} />
                    </Field>
                  )}
                />

                <Controller
                  name="defects"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Defeitos</FieldLabel>
                      <Input placeholder="Arranhões, marcas..." {...field} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Localização</FieldLegend>
              <FieldDescription>
                Onde o produto está disponível
              </FieldDescription>

              <FieldGroup className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="location.city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Cidade</FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="location.state"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Estado</FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name="location.zipCode"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>CEP</FieldLabel>
                      <Input {...field} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Entrega</FieldLegend>
              <FieldDescription>
                Defina como o produto será entregue
              </FieldDescription>

              <FieldGroup className="mt-4 space-y-4">
                <Controller
                  name="delivery.allowsShipping"
                  control={form.control}
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldLabel>Permite envio?</FieldLabel>
                        <FieldDescription>
                          Enviar pelos correios ou transportadora
                        </FieldDescription>
                      </FieldContent>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Field>
                  )}
                />

                <Controller
                  name="delivery.shippingCost"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Custo de envio</FieldLabel>
                      <Input type="number" {...field} />
                    </Field>
                  )}
                />

                <Controller
                  name="delivery.allowsPickup"
                  control={form.control}
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldLabel>Retirada no local?</FieldLabel>
                        <FieldDescription>
                          O comprador pode retirar pessoalmente
                        </FieldDescription>
                      </FieldContent>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Field>
                  )}
                />

                <Controller
                  name="delivery.pickupInstructions"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Instruções de retirada</FieldLabel>
                      <Input {...field} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="border-t">
        <Field className="w-full">
          <Button
            // TODO: uncomment
            // disabled={loading}
            size="lg"
            type="submit"
            form="add-product-form"
            className="w-full"
          >
            Publicar produto
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
