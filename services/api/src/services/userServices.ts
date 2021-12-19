import { createQuery } from "../helpers";

export const getUsers = async () => {
  const result = createQuery("MATCH (u:User) RETURN u");
  return result;
};
