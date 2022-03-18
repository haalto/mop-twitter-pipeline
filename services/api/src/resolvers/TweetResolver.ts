import { Query, Resolver } from "type-graphql";
import Tweet from "../schemas/Tweet";
import { getTweets, getTweetsWithUsers } from "../services/tweetServices";

@Resolver(Tweet)
export default class {
  @Query(() => [Tweet])
  async tweetsWithUsers() {
    const tweetsWithUsers = await getTweetsWithUsers();
    return tweetsWithUsers;
  }

  @Query(() => [Tweet])
  async tweets() {
    const tweets = await getTweets();
    return tweets;
  }
}
