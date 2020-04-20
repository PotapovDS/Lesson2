const logger = require('./lib/logger');
const { games } = require('./lib/games');

const START_FIELD = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function findGame(gameId) {
  return games.find((el) => el.id === gameId);
}

function getField(gameId) {
  const game = findGame(gameId);
  return game.field;
}

function isCellEmpty(x, y, field) {
  return (field[y][x] == 0);
}

function isNoMoves(field) {
  for (let y = 0; y < 3; y += 1) {
    for (let x = 0; x < 3; x += 1) {
      if (field[y][x] === 0) return false;
    }
  }
  return true;
}

function isPlayerWin(field, player) {
  for (let i = 0; i < 3; i += 1) {
    // горизонталь
    if (field[i][0] == player
      && field[i][1] == player
      && field[i][2] == player) {
      return true;
    }
  }
  for (let i = 0; i < 3; i += 1) {
    // вертикаль
    if (field[0][0] == player
      && field[1][i] == player
      && field[2][i] == player
    ) {
      return true;
    }
  }
  // диагональ сверху вниз
  if (field[0][0] == player
    && field[1][1] == player
    && field[2][2] == player) {
    return true;
  }
  // диагональ снизу вверх
  if (field[2][0] == player
    && field[1][1] == player
    && field[0][2] == player) {
    return true;
  }
  return false;
}

function makeMove(x, y, gameId) {
  const game = findGame(gameId);

  while (true) {
    if (isCellEmpty(x, y, game.field)) {
      const player1 = game.parentUser;
      const player2 = game.player2;
      const player = game.currentPlayer === player1 ? 1 : 2;
      game.field[y][x] = player;
      if (isPlayerWin(game.field, player)) {
        game.status = false;
        game.winner = player === 1 ? player1 : player2;
      }
      game.currentPlayer = player === 1 ? player2 : player1;
      if (isNoMoves(game.field)) {
        game.status = false;
      }
      break;
    }
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

function getCurrentPlayer(gameId) {
  const game = findGame(gameId);
  return game.currentPlayer;
}

function showError(error) {
  logger.log(error.body.error);
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
  return newGame.gameId;
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
  showError,
  getWinner,
  startNewGame,
  joinGame,
  getGameStatus,
  isPlayerInGame,
};
