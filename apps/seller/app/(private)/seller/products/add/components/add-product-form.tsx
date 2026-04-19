"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddProduct, addProductSchema } from "@repo/schemas/seller";
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
import { Typography } from "@repo/ui/components/typography";
import { WysiwygEditor } from "@repo/ui/components/wysiwyg-editor";
import Image from "next/image";
import { Trash2, UploadCloud } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { getLocation } from "@/services/viacep";

export function AddProductForm() {
  const [images, setImages] = useState<(File & { preview: string })[]>([]);

  const form = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const zipCode = form.watch("location.zipCode");
  const methods = form.watch("delivery.methods");

  const onDrop = useCallback(
    (acceptedImages: File[]) => {
      const images = acceptedImages.filter((image) =>
        image.type.startsWith("image/"),
      );

      setImages((prev) => {
        const updated = [
          ...prev,
          ...images.map((image) =>
            Object.assign(image, {
              preview: URL.createObjectURL(image),
            }),
          ),
        ].slice(0, 10);

        form.setValue("images", updated, { shouldValidate: true });

        return updated;
      });
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 10,
  });

  function removeImage(name: string) {
    setImages((prev) => {
      const updated = prev.filter((image) => image.name !== name);

      form.setValue("images", updated, { shouldValidate: true });

      return updated;
    });
  }

  async function fetchCep(zipCode: string) {
    const clean = zipCode.replace(/\D/g, "");

    if (clean.length !== 8) return null;

    const [error, data] = await getLocation({ zipCode });

    if (error || data?.erro) return null;

    return data;
  }

  async function applyCepToForm() {
    if (!zipCode) return;

    const data = await fetchCep(zipCode);

    if (!data) return;

    form.setValue("location.city", data.localidade);
    form.setValue("location.state", data.uf);
    form.setValue("location.street", data.logradouro);
  }

  async function handleSubmit({}: AddProduct) {
    // TODO: add new product
    // TODO: show error toast
    /* if (error) {
      toast.error("Não foi possível concluir o cadastro. Tente novamente.");

      return;
    } */
    // TODO: show success toast
  }

  useEffect(() => {
    applyCepToForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipCode]);

  return (
    <div className="gap-6 flex flex-col">
      <div>
        <Typography.Heading.M>Adicionar novo produto</Typography.Heading.M>

        <Typography.Paragraph.S>
          Preencha os dados abaixo para publicar seu produto à venda
        </Typography.Paragraph.S>
      </div>

      <Card className="w-full max-w-6xl">
        <CardContent>
          <form
            id="add-product-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Informações do produto
                    </CardTitle>
                    <CardDescription>Dados principais do item</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FieldSet>
                      <FieldLegend className="sr-only">
                        Informações do produto
                      </FieldLegend>

                      <FieldGroup className="gap-0 space-y-4">
                        <Controller
                          name="name"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Nome</FieldLabel>
                              <Input
                                placeholder="Teclado mecânico"
                                {...field}
                              />
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

                              <WysiwygEditor
                                value={field.value}
                                onChange={field.onChange}
                              />

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <FieldGroup className="gap-0">
                          <div className="grid grid-cols-2 gap-4">
                            <Controller
                              name="price"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel>Preço</FieldLabel>
                                  <Input
                                    placeholder="R$ 99.99"
                                    type="number"
                                    {...field}
                                  />
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
                                  <Input
                                    placeholder="10"
                                    type="number"
                                    {...field}
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          </div>
                        </FieldGroup>
                      </FieldGroup>
                    </FieldSet>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Localização</CardTitle>
                    <CardDescription>
                      Onde o produto está disponível
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <FieldSet>
                      <FieldGroup className="gap-0 space-y-4">
                        <Controller
                          name="location.zipCode"
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
                            name="location.street"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field
                                data-invalid={fieldState.invalid}
                                className="col-span-2"
                              >
                                <FieldLabel>Rua</FieldLabel>
                                <Input placeholder="Av. Paulista" {...field} />
                              </Field>
                            )}
                          />

                          <Controller
                            name="location.number"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Número</FieldLabel>
                                <Input placeholder="123" {...field} />
                              </Field>
                            )}
                          />
                        </div>

                        <Controller
                          name="location.complement"
                          control={form.control}
                          render={({ field }) => (
                            <Field>
                              <FieldLabel>Complemento</FieldLabel>
                              <Input
                                placeholder="Apto, bloco, etc."
                                {...field}
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="location.neighborhood"
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
                            name="location.city"
                            control={form.control}
                            render={({ field }) => (
                              <Field>
                                <FieldLabel>Cidade</FieldLabel>
                                <Input placeholder="Porto Alegre" {...field} />
                              </Field>
                            )}
                          />

                          <Controller
                            name="location.state"
                            control={form.control}
                            render={({ field }) => (
                              <Field>
                                <FieldLabel>Estado</FieldLabel>
                                <Input placeholder="RS" {...field} />
                              </Field>
                            )}
                          />
                        </div>
                      </FieldGroup>
                    </FieldSet>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Imagens</CardTitle>
                    <CardDescription>Adicione fotos do produto</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <FieldSet>
                      <FieldLegend className="sr-only">Imagens</FieldLegend>

                      <FieldGroup className="gap-0 space-y-4">
                        <div
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-lg cursor-pointer transition-all h-45 flex items-center justify-center ${
                            isDragActive
                              ? "border-primary bg-muted"
                              : "border-gray-300"
                          }`}
                        >
                          <input {...getInputProps()} />
                          <div className="flex flex-col items-center text-center px-4">
                            <UploadCloud className="w-8 h-8 mb-2" />
                            <p className="text-xs text-muted-foreground">
                              Clique ou arraste imagens
                            </p>
                          </div>
                        </div>

                        <div className="h-42.5 grid grid-cols-2 gap-3 content-start overflow-y-auto">
                          {images.map((image) => (
                            <div
                              key={image.name}
                              className="relative group border rounded-lg overflow-hidden h-24"
                            >
                              <Image
                                src={image.preview}
                                alt={image.name}
                                fill
                                className="object-cover"
                              />

                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => removeImage(image.name)}
                                className="cursor-pointer absolute top-1 right-1 h-6 w-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </FieldGroup>
                    </FieldSet>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Estado do produto
                    </CardTitle>
                    <CardDescription>Condições atuais do item</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FieldSet>
                      <FieldLegend className="sr-only">
                        Estado do produto
                      </FieldLegend>

                      <FieldGroup className="gap-0 space-y-4">
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
                                  <SelectItem value="like_new">
                                    Como novo
                                  </SelectItem>
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
                              <Input
                                placeholder="Arranhões, marcas..."
                                {...field}
                              />
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </FieldSet>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Entrega</CardTitle>
                    <CardDescription>
                      Defina como o produto será entregue
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <FieldSet>
                      <FieldGroup className="gap-0 space-y-6">
                        <Controller
                          name="delivery.methods"
                          control={form.control}
                          render={({ field }) => (
                            <Field>
                              <FieldLabel>Métodos de entrega</FieldLabel>

                              <div className="flex gap-6 mt-2">
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={field.value?.includes("shipping")}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      const current = field.value || [];

                                      field.onChange(
                                        checked
                                          ? [...current, "shipping"]
                                          : current.filter(
                                              (v: string) => v !== "shipping",
                                            ),
                                      );
                                    }}
                                  />
                                  Envio
                                </label>

                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={field.value?.includes("pickup")}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      const current = field.value || [];

                                      field.onChange(
                                        checked
                                          ? [...current, "pickup"]
                                          : current.filter(
                                              (v: string) => v !== "pickup",
                                            ),
                                      );
                                    }}
                                  />
                                  Retirada
                                </label>
                              </div>
                            </Field>
                          )}
                        />

                        {methods?.includes("shipping") && (
                          <div className="border rounded-lg p-4 space-y-4">
                            <Typography.Paragraph.S className="font-medium">
                              Envio
                            </Typography.Paragraph.S>

                            <Controller
                              name="delivery.shipping.type"
                              control={form.control}
                              render={({ field }) => (
                                <Field>
                                  <FieldLabel>Tipo de envio</FieldLabel>

                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Tipo de envio" />
                                    </SelectTrigger>

                                    <SelectContent>
                                      <SelectItem value="free">
                                        Grátis
                                      </SelectItem>
                                      <SelectItem value="fixed">
                                        Fixo
                                      </SelectItem>
                                      <SelectItem value="calculated">
                                        Calculado
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </Field>
                              )}
                            />

                            {form.watch("delivery.shipping.type") ===
                              "fixed" && (
                              <Controller
                                name="delivery.shipping.price"
                                control={form.control}
                                render={({ field }) => (
                                  <Field>
                                    <FieldLabel>Preço</FieldLabel>
                                    <Input type="number" {...field} />
                                  </Field>
                                )}
                              />
                            )}
                          </div>
                        )}

                        {methods?.includes("pickup") && (
                          <div className="border rounded-lg p-4 space-y-4">
                            <Typography.Paragraph.S className="font-medium">
                              Retirada
                            </Typography.Paragraph.S>

                            <Controller
                              name="delivery.pickup.instructions"
                              control={form.control}
                              render={({ field }) => (
                                <Field>
                                  <FieldLabel>Instruções</FieldLabel>
                                  <Input
                                    placeholder="Ex: após 18h"
                                    {...field}
                                  />
                                </Field>
                              )}
                            />
                          </div>
                        )}
                      </FieldGroup>
                    </FieldSet>
                  </CardContent>
                </Card>

                <Field className="w-full">
                  <Button
                    size="lg"
                    type="submit"
                    form="add-product-form"
                    className="w-full"
                  >
                    Publicar produto
                  </Button>
                </Field>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
