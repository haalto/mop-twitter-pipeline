import { getSession } from "./neo4j";

export const createQuery = async (query: string, parameters = {}) => {
  const session = getSession();
  try {
    const result = await session.run(query, parameters);
    session.close();
    return result.records;
  } catch (err) {
    session.close();
    console.log("");
    throw err;
  }
};
