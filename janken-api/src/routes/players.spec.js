const players = require('./players');
const db = require('../services/db');

describe('The player route module', () => {
  afterAll(async () => {
    await db.connection.close();
  });

  it('should export the router', () => {
    expect(players).toHaveProperty('router');
  });

  it('should export the createPlayer function', () => {
    expect(players).toHaveProperty('createPlayer');
    expect(players.createPlayer).toBeInstanceOf(Function);
  });

  it('should export the getPlayer function', () => {
    expect(players).toHaveProperty('getPlayer');
    expect(players.getPlayer).toBeInstanceOf(Function);
  });

  describe('the createPlayer function', () => {
    // mocking the express req and res
    const MockRes = { status: { json: jest.fn() }, json: jest.fn() };
    const MockReq = { body: {} };
    it('should instantiate a new player object', async () => {
      // mocking the newplayer instance
      const MockNewPlayer = { save: jest.fn().mockImplementation(() => Promise.resolve({})) };

      // mocking the player model
      const MockPlayer = jest.fn().mockImplementation(() => MockNewPlayer);

      const { createPlayer } = players;

      await createPlayer(MockReq, MockRes, MockPlayer);

      expect(MockPlayer).toHaveBeenCalled();
    });

    it('should instantiate a new player object', async () => {
      // mocking the newplayer instance
      const MockNewPlayer = { save: jest.fn().mockImplementation(() => Promise.resolve({})) };

      // mocking the player model
      const MockPlayer = jest.fn().mockImplementation(() => MockNewPlayer);

      const { createPlayer } = players;

      await createPlayer(MockReq, MockRes, MockPlayer);

      expect(MockPlayer).toHaveBeenCalled();
      expect(MockNewPlayer.save).toHaveBeenCalled();
      expect(MockRes.json).toHaveBeenCalled();
    });
  });
});
