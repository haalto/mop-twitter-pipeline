import { useQuery } from "@apollo/client";
import { GET_TWEETS_WITH_USERS } from "../schemas/tweets";

export const useTweets = () => {
  const { loading, error, data } = useQuery(GET_TWEETS_WITH_USERS);
  return { loading, error, data: data?.tweetsWithUsers ?? [] };
};
