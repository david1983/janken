import GameClass from './Game';

const Game = new GameClass();

describe('the game store', () => {
  it('should publish the setPlayerName method', () => {
    expect(Game).toHaveProperty('setPlayerName');
    expect(Game.doMove).toBeInstanceOf(Function);
  });

  it('should expose the doMove method', () => {
    expect(Game).toHaveProperty('doMove');
    expect(Game.doMove).toBeInstanceOf(Function);
  });

  it('should change the player1 name when calling setPlayerName', () => {
    Game.setPlayerName(1, 'test');
    expect(Game.player1.name).toBe('test');
  });

  it('should add a move to player one when calling doMove ', () => {
    Game.doMove(1, 'rock');
    expect(Game.player1.move).toBe('rock');
  });

  it('should change the player1 name when calling setPlayerName', () => {
    Game.setPlayerName(2, 'test');
    expect(Game.player2.name).toBe('test');
  });

  it('should add a move to player one when calling doMove ', () => {
    Game.doMove(2, 'rock');
    expect(Game.player2.move).toBe('rock');
  });

  it('should convert the array of moves into a map', () => {
    const moves = Game.movesMap;
    expect(moves).toMatchObject({
      paper: { kills: ['rock'] },
      rock: { kills: ['scissors'] },
      scissors: { kills: ['paper'] },
    });
  });
});
