import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class User {
  @Field(() => String)
  id: String;

  @Field(() => String)
  name: String;

  @Field(() => String)
  username: String;
}
