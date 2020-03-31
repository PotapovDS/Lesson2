const games = [];

// games = [
//     {
//       parentUser,
//       player2,
//       field: [],
//       currentPlayer,
//       status,
//     },
//   ];

function startNewGame(parentUser) {
  const newGame = {
    gameId: games.length + 1,
    parentUser,
    field: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    currentPlayer: parentUser,
  };
  games.push(newGame);
}

module.exports = {
  startNewGame,
  games,
};
