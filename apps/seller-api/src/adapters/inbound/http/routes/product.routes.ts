import { FastifyInstance } from "fastify";
import { requireAuth } from "@repo/auth";
import { addProductController } from "../controllers/add-product.controller";
import { getAddedProductsController } from "../controllers/get-added-products.controller";

export default async function productRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: requireAuth,
    },
    addProductController,
  );

  app.get(
    "/",
    {
      preHandler: requireAuth,
    },
    getAddedProductsController,
  );
}
