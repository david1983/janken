const config = require("./config")
const testConfig = require("./test")

describe("The config module", ()=>{
    it("should return the correct configuration for the environment", () => {
        expect(config).toHaveProperty("env")
        expect(config.env).toBe("test")
    })

    it("should expose the application configuration for the test environment", () => {
        expect(config).toHaveProperty("app")
        expect(config.app).toHaveProperty("port")
        expect(config.app.port).toBe(testConfig.app.port)
    })

    it("should expose the database configuration", () => {
        /**
         * the configuration module should expose the db config
         * even if the db config is not in the test.js config file.
         * this is because the config is inherited from the default
         * config file.
         **/
    })

})