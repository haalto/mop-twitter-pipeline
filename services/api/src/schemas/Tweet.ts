import { Field, ObjectType } from "type-graphql";
import User from "./User";

@ObjectType()
export default class Tweet {
  @Field(() => String)
  id: String;

  @Field(() => String)
  author_id: String;

  @Field(() => String)
  text: String;

  @Field(() => String)
  created_at: Date;

  @Field((type) => User)
  user: User;
}
