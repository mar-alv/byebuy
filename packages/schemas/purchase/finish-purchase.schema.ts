import { z } from "zod";

export const finishPurchaseSchema = z.object({
  items: z.array(
    z.object({
      productId: z.uuid("Produto inválido."),
      quantity: z.number().min(1),

      delivery: z
        .object({
          productId: z.uuid(),
          deliveryMethod: z.enum(["pickup", "shipping"]),

          address: z
            .object({
              zipCode: z.string().optional(),
              street: z.string().optional(),
              number: z.string().optional(),
              complement: z.string().optional(),
              neighborhood: z.string().optional(),
              city: z.string(),
              state: z.string(),
              country: z.string(),
            })
            .optional(),
        })
        .nullable(),
    }),
  ),

  payment: z.object({
    method: z.enum(["pix", "credit_card", "debit_card"]),
    installments: z.number().optional(),
  }),
});

export type FinishPurchase = z.infer<typeof finishPurchaseSchema>;
