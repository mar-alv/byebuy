import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import { PrismaClient } from "../generated/prisma/client";

const dbPath = path.resolve(__dirname, "../dev.db");


const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

export { prisma };
