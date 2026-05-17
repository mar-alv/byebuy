import { z } from "zod";

export const checkoutDeliverySchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      deliveryMethod: z.enum(["pickup", "shipping"]),
      address: z
        .object({
          zipCode: z
            .string()
            .min(8, "Informe um CEP válido.")
            .max(9)
            .optional(),
          street: z.string().optional(),
          number: z.string().min(1, "Informe o número.").optional(),
          complement: z.string().optional(),
          neighborhood: z.string().min(1, "Informe o bairro.").optional(),
          city: z.string().min(1, "Informe a cidade."),
          state: z.string().min(1, "Informe o estado."),
          country: z.string(),
        })
        .optional(),
    }),
  ),
});

export type CheckoutDeliveryInput = z.input<typeof checkoutDeliverySchema>;

export type CheckoutDelivery = z.output<typeof checkoutDeliverySchema>;
