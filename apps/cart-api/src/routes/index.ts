import { requireAuth } from "@repo/auth";
import { FastifyInstance } from "fastify";

import { getCartController } from "../controllers/get-cart.controller";
import { addCartItemController } from "../controllers/add-cart-item.controller";
import { increaseCartItemController } from "../controllers/increase-cart-item.controller";
import { decreaseCartItemController } from "../controllers/decrease-cart-item.controller";
import { removeCartItemController } from "../controllers/remove-cart-item.controller";
import { clearCartController } from "../controllers/clear-cart.controller";

export default async function cartRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);
  app.get("/", getCartController);
  app.post("/", addCartItemController);
  app.patch("/:productId/increase", increaseCartItemController);
  app.patch("/:productId/decrease", decreaseCartItemController);
  app.delete("/:productId", removeCartItemController);
  app.delete("/", clearCartController);
}
