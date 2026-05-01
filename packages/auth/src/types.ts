import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId: string | null;
    auth?: {
      userId?: string | null;
      sessionId?: string | null;
      orgId?: string | null;
      isAuthenticated?: boolean;
    };
  }
}
