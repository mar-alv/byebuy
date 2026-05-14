import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "O nome é obrigatório.")
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(50, "O nome é muito longo.")
    .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "O nome contém caracteres inválidos."),

  lastName: z
    .string()
    .min(1, "O sobrenome é obrigatório.")
    .min(2, "O sobrenome deve ter pelo menos 2 caracteres.")
    .max(50, "O sobrenome é muito longo.")
    .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "O sobrenome contém caracteres inválidos."),

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

export type SignUp = z.infer<typeof signUpSchema>;
