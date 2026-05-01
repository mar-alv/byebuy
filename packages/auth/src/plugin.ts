import { clerkPlugin } from "@clerk/fastify";
import fp from "fastify-plugin";
import { registerAuthDecorators } from "./decorators";

export const authPlugin = fp(async (fastify) => {
  fastify.register(clerkPlugin);

  await registerAuthDecorators(fastify);
});
