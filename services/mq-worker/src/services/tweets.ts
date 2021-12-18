import { StreamObject } from "../types";
import { getSession } from "./neo4j";

export const createTweet = async (steamObject: StreamObject): Promise<void> => {
  const session = getSession();
  try {
    session.run(`CREATE`);
  } catch (err) {
    console.log(err);
  } finally {
    session.close();
  }

  console.log(steamObject);
  return new Promise(() => null);
};
