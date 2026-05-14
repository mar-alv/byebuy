import "dotenv/config";
import { authPlugin } from "@repo/auth";
import Fastify from "fastify";
import cartRoutes from "./routes";

const app = Fastify();

app.register(authPlugin);
app.register(cartRoutes, { prefix: "/cart" });

app.listen({ port: 3007 }).then(() => {
  console.log("🚀 Server running on http://localhost:3007");
});
