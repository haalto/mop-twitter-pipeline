import { Arg, Query, Resolver } from "type-graphql";
import User from "../schemas/User";
import { getUser, getUsers } from "../services/userServices";

@Resolver(User)
export default class {
  @Query(() => [User])
  async users() {
    const users = await getUsers();
    return users;
  }

  @Query(() => User)
  async user(@Arg("id") id: string) {
    const users = await getUser(id);
    return users;
  }
}
