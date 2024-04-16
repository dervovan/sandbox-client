import { getRandom } from "../../utility/random";
import { SortingElement } from "./types";

export const generateRandomData = (): Array<SortingElement> => {
  return Array(100).fill(0).map((v, i) => ({value: getRandom(1, 100),index: i, isComparing: false}))
}