import {
  deleteCurrentRules,
  deleteRules,
  getAllRules,
  setRules,
} from "./services/rules";
import { streamConnect } from "./services/stream";

(async () => {
  try {
    //await setRules(rules);
    //await deleteCurrentRules();
    const response = await getAllRules();
    streamConnect(0);
  } catch (err) {
    console.log(err);
  }
})();
