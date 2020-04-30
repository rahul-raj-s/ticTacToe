const getLine = (result) => {
  console.log("result", result);
  if (JSON.stringify(result) === JSON.stringify([1, 2, 3])) {
    return { x1: 1, y1: 1, x2: 5, y2: 1 };
  } else if (JSON.stringify(result) === JSON.stringify([4, 5, 6])) {
    return { x1: 1, y1: 3, x2: 5, y2: 3 };
  } else if (JSON.stringify(result) === JSON.stringify([7, 8, 9])) {
    return { x1: 1, y1: 5, x2: 5, y2: 5 };
  } else if (JSON.stringify(result) === JSON.stringify([1, 5, 9])) {
    return { x1: 1, y1: 1, x2: 5, y2: 5 };
  } else if (JSON.stringify(result) === JSON.stringify([3, 5, 7])) {
    return { x1: 5, y1: 1, x2: 1, y2: 5 };
  } else if (JSON.stringify(result) === JSON.stringify([1, 4, 7])) {
    return { x1: 1, y1: 1, x2: 1, y2: 5 };
  } else if (JSON.stringify(result) === JSON.stringify([2, 5, 8])) {
    return { x1: 3, y1: 1, x2: 3, y2: 5 };
  } else if (JSON.stringify(result) === JSON.stringify([3, 6, 9])) {
    return { x1: 5, y1: 1, x2: 5, y2: 5 };
  }
};
export { getLine };
