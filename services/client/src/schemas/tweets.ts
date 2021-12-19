import { gql } from "@apollo/client";

export const GET_TWEETS_WITH_USERS = gql`
  query Query {
    tweetsWithUsers {
      id
      author_id
      text
      created_at
      user {
        id
        name
        username
      }
    }
  }
`;
