const boxes = [];
let intialStatus = {};
for (let i = 1; i < 10; i++) {
  boxes.push(i);
  intialStatus = { ...intialStatus, [i]: "" };
}
intialStatus = { ...intialStatus, term: "O", steps: 0 };

export { boxes, intialStatus };
