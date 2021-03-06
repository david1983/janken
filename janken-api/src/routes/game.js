
const express = require('express');
const mongoose = require('../services/db');

const { Array, Date } = mongoose.Schema.Types;

const router = express.Router();


/**
 * Create a new game using the JSON included in the
 * POST body. This fn is triggered by the POST /game
 *
 * @param {Request} req the express request object
 * @param {Response} res the express respose object
 * @param {MongooseModel} Game the mongoose model for the game collection
 */
function createGame(req, res, Game) {
  // TODO: add request body validation
  console.log(req.body);
  const newGame = new Game(req.body);
  newGame
    .save()
    .then(result => res.json({ result }))
    .catch(error => res.status(500).json({ error }));
  // TODO: this is a bit general add more checks for other errors
}

/**
 * Find a game using the specified ObjectID.
 * This fn is triggered by the GET /game/:id
 * @param {Request} req the express request object
 * @param {Response} res the express response object
 * @param {MongooseModel} Game the mongoose model for the game collection
 */
function getGame(req, res, Game) {
  Game
    .findById(req.params.id)
    .then(result => res.json({ result }))
    .catch(error => res.status(500).json({ error }));
  // TODO: this is a bit general add more checks for other errors
}

/**
 * Get all the games
 * @param {Request} req the express request object
 * @param {Response} res the express response object
 * @param {MongooseModel} Game the mongoose model for the game collection
 */
function getAllGames(req, res, Game) {
  Game
    .find({})
    .then(result => res.json({ result }))
    .catch(error => res.status(500).json({ error }));
  // TODO: this is a bit general add more checks for other errors
}

function getLeaderBoard(req, res, Game) {
  Game
    .find({})
    .then((result) => {
      const leaderboard = result.reduce((a, i) => {
        console.log(i.winner);
        if (i.winner === '' || !i.winner) return a;
        if (!a[i.winner]) { a[i.winner] = 1; } else { a[i.winner] += 1; }
        return a;
      }, {});
      const leaderboardArray = Object.keys(leaderboard)
        .map(name => [name, leaderboard[name]]).sort((a, b) => (b[1] - a[1]));
      res.json(leaderboardArray);
    })
    .catch(error => res.status(500).json({ error }));
}


/**
 * defining the mongoose model for storing the games
 */
const Game = mongoose.model('game', {
  moves: Array,
  rounds: Array,
  winner: String,
  createdAt: Date,
});

// assigning the functions to the routes
router.post('/', (req, res) => createGame(req, res, Game));
router.get('/all', (req, res) => getAllGames(req, res, Game));
router.get('/leaderboard', (req, res) => getLeaderBoard(req, res, Game));
router.get('/:id', (req, res) => getGame(req, res, Game));

// exporting the functions in order to use them in unit tests
module.exports.createGame = createGame;
module.exports.getGame = getGame;

module.exports.router = router;
