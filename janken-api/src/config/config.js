const defaultConfig = require("./default")
const devConfig = require("./dev.js")

// storing the env configs in an object
const configs = {
    default: defaultConfig,
    dev: devConfig
}

/**
 * get the environment from env var and load the 
 * environment configuration 
 **/

const NODE_ENV = process.env.NODE_ENV || "default"
const selectedConf = configs[NODE_ENV]

/**
 * merge the default config witht the env configuration.
 * NB if the config starts to get deep use lodash _.merge() function
 **/
module.exports = Object.assign(defaultConfig, selectedConf) 