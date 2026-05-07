import { addProductSchema } from "@repo/schemas";
import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { addProductUseCase } from "../../../../application/use-cases/add-product.use-case";

export async function addProductController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = addProductSchema.safeParse(req.body);

  if (!parsed.success) {
    return reply.status(400).send({
      message: "Dados inválidos.",
      errors: z.treeifyError(parsed.error),
    });
  }

  const [error, product] = await to(
    addProductUseCase({
      ...parsed.data,
      sellerClerkId: req.userId!,
    }),
  );

  if (error) {
    return reply.status(500).send({
      message: "Não foi possível cadastrar o produto. Tente novamente.",
    });
  }

  return reply.status(201).send({ productId: product.id });
}
