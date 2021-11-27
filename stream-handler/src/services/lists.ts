import axios from "axios";
import { config } from "../config";
import { stringify } from "querystring";
import { Member } from "../types";

export const getMembersOfList = async (
  listId: number,
  next_token: undefined
): Promise<Member[]> => {
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
  const data = response.data.data;
  if (response.data.meta.next_token) {
    return data.concat(
      await getMembersOfList(listId, response.data.meta.next_token)
    );
  } else {
    return data;
  }
};
