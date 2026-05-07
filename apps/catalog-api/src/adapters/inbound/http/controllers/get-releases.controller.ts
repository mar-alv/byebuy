import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getReleasesUseCase } from "../../../../application/use-cases/get-releases.use-case";

export async function getReleasesController(
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  const [error, products] = await to(getReleasesUseCase());

  if (error) {
    return reply.status(500).send({
      message:
        "Não foi possível listar os últimos lançamentos. Tente novamente.",
    });
  }

  return reply.status(200).send({ products });
}
