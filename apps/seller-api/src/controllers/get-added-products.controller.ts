import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getAddedProductsService } from "../services/get-added-products.service";

export async function getAddedProductsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const [error, products] = await to(
    getAddedProductsService({
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
