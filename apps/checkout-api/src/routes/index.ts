import { requireAuth } from "@repo/auth";
import { FastifyInstance } from "fastify";
import { finishPurchaseController } from "../controllers/finish-purchase.controller";

export default async function checkoutRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);
  app.post("/finish", finishPurchaseController);
}
