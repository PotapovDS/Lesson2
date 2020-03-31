const router = require('express').Router();
const controller = require('./game');
const logger = require('./lib/logger');
const users = require('./lib/users');
const games = require('./lib/games');

router.get('/getField', users.restricted, (req, res) => {
  res.send(200, controller.getField());
});

router.get('/getPlayer', users.restricted, (req, res) => {
  res.status(200).send(controller.getCurrentPlayer());
});

router.get('/getWinner', users.restricted, (req, res) => {
  let currentPlayer = controller.getCurrentPlayer();
  res.status(200).send(controller.isPlayerWin(player));
});

router.post('/move', users.restricted, (req, res) => {
  let x = req.body.x - 1;
  let y = req.body.y - 1;

  if (!controller.isNoMoves()) {
    if (controller.isCellEmpty(x, y)) {
      controller.makeMove(x, y);
    } else {
      logger.log('Клетка занята');
    }
  } else {
    controller.reset();
    logger.log('ходов больше нет');
  }

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
  games.startNewGame(user.login);
  res.send(200, 'ok');
});
// присоединится к игре
router.post('/joinGame', users.restricted, (req, res) => {
  res.send(200, 'ok');
});

// список игроков
router.get('/usersList', users.restricted, (req, res) => {
  res.send(200, users.users);
});
// список акивных игр
router.get('/gamesList', users.restricted, (req, res) => {
  res.send(200, games.games);
});
// сатус игры
router.get('/gameStatus', users.restricted, (req, res) => {
  res.send(200, 'ok');
});
router.get('/gameStatus', users.restricted, (req, res) => {
  res.send(200, 'ok');
});
// сброс игры
router.post('/reset', users.restricted, (req, res) => {
  controller.reset();
  res.status(200).send('ok');
});


router.post('/error', users.restricted, (req, res) => {
  controller.showError(req);
  res.status(200).send('ok');
});

module.exports = router;
