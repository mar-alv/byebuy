import { z } from "zod";

const addressSchema = z.object({
  zipCode: z.string().min(8, "Informe um CEP válido.").max(9).optional(),

  street: z.string().optional(),

  number: z.string().min(1, "Informe o número.").optional(),

  complement: z.string().optional(),

  neighborhood: z.string().min(1, "Informe o bairro.").optional(),

  city: z.string().min(1, "Informe a cidade."),

  state: z.string().min(1, "Informe o estado."),

  country: z.string(),
});

export const checkoutDeliverySchema = z.object({
  items: z.array(
    z
      .object({
        productId: z.string(),

        deliveryMethod: z.enum(["pickup", "shipping"]),

        address: addressSchema.optional(),
      })
      .superRefine((data, ctx) => {
        if (data.deliveryMethod === "shipping") {
          if (!data.address) {
            ctx.addIssue({
              code: "custom",
              path: ["address"],
              message: "Informe o endereço.",
            });

            return;
          }

          const result = addressSchema.safeParse(data.address);

          if (!result.success) {
            result.error.issues.forEach((issue) => {
              ctx.addIssue({
                ...issue,
                path: ["address", ...(issue.path ?? [])],
              });
            });
          }
        }
      }),
  ),
});

export type CheckoutDeliveryInput = z.input<typeof checkoutDeliverySchema>;

export type CheckoutDelivery = z.output<typeof checkoutDeliverySchema>;
