const mongoose = require("mongoose")

// getting the config
const config = require("../config/config")

// creating the connection
const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbname}`
mongoose
    .connect(connectionString, { useNewUrlParser: true })
    .catch(error => {
        if(config.env!="test") console.error(error)
    })


module.exports = mongoose