import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .max(254, "O e-mail é muito longo.")
    .pipe(z.email("Digite um e-mail válido.")),

  password: z.string().min(1, "A senha é obrigatória."),
});

export type SignIn = z.infer<typeof signInSchema>;
