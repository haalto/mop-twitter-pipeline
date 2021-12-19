import { Query, Resolver } from "type-graphql";
import User from "../schemas/User";
import { getUsers } from "../services/userServices";

@Resolver(() => User)
export default class {
  @Query(() => [User])
  async getUsers() {
    const users = await getUsers();
    return users;
  }
}
