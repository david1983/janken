
const express = require('express');
const mongoose = require('../services/db');

const { Array, Date, ObjectId } = mongoose.Schema.Types;

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
  const newGame = new Game(req.body.game);
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

function getAllGames(req, res, Game) {
  Game
    .find({})
    .then(result => res.json({ result }))
    .catch(error => res.status(500).json({ error }));
  // TODO: this is a bit general add more checks for other errors
}


/**
 * defining the mongoose model for storing the games
 */
const Game = mongoose.model('game', {
  moves: Array,
  player1: ObjectId,
  player2: ObjectId,
  createdAt: Date,
});

// assigning the functions to the routes
router.post('/', (req, res) => createGame(req, res, Game));
router.get('/all', (req, res) => getAllGames(req, res, Game));
router.get('/:id', (req, res) => getGame(req, res, Game));

// exporting the functions in order to use them in unit tests
module.exports.createGame = createGame;
module.exports.getGame = getGame;

module.exports.router = router;
