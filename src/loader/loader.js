const boxes = [];
let intialStatus = {};
for (let i = 1; i < 10; i++) {
  boxes.push(i);
  intialStatus = { ...intialStatus, [i]: "" };
}
intialStatus = { ...intialStatus, term: "O" };

export { boxes, intialStatus };
