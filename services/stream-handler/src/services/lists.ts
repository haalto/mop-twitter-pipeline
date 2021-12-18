import axios from "axios";
import { config } from "../config";
import { stringify } from "querystring";
import { User } from "../types";

export const getUsersOfList = async (
  listId: number,
  next_token: undefined
): Promise<User[]> => {
  const { listsURL, bearerToken } = config;
  const url = `${listsURL}/${listId}/members${
    next_token ? `?${stringify({ pagination_token: next_token })}` : ""
  }`;
  const response = await axios.get(url, {
    headers: {
      "User-Agent": "parlament-stream",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  const data = response.data.data as User[];
  if (response.data.meta.next_token) {
    return data.concat(
      await getUsersOfList(listId, response.data.meta.next_token)
    );
  } else {
    return data;
  }
};
