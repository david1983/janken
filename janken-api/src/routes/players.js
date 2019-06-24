const express = require('express');
const moment = require('moment');

const mongoose = require('../services/db');

const router = express.Router();
const { Date, String } = mongoose.Schema.Types;

function createPlayer(req, res, Player) {
  if (!req.body.name) return res.status(400).json({ error: 'name must be provided' });
  const p = req.body;
  p.createdAt = moment();
  const newPlayer = new Player(p);

  return newPlayer
    .save()
    .then(result => res.json({ result }))
    .catch((error) => {
      // in case of already existing player return 200 and a message
      if (error.code === 11000) return res.json({ message: 'the player already exists' });
      return res.status(500).json({ error });
    });
}

function getPlayer(req, res, Player) {
  if (!req.params.id) return res.status(400).json({ error: 'id of the player must be provided' });
  return Player.findById(req.params.id)
    .then(result => res.json({ result }))
    .catch(error => res.status(500).json({ error }));
  // TODO: returning 500 is a bit general, more checks are needed
}

/**
 * defining the mongoose model for storing the Players,
 * as there is no login required the name is set as unique
 * in order to avoid duplication
 */
const Player = mongoose.model('player', {
  name: { type: String, unique: true },
  createdAt: Date,
});

router.post('/', (req, res) => { createPlayer(req, res, Player); });
router.get('/:id', (req, res) => { getPlayer(req, res, Player); });


module.exports.createPlayer = createPlayer;
module.exports.getPlayer = getPlayer;
module.exports.router = router;
