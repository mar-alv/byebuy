import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getAddedProductsUseCase } from "../../../../application/use-cases/get-added-products.use-case";

export async function getAddedProductsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const [error, products] = await to(
    getAddedProductsUseCase({
      sellerClerkId: req.userId!,
    }),
  );

  if (error) {
    return reply.status(500).send({
      message:
        "Não foi possível listar seus produtos adicionados. Tente novamente.",
    });
  }

  return reply.status(200).send({ products });
}
