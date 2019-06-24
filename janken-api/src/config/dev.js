const config = {
  env: 'dev',
  app: {
    port: 3005,
  },
  db: {
    host: 'mongodb',
    port: 27017,
    dbname: 'janken-dev',
  },
};

module.exports = config;
