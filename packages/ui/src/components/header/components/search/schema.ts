import { z } from "zod";

export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "Digite algo para pesquisar.")
    .max(100, "A busca é muito longa.")
    .refine((value) => value.length > 0, {
      message: "Digite algo válido.",
    }),
});

export type Search = z.infer<typeof searchSchema>;
