const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  parentUser: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
  },
  currentPlayer: {
    type: String,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  winner: {
    type: Boolean,
  },
});

const Game = mongoose.model('Game', userSchema);

module.exports = Game;
