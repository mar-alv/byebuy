import { FastifyReply, FastifyRequest } from "fastify";
import { getReleasesUseCase } from "../../../../application/use-cases/get-releases.use-case";

export async function getReleasesController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const products = await getReleasesUseCase();

    return reply.status(200).send({ products });
  } catch (e){
		console.log(e);
		
    return reply.status(500).send({
      message:
        "Não foi possível listar os últimos lançamentos. Tente novamente.",
    });
  }
}
