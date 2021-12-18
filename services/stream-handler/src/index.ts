import { config } from "./config";
import { generateAndPostRule, getAllRules } from "./services/rules";
import { streamConnect } from "./services/stream";

const setRulesIfNotSet = async () => {
  const { listOfMOP } = config;
  const response = await getAllRules();
  if (response.meta.result_count === 0) {
    await generateAndPostRule(
      listOfMOP,
      "Get Tweets from Finnish Members of Parlament"
    );
  }
};

(async () => {
  try {
    await setRulesIfNotSet();
    const response = await getAllRules();
    console.log(response);
    streamConnect(0);
  } catch (err) {
    console.log(err);
  }
})();
