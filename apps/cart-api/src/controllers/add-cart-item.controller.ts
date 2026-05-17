import { addCartItemSchema } from "@repo/schemas";
import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { addCartItemService } from "../services/add-cart-item.service";

export async function addCartItemController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = addCartItemSchema.safeParse(req.body);

  if (!parsed.success) {
    return reply.status(400).send({
      errors: z.treeifyError(parsed.error),
    });
  }

  const [error] = await to(
    addCartItemService({
      buyerClerkId: req.userId!,
      productId: parsed.data.productId,
    }),
  );

  if (error) {
    return reply.status(400).send({
      message: error.message || "Não foi possível adicionar o item.",
    });
  }

  return reply.status(201).send();
}
