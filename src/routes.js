const router = require('express').Router();
const controller = require('./game');
const logger = require('./lib/logger');

router.get('/getField', (req, res) => {
  res.status(200).send(controller.getField());
});

router.get('/getPlayer', (req, res) => {
  res.status(200).send(controller.getCurrentPlayer());
});

router.get('/getWinner', (req, res) => {
  let currentPlayer = controller.getCurrentPlayer();
  res.status(200).send(controller.isPlayerWin(player));
});

router.post('/move', (req, res) => {
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

router.post('/reset', (req, res) => {
  controller.reset();
  res.status(200).send('ok');
});

router.post('/error', (req, res) => {
  controller.showError(req);
  res.status(200).send('ok');
});

module.exports = router;
