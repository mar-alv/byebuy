import { decreaseCartItemSchema } from "@repo/schemas";
import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { decreaseCartItemService } from "../services/decrease-cart-item";

export async function decreaseCartItemController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = decreaseCartItemSchema.safeParse(req.params);

  if (!parsed.success) {
    return reply.status(400).send({
      errors: z.treeifyError(parsed.error),
    });
  }

  const [error] = await to(
    decreaseCartItemService({
      buyerClerkId: req.userId!,
      productId: parsed.data.productId,
    }),
  );

  if (error) {
    return reply.status(400).send({
      message: error.message || "Não foi possível diminuir a quantidade.",
    });
  }

  return reply.status(200).send();
}
