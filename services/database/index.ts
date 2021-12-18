import { Args } from "./types";
import {
  createMigration,
  runLatestMigration,
} from "./services/migrationService";

(async () => {
  const args = process.argv;

  switch (args[2]) {
    case Args.LATEST:
      await runLatestMigration();
      break;
    case Args.CREATE:
      createMigration();
      break;
    default:
      console.log("NO VALID ARGUMENTS");
      break;
  }
  process.exit(0);
})();
