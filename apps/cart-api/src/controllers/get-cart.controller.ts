import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getCartService } from "../services/get-cart.service";

export async function getCartController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const [error, cart] = await to(getCartService(req.userId!));

  if (error) {
    return reply.status(500).send({
      message: "Não foi possível buscar o carrinho.",
    });
  }

  return reply.status(200).send(cart);
}
