import {
  generateRulePayload,
  generateValueForRuleToFollowTweetsFromUser,
} from "../src/services/rules";
import { generateRandomStrings } from "./helpers";

describe("generate rules", () => {
  it("generates value for a Twitter Stream rule from a list of user ids", () => {
    const ids = ["foo", "bar", "baz"];
    const value = generateValueForRuleToFollowTweetsFromUser(ids);

    expect(value).toBe("(from:foo OR from:bar OR from:baz)");
  });

  it("returns object which matches desired rule", () => {
    const ids = ["foo", "bar", "baz"];
    const tag = "Get Tweets from Finnish Members of Parlament";
    const rule = generateRulePayload(ids, tag);
    expect(rule).toEqual({
      add: [
        {
          value: "(from:foo OR from:bar OR from:baz)",
          tag: `${tag} 1`,
        },
      ],
    });
  });

  it("rule length is max 512 chars", () => {
    const rule = generateRulePayload(generateRandomStrings(20), "foo");
    expect(rule.add[0].value.length).toBeLessThan(512);
  });

  it("has 10 rules", () => {
    const rule = generateRulePayload(generateRandomStrings(200), "foo");
    expect(rule.add.length).toBe(11);
  });
});
