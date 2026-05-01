import { FastifyRequest, FastifyReply } from "fastify";

function assertAuthenticated(req: FastifyRequest, reply: FastifyReply) {
  if (!req.userId) {
    reply.code(401);

		// TODO: test if this will be throw when calling the api without being authenticated
    throw new Error("Sem autorização");
  }
}

export async function requireAuth(req: FastifyRequest, reply: FastifyReply) {
  assertAuthenticated(req, reply);
}
