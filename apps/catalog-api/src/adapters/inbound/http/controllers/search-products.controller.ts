import { searchSchema } from "@repo/schemas";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { searchProductsUseCase } from "../../../../application/use-cases/search-products.use-case";

export async function searchProductsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const parsed = searchSchema.safeParse(req.query);

    if (!parsed.success) {
      return reply.status(400).send({
        message: "Dados inválidos.",
        errors: z.treeifyError(parsed.error),
      });
    }

    const products = await searchProductsUseCase(parsed.data);

    return reply.status(200).send({ products });
  } catch {
    return reply.status(500).send({
      message: "Não foi possível buscar o(s) produto(s). Tente novamente.",
    });
  }
}
