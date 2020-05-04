const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  gameId: {
    type: Number,
    // required: true,
  },
  // parentUser: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:'User',
  // },
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
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  winner: {
    type: String,
  },
  field: {
    type: Array,
    default: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model('Game', userSchema);

module.exports = Game;
