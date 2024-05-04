import { getRandom } from "../../utility/random";
import { SortingElement } from "./types";

export const generateRandomData = (): Array<SortingElement> => {
  const result =  Array(200)
    .fill(0)
    .map((v, i) => ({
      value: getRandom(1, 100),
      index: i,
      isComparing: false,
    }));

  return result
};
