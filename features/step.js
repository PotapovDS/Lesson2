const { Given, When, Then } = require('cucumber');
const request = require('supertest');
const assert = require('assert');
const app = require('../src/server');
const controller = require('../src/game.js');

let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

let lastResult = {};

function convertFieldToArray(stringField) {
  const newField = [];
  stringField.split('|').forEach((item, i) => {
    newField[i] = item.split('');
  });
  return newField;
}

Given('пустое поле', () => {
  controller.reset();
});

Given('ходит игрок {int}', (i) => {
  controller.setCurrentPlayer(i);
});

When('игрок ходит в клетку {int}, {int}', (x, y) => {
  if (controller.isCellEmpty(x, y)) {
    request(app)
      .post('/move')
      .send({ x, y })
      .then((res) => {
        lastResult = res;
      });
  }
});

Then('поле становится {string}', (testField) => {
  field = controller.getField();
  const actualField = field.map((item) => item.join('')).join('|');
  assert.equal(actualField, testField);
});

Given('поле {string}', (testField) => {
  controller.presetField(convertFieldToArray(testField));
});

Then('возвращается ошибка', () => {});
// Then('поле становится {string}', (testField) => {
//   const newField = convertFieldToArray(testField);
//   assert.equal(field, newField);
// })
