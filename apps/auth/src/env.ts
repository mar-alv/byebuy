import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_CATALOG_URL: z.string().min(1, "Missing CATALOG_URL"),
});

export const env = schema.parse({
  NEXT_PUBLIC_CATALOG_URL: process.env.NEXT_PUBLIC_CATALOG_URL,
});
