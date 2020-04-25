const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  // _id: new mongoose.Types.ObjectId(), //id для возможности ссылки на юзера из сообщения
  userName: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  isLogged: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
