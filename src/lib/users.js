const uuid = require('uuid');

const users = [
  {
    id: 1,
    login: 'max',
    password: 'qwerty',
    isLogged: false,
  },
  {
    id: 2,
    login: 'ivan',
    password: 'ytrewq',
    isLogged: false,
  },
];

const sessions = {};

function checkSession(sessionID) { // получаем id пользователя
  return sessions[sessionID];
}
function authMiddleware(req, res, next) {
  const userData = checkSession(req.headers.authorization);
  req.userCredentials = userData;
  next();
}

function restricted(req, res, next) {
  if (!req.userCredentials) {
    res.send(401);
    return;
  }
  next();
}

function checkLogin(login, password) {
  const user = users.find((el) => el.login === login && el.password === password);
  if (user) {
    const sessionID = uuid.v4();
    sessions[sessionID] = {
      id: user.id,
    };
    user.isLogged = true;
    user.userId = sessionID;
    return sessionID;
  }
  return -1;
}

function defineLoginById(userId) {
  return users.find((el) => el.id === userId);
}

function registerNewUser(login, password) {
  if (users.find((el) => el.login === login)) {
    return false;
  }
  const newUser = {
    id: users.length + 1,
    login,
    password,
    isLogged: false,
  };
  console.log(newUser);
  users.push(newUser);
  return true;
}


module.exports = {
  checkLogin,
  checkSession,
  authMiddleware,
  restricted,
  registerNewUser,
  defineLoginById,
  users,
};
