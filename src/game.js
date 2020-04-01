const logger = require('./lib/logger');
const { games } = require('./lib/games');

const START_FIELD = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function findGame(gameId) {
  return games.find((el) => el.id === gameId);
}

// function getField() {
//   return field;
// }

function isCellEmpty(x, y) {
  return (field[y][x] == 0);
}

function makeMove(x, y) {
  if (isCellEmpty(x, y)) {
    field[y][x] = player;
    player = player === 2 ? 1 : 2;
  }
}

function reset(gameId) {
  const game = findGame(gameId);
  game.field = START_FIELD;
}

function getWinner(gameId) {
  const game = findGame(gameId);
  return game.winner;
}

function presetField(newField) {
  const game = findGame(gameId);
  game.field = newField;
}

function setCurrentPlayer(gameId, user) {
  
}

function getCurrentPlayer(gameId) {
  const game = findGame(gameId);
  return game.currentPlayer;
}

function showError(error) {
  logger.log(error.body.error);
}

function isPlayerWin(testPlayer) {
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

function isNoMoves() {
  for (let y = 0; y < 3; y += 1) {
    for (let x = 0; x < 3; x += 1) {
      if (field[y][x] === 0) return false;
    }
  }
  return true;
}

function startNewGame(parentUser) {
  const newGame = {
    gameId: games.length + 1,
    parentUser,
    field: START_FIELD,
    currentPlayer: parentUser,
    status: true,
  };
  games.push(newGame);
}

function joinGame(gameId, user) {
  const game = findGame(gameId);
  if (game.player2) return false;
  game.player2 = user;
  return true;
}

function getGameStatus(gameId) {
  const game = findGame(gameId);
  return game.status;
}

function isPlayerInGame(gameId, user) {
  const game = findGame(gameId);
  if (game.parentUser === user || game.player2 === user) {
    return true;
  }
  return false;
}

module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  getCurrentPlayer,
  setCurrentPlayer,
  showError,
  isPlayerWin,
  isNoMoves,
  isCellEmpty,
  getWinner,
  startNewGame,
  joinGame,
  getGameStatus,
  isPlayerInGame,
};
