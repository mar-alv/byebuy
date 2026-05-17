import "dotenv/config";
import { authPlugin } from "@repo/auth";
import Fastify from "fastify";
import checkoutRoutes from "./routes";

const app = Fastify();

app.register(authPlugin);
app.register(checkoutRoutes, { prefix: "/checkout" });

app.listen({ port: 3005 }).then(() => {
  console.log("🚀 Server running on http://localhost:3005");
});
