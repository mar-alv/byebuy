import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .max(254, "O e-mail é muito longo.")
    .pipe(z.email("Digite um e-mail válido.")),

  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(64, "A senha deve ter no máximo 64 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .regex(
      /[^A-Za-z0-9]/,
      "A senha deve conter pelo menos um caractere especial.",
    ),
});

export type SignIn = z.infer<typeof signInSchema>;
