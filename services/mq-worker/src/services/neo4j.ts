import { config } from "../config";
import neo4j from "neo4j-driver";
const driver = neo4j.driver(config.dbUrl);

export const getSession = () => driver.session({ database: "tweets" });
