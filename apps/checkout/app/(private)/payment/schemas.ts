import { z } from "zod";

export const checkoutPaymentSchema = z.object({
  method: z.enum(["pix", "credit_card", "debit_card"], {
    error: "Selecione uma forma de pagamento.",
  }),

  installments: z.number().min(1, "Selecione o número de parcelas.").optional(),
});

export type CheckoutPayment = z.infer<typeof checkoutPaymentSchema>;

export type CheckoutPaymentInput = CheckoutPayment;
