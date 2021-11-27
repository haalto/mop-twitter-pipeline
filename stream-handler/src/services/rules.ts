import axios from "axios";
import { config } from "../config";
import { GetRulesResponse, PostRulesRequestPayload } from "../types";

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
  const response = await axios.post(rulesURL, newRules, {
    headers: {
      authorization: `Bearer ${bearerToken}`,
      "content-type": "application/json",
    },
  });

  if (response.status !== 201) {
    throw new Error(response.data);
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

export const generateFollowUsersRule = () => {};
