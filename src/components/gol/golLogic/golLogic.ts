import { CellState, Board } from "../types";

export function applyGOLRules(dataField: Board) {
  let processed = [];
  for (let i = 0; i < dataField.length; i++) {
    processed.push(
      applyGOLRulesToLine(dataField[i - 1], dataField[i], dataField[i + 1])
    );
  }

  return processed;
}

function applyGOLRulesToLine(
  topArr: Array<CellState>,
  middleArr: Array<CellState>,
  bottomArr: Array<CellState>
) {
  if (!middleArr || !middleArr.length || middleArr.length < 3) {
    throw Error("No data to process. middleArr = " + JSON.stringify(middleArr));
  }

  let resultArr = middleArr.slice();
  topArr = topArr || Array(middleArr.length).fill(0);
  bottomArr = bottomArr || Array(middleArr.length).fill(0);
  if (
    middleArr.length !== topArr.length ||
    middleArr.length !== bottomArr.length
  ) {
    throw Error(
      "Can't process different arrays. topArr.length = " +
        topArr.length +
        " middleArr.length = " +
        middleArr.length +
        " bottomArr.length = " +
        bottomArr.length
    );
  }

  handleLineStart(topArr, middleArr, bottomArr, resultArr);
  handleLine(topArr, middleArr, bottomArr, resultArr);
  handleLineEnd(topArr, middleArr, bottomArr, resultArr);
  return resultArr;
}

function lifeLogic(
  array: Array<CellState>,
  cellIndex: number,
  aliveNeigbours: number
) {
  if (array[cellIndex]) {
    if (aliveNeigbours < 2 || aliveNeigbours > 3) {
      array[cellIndex] = 0;
    }
  } else {
    if (aliveNeigbours === 3) {
      array[cellIndex] = 1;
    }
  }
}

function handleLineStart(
  topArr: Array<CellState>,
  middleArr: Array<CellState>,
  bottomArr: Array<CellState>,
  resultArr: Array<CellState>
) {
  let alive =
    topArr[0] + topArr[1] + middleArr[1] + bottomArr[0] + bottomArr[1];
  lifeLogic(resultArr, 0, alive);
}

function handleLine(
  topArr: Array<CellState>,
  middleArr: Array<CellState>,
  bottomArr: Array<CellState>,
  resultArr: Array<CellState>
) {
  for (let i = 1; i < middleArr.length - 1; i++) {
    let alive = topArr[i - 1] + topArr[i] + topArr[i + 1];
    alive += middleArr[i - 1] + middleArr[i + 1];
    alive += bottomArr[i - 1] + bottomArr[i] + bottomArr[i + 1];
    lifeLogic(resultArr, i, alive);
  }
}

function handleLineEnd(
  topArr: Array<CellState>,
  middleArr: Array<CellState>,
  bottomArr: Array<CellState>,
  resultArr: Array<CellState>
) {
  let alive =
    topArr[topArr.length - 2] +
    topArr[topArr.length - 1] +
    middleArr[middleArr.length - 2] +
    bottomArr[bottomArr.length - 2] +
    bottomArr[bottomArr.length - 1];
  lifeLogic(resultArr, middleArr.length - 1, alive);
}
