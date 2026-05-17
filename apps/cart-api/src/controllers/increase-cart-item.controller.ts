import { increaseCartItemSchema } from "@repo/schemas";
import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { increaseCartItemService } from "../services/increase-cart-item.service";

export async function increaseCartItemController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = increaseCartItemSchema.safeParse(req.params);

  if (!parsed.success) {
    return reply.status(400).send({
      errors: z.treeifyError(parsed.error),
    });
  }

  const [error] = await to(
    increaseCartItemService({
      buyerClerkId: req.userId!,
      productId: parsed.data.productId,
    }),
  );

  if (error) {
    return reply.status(400).send({
      message: error.message || "Não foi possível aumentar a quantidade.",
    });
  }

  return reply.status(200).send();
}
