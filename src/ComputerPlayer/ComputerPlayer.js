const corners = [1, 3, 7, 9];
const possibleSolution = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

function _randomMove(status) {
  let suggest;
  do {
    suggest = Math.floor(Math.random() * 10); // Just for saftey it won't needed
  } while (status[suggest] !== "");
  return suggest;
}
// Detects next place to move for win
function _detector(arr, status) {
  for (let i = 0; i < possibleSolution.length; i++) {
    if (
      possibleSolution[i].includes(arr[0]) &&
      possibleSolution[i].includes(arr[1])
    ) {
      for (let j = 0; j < 3; j++) {
        if (status[possibleSolution[i][j]] === "") {
          return possibleSolution[i][j];
        }
      }
    }
  }
  return false;
}

// Generates all possible ways of winning opponent
function _nextPlayerWinDetector(status, playerMoves) {
  for (let i = 0; i < playerMoves.length - 1; i++) {
    for (let j = i + 1; j < playerMoves.length; j++) {
      const tempSuggestion = _detector(
        [playerMoves[i], playerMoves[j]],
        status
      );
      if (tempSuggestion) {
        return tempSuggestion;
      }
    }
  }
  return false;
}

function computerPlayer(status, steps, level) {
  let nextMove;

  if (steps === 1 && level === "high") {
    if (status[5] === "") {
      nextMove = 5;
    } else {
      const cornerIndex = Math.floor((Math.random() * 10) / 3);
      nextMove = corners[cornerIndex];
    }
  } else if (steps === 3 && level === "high") {
    let suggest = _nextPlayerWinDetector(status, status.opponentsMove);
    if (suggest) {
      nextMove = suggest;
    } else {
      nextMove = _randomMove(status);
    }
  } else {
    let suggest = _nextPlayerWinDetector(status, status.computersMove); // check computer's winning chances
    if (!suggest) {
      suggest = _nextPlayerWinDetector(status, status.opponentsMove);
    }
    if (!suggest) {
      suggest = _randomMove(status);
    }
    nextMove = suggest;
  }
  status.computersMove.push(nextMove);
  return nextMove;
}

export default computerPlayer;
