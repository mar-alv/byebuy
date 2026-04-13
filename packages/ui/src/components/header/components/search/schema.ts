import { z } from "zod";

// TODO: update validations
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .max(254, "O e-mail é muito longo.")
    .pipe(z.email("Digite um e-mail válido.")),
});

export type Search = z.infer<typeof searchSchema>;
