const router = require('express').Router();
const controller = require('./game');

router.get('/getField', (req, res) => {
  res.status(200).send(controller.getField());
});

router.post('/move', (req, res) => {
  controller.makeMove(req.body.x - 1, req.body.y - 1);
  res.status(200).send('ok');
});

router.post('/reset', (req, res) => {
  controller.reset();
  res.status(200).send('ok');
})

module.exports = router;
