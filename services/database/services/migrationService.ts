import { writeFileSync, readdirSync, readFileSync } from "fs";
import { getSession } from "./neo4j";

const fileExtensions = ["cypher"];

const readLatestFilename = (path: string) => {
  const files = readdirSync(path);
  const cypherFiles = files.filter((file) =>
    fileExtensions.includes(file.split(".").at(-1) ?? "")
  );
  return cypherFiles.sort().reverse()[0];
};

export const createMigration = () => {
  const timestamp = Date.now();
  writeFileSync(`./migrations/${timestamp}.cypher`, "");
};

const runMigration = async (queries: string[]) => {
  const session = getSession();
  await session.writeTransaction(async (tx) => {
    try {
      await Promise.all(queries.map(async (q) => await tx.run(q)));
      await tx.commit();
    } catch (err) {
      console.error(err);
      await tx.rollback();
    }
  });

  session.close();
};

export const runLatestMigration = async () => {
  const path = "./migrations";
  const filename = readLatestFilename(path);
  const content = readFileSync(`${path}/${filename}`, "utf8");

  const queries = content.split(";").filter((entry) => entry.trim() != "");
  await runMigration(queries);
};
