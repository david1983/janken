const app = require('./app');
const config = require('./config/config');

const server = app.listen(config.app.port, () => {
  console.log(`Api for env: ${config.env} running on port: ${config.app.port}`);
});

module.exports = server;
