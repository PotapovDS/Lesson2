const START_FIELD = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let field = START_FIELD;
let player = 1;

function getField() {
  return field;
}
function makeMove(x, y) {
  field[y][x] = 1;
}
function reset() {
  field = START_FIELD;
}
function presetField(newField) {
  field = newField
}
function setCurrentPlayer(i) {
  player = i;
}

module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer
}
