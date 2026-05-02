import { addProductSchema } from "@repo/schemas";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { addProductUseCase } from "../../../../application/use-cases/add-product.use-case";

export async function addProductController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const parsed = addProductSchema.safeParse(req.body);

    if (!parsed.success) {
      return reply.status(400).send({
        message: "Dados inválidos.",
        errors: z.treeifyError(parsed.error),
      });
    }

    const product = await addProductUseCase({
      ...parsed.data,
      sellerClerkId: req.userId!,
    });

    return reply.status(201).send({ productId: product.id });
  } catch {
    return reply.status(500).send({
      message: "Não foi possível cadastrar o produto. Tente novamente.",
    });
  }
}
