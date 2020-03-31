const express = require('express');
const cors = require('cors');
const users = require('./lib/users');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(users.authMiddleware);
app.use(routes);

module.exports = app;
