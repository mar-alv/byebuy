import { getAuth } from "@clerk/fastify";
import { FastifyInstance, FastifyRequest } from "fastify";

export async function registerAuthDecorators(fastify: FastifyInstance) {
  fastify.decorateRequest("userId", null);

  fastify.addHook("preHandler", async (req: FastifyRequest) => {
    const { userId } = getAuth(req);

    req.userId = userId;
  });
}
