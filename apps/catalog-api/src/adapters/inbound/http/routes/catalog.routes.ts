import { FastifyInstance } from "fastify";
import { getReleasesController } from "../controllers/get-releases.controller";

export default async function catalogRoutes(app: FastifyInstance) {
  app.get("/releases", getReleasesController);
}
