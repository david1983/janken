const express = require("express")
const bodyParser = require("body-parser")

const package = require('./package.json');
const config = require("./config/config")

const playersRouter = require("./routes/players")
const gameRouter = require("./routes/game")

const app = express()

app.use(bodyParser.json())

/**
 * simple utility route that returns a JSON
 * with the name of the app
 * the version and the environment
 */
app.get("/", (req, res) => {
    res.json({
        name: package.name,
        version: package.version,
        env: config.env
    })
})

app.use("/players", playersRouter.router)
app.use("/game", gameRouter.router)


const server = app.listen(config.app.port, () => {
    console.log(`Api for env: ${config.env} running on port: ${config.app.port}`)
})

module.exports.app = app
module.exports.server = server