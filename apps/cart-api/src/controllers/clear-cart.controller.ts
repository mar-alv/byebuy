import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import { clearCartService } from "../services/clear-cart.service";

export async function clearCartController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const [error] = await to(clearCartService(req.userId!));

  if (error) {
    return reply.status(400).send({
      message: error.message || "Não foi possível limpar o carrinho.",
    });
  }

  return reply.status(200).send();
}
