import { useQuery } from "@apollo/client";
import { GET_USERS } from "../schemas/users";

export const useUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  return { loading, error, data: data?.users ?? [] };
};
