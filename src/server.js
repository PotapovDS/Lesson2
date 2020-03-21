const express = require('express');
const cors = require('cors');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(routes);
app.use(cors());

module.exports = app;
