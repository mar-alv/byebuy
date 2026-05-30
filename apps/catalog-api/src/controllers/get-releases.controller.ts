import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getReleasesService } from "../services/get-releases.service";

export async function getReleasesController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const [error, products] = await to(getReleasesService(req.userId!));

  if (error) {
    return reply.status(500).send({
      message:
        "Não foi possível listar os últimos lançamentos. Tente novamente.",
    });
  }

  return reply.status(200).send({ products });
}
