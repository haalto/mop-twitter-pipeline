import { getSession } from "../neo4j";
import { StreamObject } from "../types";

export const createTweet = async (streamObject: StreamObject) => {
  const session = getSession();
  const tweet = streamObject.data;

  try {
    await session.run("CREATE (t:Tweet) SET t = {t}", { tweet });
  } catch (err) {
    console.log(err);
  } finally {
    session.close();
  }
};
