const mongoose = require('mongoose');
const User = require('./schemas/User');
const Game = require('./schemas/Game');

const url = 'mongodb://localhost:27017/TicTacToeDB';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('error', err);
});

db.once('open', () => {
  console.log('db connected');
});

exports.User = User;
exports.Game = Game;
