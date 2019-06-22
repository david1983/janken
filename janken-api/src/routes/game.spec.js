const game = require('./game');
const db = require('../services/db');

describe('The game route module', () => {
  afterAll(async () => {
    await db.connection.close();
  });

  it('should export the router', () => {
    expect(game).toHaveProperty('router');
  });

  it('should export the createGame function', () => {
    expect(game).toHaveProperty('createGame');
    expect(game.createGame).toBeInstanceOf(Function);
  });

  it('should export the getGame function', () => {
    expect(game).toHaveProperty('getGame');
    expect(game.getGame).toBeInstanceOf(Function);
  });
});
