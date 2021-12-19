import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class User {
  @Field(() => Int)
  id: string;

  @Field()
  email: string;
}
