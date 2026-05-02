import "dotenv/config";
import { authPlugin } from "@repo/auth";
import Fastify from "fastify";
import productRoutes from "./adapters/inbound/http/routes/product.routes";

const app = Fastify();

app.register(authPlugin);
app.register(productRoutes, { prefix: "/seller/products" });

app.listen({ port: 3006 }).then(() => {
  console.log("🚀 Server running on http://localhost:3006");
});
