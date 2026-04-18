import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string("O nome é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(120, "O nome é muito longo."),

  description: z
    .string("A descrição é obrigatória.")
    .min(10, "A descrição deve ter pelo menos 10 caracteres.")
    .max(5000, "A descrição é muito longa."),

  price: z
    .string("O preço é obrigatório.")
    .min(1, "Informe um valor para o preço.")
    .transform((val) => Number(val))
    .pipe(z.number().min(1, "O preço deve ser maior que zero.")),

  quantity: z
    .string("A quantidade é obrigatória.")
    .min(1, "Informe a quantidade disponível.")
    .transform((val) => Number(val))
    .pipe(
      z
        .number()
        .int("A quantidade deve ser um número inteiro.")
        .min(1, "A quantidade deve ser pelo menos 1."),
    ),

  images: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Apenas imagens são permitidas",
      }),
    )
    .min(1, "Pelo menos uma imagem é obrigatória")
    .max(10, "Máximo de 10 imagens"),

  condition: z.enum(["new", "like_new", "good", "fair", "poor"], {
    message: "A condição é obrigatória.",
  }),

  usageTime: z.string().max(100, "Muito longo.").optional(),

  defects: z.string().max(1000, "Descrição muito longa.").optional(),

  location: z.object({
    city: z.string("A cidade é obrigatória.").min(1, "Informe a cidade."),
    state: z.string("O estado é obrigatório.").min(1, "Informe o estado."),
    country: z.string().min(1).default("Brasil"),
    zipCode: z.string().max(20).optional(),
  }),

  delivery: z
    .object({
      allowsShipping: z.boolean(),
      shippingCostType: z.enum(["free", "fixed", "calculated"]).optional(),

      shippingCost: z
        .string()
        .optional()
        .transform((val) =>
          val === undefined || val === "" ? undefined : Number(val),
        )
        .pipe(z.number().min(0).optional()),

      allowsPickup: z.boolean(),
      pickupInstructions: z.string().max(500).optional(),
    })
    .refine((data) => data.allowsShipping || data.allowsPickup, {
      message: "Selecione pelo menos um método de entrega.",
      path: ["allowsShipping"],
    }),

  // TODO: make use of
  /* tags: z
    .array(z.string().min(1).max(30))
    .max(10, "Máximo de 10 tags.")
    .optional(), */
});

export type AddProduct = z.infer<typeof addProductSchema>;
