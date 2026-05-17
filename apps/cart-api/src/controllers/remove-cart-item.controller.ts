import { removeCartItemSchema } from "@repo/schemas";
import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { removeCartItemService } from "../services/remove-cart-item.service";

export async function removeCartItemController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = removeCartItemSchema.safeParse(req.params);

  if (!parsed.success) {
    return reply.status(400).send({
      errors: z.treeifyError(parsed.error),
    });
  }

  const [error] = await to(
    removeCartItemService({
      buyerClerkId: req.userId!,
      productId: parsed.data.productId,
    }),
  );

  if (error) {
    return reply.status(400).send({
      message: error.message || "Não foi possível remover o item.",
    });
  }

  return reply.status(200).send();
}
