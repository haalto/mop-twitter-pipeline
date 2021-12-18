import { times } from "ramda";
export const generateRandomStrings = (amount: number) => {
  return times(() => (Math.random() * 21).toString().replace(".", ""), amount);
};
