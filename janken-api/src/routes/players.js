const express = require("express")
const mongoose = require("../services/db")

const router = express.Router()
const { Date, String, Number } = mongoose.Schema.Types

/**
 * defining the mongoose model for storing the games
 */
const Player = mongoose.model("player", {
    name: String,
    wins: Number,
    losses: Number,
    draws: Number,
    createdAt: Date
})
// Basic CRUD for the players collection

function createPlayer(req, res, Player) {
    // TODO: add body validation here
    const newPlayer = new Player(req.body.player)

    return newPlayer
        .save()
        .then(result => res.json({ result }))
        .catch(error => res.status(500).json({ error })) // TODO: this is a bit general, add more error handling
}

function getPlayer(req, res, Player) {
    // TODO: write the code to get the player here
    return Player.findById(req.params.id)
        .then(result => res.json({ result }))
        .catch(error => res.status(500).json({ error }))
}

router.post("/", (req, res) => { createPlayer(req, res, Player) })
router.get("/:id", (req, res) => { createPlayer(req, res, Player) })


module.exports.createPlayer = createPlayer
module.exports.getPlayer = getPlayer
module.exports.router = router