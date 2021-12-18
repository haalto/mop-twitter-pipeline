import axios from "axios";
import { config } from "../config";
import { GetRulesResponse, PostRulesRequestPayload } from "../types";
import { getUsersOfList } from "./lists";
import { splitEvery } from "ramda";

const { rulesURL, bearerToken } = config;

export const getAllRules = async (): Promise<GetRulesResponse> => {
  const response = await axios.get<GetRulesResponse>(rulesURL, {
    headers: {
      authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data;
};

export const setRules = async (newRules: PostRulesRequestPayload) => {
  console.log(newRules);
  const response = await axios.post(rulesURL, newRules, {
    headers: {
      authorization: `Bearer ${bearerToken}`,
      "content-type": "application/json",
    },
  });

  if (response.status !== 201) {
    throw new Error(JSON.stringify(response.data));
  }

  return response.data;
};

export const deleteRules = async (currentRulesIds: string[]) => {
  const payload = {
    delete: {
      ids: currentRulesIds,
    },
  };
  const response = await axios.post(rulesURL, payload, {
    headers: {
      authorization: `Bearer ${bearerToken}`,
      "content-type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.data);
  }

  return response.data;
};

export const deleteCurrentRules = async () => {
  const response = await getAllRules();

  if (!response.data) {
    return;
  }

  const ids = response.data.map((rule) => rule.id);
  return await deleteRules(ids);
};

export const generateValueForRuleToFollowTweetsFromUser = (
  ids: string[],
  firstIter = true
): string => {
  if (ids.length === 1) {
    return `from:${ids[0]})`;
  }
  return `${firstIter ? "(" : ""}from:${
    ids[0]
  } OR ${generateValueForRuleToFollowTweetsFromUser(ids.slice(1), false)}`;
};

export const generateRules = (ids: string[], tag: string) => {
  const chunks = splitEvery(17, ids);
  return chunks.map((chunk, i) => {
    return {
      value: generateValueForRuleToFollowTweetsFromUser(chunk),
      tag: `${tag} ${i + 1}`,
    };
  });
};

export const generateRulePayload = (ids: string[], tag: string) => {
  return {
    add: generateRules(ids, tag),
  };
};

export const generateAndPostRule = async (listId: number, tag: string) => {
  const users = await getUsersOfList(listId, undefined);
  const ids = users.map((user) => user.id);
  const rulePayload = generateRulePayload(ids, tag);
  return setRules(rulePayload);
};

export const setRulesIfNotSet = async () => {
  const { listOfMOP } = config;
  const response = await getAllRules();
  if (response.meta.result_count === 0) {
    await generateAndPostRule(
      listOfMOP,
      "Get Tweets from Finnish Members of Parlament"
    );
  }
};
