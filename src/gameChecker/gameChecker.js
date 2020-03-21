const possibleSolution = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
];
const gameChecker = status => {
  for (let i = 0; i < 8; i++) {
    let currentArray = possibleSolution[i];
    if (
      status[currentArray[0]] !== "" &&
      status[currentArray[0]] === status[currentArray[1]] &&
      status[currentArray[0]] === status[currentArray[2]]
    ) {
      return currentArray;
    }
  }
  return false;
};

export default gameChecker;
