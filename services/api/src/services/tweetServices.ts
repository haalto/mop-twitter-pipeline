import { createQuery } from "../helpers";

export const getTweetsWithUsers = async () => {
  const result = await createQuery(
    "MATCH (u:User)-[r:TWEETED]->(t:Tweet) RETURN u,r,t"
  );
  return result.map((record) => ({
    ...record.get("t").properties,
    user: record.get("u").properties,
  }));
};

export const getTweets = async () => {
  const result = await createQuery("MATCH (t:Tweet) RETURN t");
  return result.map((record) => record.get("t").properties);
};
