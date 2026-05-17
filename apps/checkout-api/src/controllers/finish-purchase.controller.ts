import { finishPurchaseSchema } from "@repo/schemas";
import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { finishPurchaseService } from "../services/finish-purchase.service";

export async function finishPurchaseController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = finishPurchaseSchema.safeParse(req.body);

  if (!parsed.success) {
    return reply.status(400).send({
      errors: z.treeifyError(parsed.error),
    });
  }

  const [error, purchase] = await to(
    finishPurchaseService({
      buyerClerkId: req.userId!,
      data: parsed.data,
    }),
  );

  if (error) {
    return reply.status(400).send({
      message: error.message || "Não foi possível finalizar a compra.",
    });
  }

  return reply.status(201).send(purchase);
}
