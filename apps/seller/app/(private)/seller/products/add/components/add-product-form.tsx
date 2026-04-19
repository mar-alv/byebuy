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
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { AddProduct, addProductSchema } from "../schemas";
import { Typography } from "@repo/ui/components/typography";

export function AddProductForm() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const form = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const zipCode = form.watch("location.zipCode");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageFiles = acceptedFiles.filter((file) =>
        file.type.startsWith("image/"),
      );

      setFiles((prev) => {
        const updated = [
          ...prev,
          ...imageFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
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

  function removeFile(name: string) {
    setFiles((prev) => {
      const updated = prev.filter((file) => file.name !== name);

      form.setValue("images", updated, { shouldValidate: true });

      return updated;
    });
  }

  async function fetchCep(zipCode: string) {
    const clean = zipCode.replace(/\D/g, "");

    if (clean.length !== 8) return null;

    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    const data = await res.json();

    if (data.erro) return null;

    return data;
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
    const load = async () => {
      if (!zipCode) return;

      const data = await fetchCep(zipCode);
      if (!data) return;

      form.setValue("location.city", data.localidade);
      form.setValue("location.state", data.uf);
      form.setValue("location.street", data.logradouro);
    };

    load();
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

                      <FieldGroup className="space-y-4">
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

                        {/* TODO: use wysiwyg component */}
                        <Controller
                          name="description"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Descrição</FieldLabel>
                              <Input
                                placeholder="Descreva seu produto..."
                                {...field}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <FieldGroup>
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

                      <FieldGroup className="space-y-4">
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
                    <CardTitle className="text-base">Localização</CardTitle>
                    <CardDescription>
                      Onde o produto está disponível
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <FieldSet>
                                            <FieldGroup className="space-y-4">
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

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Entrega</CardTitle>
                    <CardDescription>
                      Defina como o produto será entregue
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FieldSet>
                      <FieldLegend className="sr-only">Entrega</FieldLegend>

                      <FieldGroup className="space-y-6">
                        <FieldGroup>
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
                        </FieldGroup>

                        <FieldGroup>
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

                      <FieldGroup className="space-y-4">
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

                        {files.length > 0 && (
                          <div className="grid grid-cols-2 gap-3">
                            {files.map((file) => (
                              <div
                                key={file.name}
                                className="relative border rounded-lg overflow-hidden h-24"
                              >
                                <Image
                                  src={file.preview}
                                  alt={file.name}
                                  fill
                                  className="object-cover"
                                />
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  className="absolute top-1 right-1 h-6 w-6 z-10"
                                  onClick={() => removeFile(file.name)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </FieldGroup>
                    </FieldSet>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="border-t">
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
        </CardFooter>
      </Card>
    </div>
  );
}
