const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const appPackage = require('../package.json');
const playersRouter = require('./routes/players');
const gameRouter = require('./routes/game');

const app = express();

app.use(cors());
app.use(bodyParser.json());

/**
 * simple utility route that returns a JSON
 * with the name of the app
 * the version and the environment
 */
app.get('/', (req, res) => {
  res.json({
    name: appPackage.name,
    version: appPackage.version,
    env: appPackage.env
  });
});

app.use('/player', playersRouter.router);
app.use('/game', gameRouter.router);

module.exports = app;
