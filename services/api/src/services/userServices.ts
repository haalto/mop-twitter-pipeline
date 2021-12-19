import { createQuery } from "../helpers";

export const getUsers = async () => {
  const result = await createQuery("MATCH (u:User) RETURN u");
  return result.map((record) => record.get("u").properties);
};
