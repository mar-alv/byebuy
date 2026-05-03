import { FastifyReply, FastifyRequest } from "fastify";
import { getAddedProductsUseCase } from "../../../../application/use-cases/get-added-products.use-case";

export async function getAddedProductsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const products = await getAddedProductsUseCase({
      sellerClerkId: req.userId!,
    });

    return reply.status(200).send({ products });
  } catch {
    return reply.status(500).send({
      message:
        "Não foi possível listar seus produtos adicionados. Tente novamente.",
    });
  }
}
