import { getSession } from "../neo4j";
import { StreamObject } from "../types";

export const createTweet = async (streamObject: StreamObject) => {
  const session = getSession();
  const { id, created_at, text, author_id } = streamObject.data;
  const tweet = {
    id,
    created_at,
    text,
    author_id,
  };
  try {
    await session.run(
      "MATCH (u:User) WHERE u.id = $author_id CREATE (u)-[:TWEETED]->(t:Tweet) SET t = $tweet",
      { tweet, author_id }
    );
  } catch (err) {
    console.log(err);
  } finally {
    session.close();
  }
};
