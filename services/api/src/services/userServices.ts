import { createQuery } from "../helpers";

export const getUsers = async () => {
  const result = await createQuery("MATCH (u:User) RETURN u");
  return result.map((record) => record.get("u").properties);
};

export const getUser = async (id: string) => {
  const result = await createQuery("MATCH (u:User) WHERE u.id = $id RETURN u", {
    id,
  });
  return result.map((record) => record.get("u").properties)[0];
};
