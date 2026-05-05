import { FastifyInstance } from "fastify";
import { requireAuth } from "@repo/auth";
import { getReleasesController } from "../controllers/get-releases.controller";

export default async function catalogRoutes(app: FastifyInstance) {
  app.get(
    "/releases",
    {
      preHandler: requireAuth,
    },
    getReleasesController,
  );
}
