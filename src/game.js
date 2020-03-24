const START_FIELD = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let field = START_FIELD;
let player = 1;

function getField() {
  return field;
}
function makeMove(x, y) {
  field[y][x] = player;
  player = player === 2 ? 1 : 2;
}
function reset() {
  field = START_FIELD;
}
function presetField(newField) {
  field = newField;
}
function setCurrentPlayer(i) {
  player = i;
}
function isCellEmpty(x, y) {
  return (field[y][x] === 0);
}

module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer,
  isCellEmpty,
};
