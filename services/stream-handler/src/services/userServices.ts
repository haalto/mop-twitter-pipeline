import { getSession } from "../neo4j";
import { User } from "../types";

export const createUsersBatch = (users: User[]) => {
  const session = getSession();
  session.writeTransaction(async (tx) => {
    try {
      await Promise.all(
        users.map(
          async (user) =>
            await tx.run("MERGE (u:User {id: $id}) SET u = $user", {
              user,
              id: user.id,
            })
        )
      );
      await tx.commit();
    } catch (err) {
      console.error(err);
      tx.rollback();
    }
  });
};
