import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });

export const config = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL || "bolt://neo4j:7687",
};
