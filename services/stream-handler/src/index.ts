import { config } from "./config";
import { getUsersOfList } from "./services/lists";
import { setRulesIfNotSet } from "./services/rules";
import { streamConnect } from "./services/stream";
import { createUsersBatch } from "./services/userServices";

(async () => {
  console.log("Start Stream handler");
  try {
    await setRulesIfNotSet();
    const { listOfMOP } = config;
    const users = await getUsersOfList(listOfMOP, undefined);
    createUsersBatch(users);
    streamConnect(0);
  } catch (err) {
    console.log(err);
  }
})();
