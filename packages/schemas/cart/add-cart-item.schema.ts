import { z } from "zod";

export const cartProductParamsSchema = z.object({
  productId: z.uuid("Produto inválido."),
});

export type CartProductParams = z.infer<typeof cartProductParamsSchema>;

export const addCartItemSchema = z.object({
  productId: z.uuid("Produto inválido."),
});

export type AddCartItem = z.infer<typeof addCartItemSchema>;

export const increaseCartItemSchema = cartProductParamsSchema;

export type IncreaseCartItem = z.infer<typeof increaseCartItemSchema>;

export const decreaseCartItemSchema = cartProductParamsSchema;

export type DecreaseCartItem = z.infer<typeof decreaseCartItemSchema>;

export const removeCartItemSchema = cartProductParamsSchema;

export type RemoveCartItem = z.infer<typeof removeCartItemSchema>;
