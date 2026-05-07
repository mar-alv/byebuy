import { FastifyInstance } from "fastify";
import { getReleasesController } from "../controllers/get-releases.controller";
import { searchProductsController } from "../controllers/search-products.controller";

export default async function catalogRoutes(app: FastifyInstance) {
  app.get("/releases", getReleasesController);
  app.get("/search", searchProductsController);
}
