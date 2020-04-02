const router = require('express').Router();
const controller = require('./game');
const users = require('./lib/users');
const games = require('./lib/games');

router.get('/getField', users.restricted, (req, res) => {
  const field = controller.getField(req.headers.gameId);
  res.send(200, field);
});

router.get('/getWinner', users.restricted, (req, res) => {
  const winner = controller.getWinner(req.headers.gameId);
  if (!winner) {
    res.send(208, 'победитель не выявлен');
  }
  res.send(200, `победил игрок ${winner}`);
});

router.post('/move', users.restricted, (req, res) => {
  const { gameId } = req.headers;
  const user = users.defineLoginById(req.userCredentials.id);

  if (!controller.isGameActive(gameId)) {
    res.send(208, 'эта игра закончена, выберите другую');
  }
  if (!controller.isPlayerInGame(gameId, user)) {
    res.send(208, 'вы не зарегистрированы, как игрок этой партии');
  }
  if (controller.getCurrentPlayer(gameId) !== user) {
    res.send(208, 'сейчас не Ваш ход');
  }
  const x = req.body.x - 1;
  const y = req.body.y - 1;
  controller.makeMove(x, y, gameId);
  res.status(200).send('ok');
});

// авторизация
router.post('/login', (req, res) => {
  const userId = users.checkLogin(req.body.login, req.body.password);
  res.send(200, userId);
});
// регистрация
router.post('/register', (req, res) => {
  if (!users.registerNewUser(req.body.login, req.body.password)) {
    res.send(208, 'пользователь уже зарегистрирован');
  }
  res.send(200, 'ok');
});
// создание игры
router.post('/newGame', users.restricted, (req, res) => {
  const user = users.defineLoginById(req.userCredentials.id);
  controller.startNewGame(user.login);
  res.send(200, 'ok');
});
// список акивных игр
router.get('/gamesList', users.restricted, (req, res) => {
  res.send(200, games.games);
});
// присоединится к игре
router.post('/joinGame', users.restricted, (req, res) => {
  const user = users.defineLoginById(req.userCredentials.id);
  if (!controller.joinGame(req.body.gameId, user)) {
    res.send(208, 'невозможно подключиться к этой игре');
  }
  res.send(200, 'ok');
});

// список игроков
router.get('/usersList', users.restricted, (req, res) => {
  res.send(200, users.users);
});
// сатус игры
router.get('/gameStatus', users.restricted, (req, res) => {
  const gameStatus = controller.getGameStatus(req.headers.gameId);
  res.send(200, gameStatus);
});
// какой игрок сейчас ходит
router.get('/getCurrentPlayer', users.restricted, (req, res) => {
  const currentPlayer = controller.getCurrentPlayer(req.headers.gameId);
  res.send(200, currentPlayer);
});
// сброс игры
router.post('/reset', users.restricted, (req, res) => {
  controller.reset(req.headers.gameId);
  res.send(200, 'ok');
});

router.post('/error', users.restricted, (req, res) => {
  controller.showError(req);
  res.status(200).send('ok');
});

module.exports = router;
