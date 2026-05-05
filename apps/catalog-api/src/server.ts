import "dotenv/config";
import { authPlugin } from "@repo/auth";
import Fastify from "fastify";
import catalogRoutes from "./adapters/inbound/http/routes/catalog.routes";

const app = Fastify();

app.register(authPlugin);
app.register(catalogRoutes, { prefix: "/catalog" });

app.listen({ port: 3004 }).then(() => {
  console.log("🚀 Server running on http://localhost:3004");
});
