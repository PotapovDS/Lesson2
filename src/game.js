const logger = require('./lib/logger');

const START_FIELD = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let field = START_FIELD;
let player = 1;

function getField() {
  return field;
}
function getCurrentPlayer() {
  return player;
}
function isCellEmpty(x, y) {
  return (field[y][x] == 0);
}
function makeMove(x, y) {
  if (isCellEmpty(x, y)) {
    field[y][x] = player;
    player = player === 2 ? 1 : 2;
  }
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
function showError(error) {
  logger.log(error.body.error);
}
function isPlayerWin(testPlayer) {
  logger.log(testPlayer);
  for (let i = 0; i < 3; i += 1) {
    // горизонталь
    if (field[i][0] == testPlayer
      && field[i][1] == testPlayer
      && field[i][2] == testPlayer) {
      return true;
    }
  }

  for (let i = 0; i < 3; i += 1) {
    // вертикаль
    if (field[0][0] == testPlayer
      && field[1][i] == testPlayer
      && field[2][i] == testPlayer
    ) {
      return true;
    }
  }
  // диагональ сверху вниз
  if (field[0][0] == testPlayer
    && field[1][1] == testPlayer
    && field[2][2] == testPlayer) {
    return true;
  }
  // диагональ снизу вверх
  if (field[2][0] == testPlayer
    && field[1][1] == testPlayer
    && field[0][2] == testPlayer) {
    return true;
  }
  return false;
}

module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer,
  getCurrentPlayer,
  showError,
  isPlayerWin,
};
