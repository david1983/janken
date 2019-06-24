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
    expect(Game.players[0].name).toBe('test');
  });

  it('should add a move to player one when calling doMove ', () => {
    Game.doMove(1, 'rock');
    expect(Game.players[0].move).toBe('rock');
  });

  it('should change the player1 name when calling setPlayerName', () => {
    Game.setPlayerName(2, 'test');
    expect(Game.players[1].name).toBe('test');
  });

  it('should add a move to player one when calling doMove ', () => {
    Game.doMove(2, 'rock');
    expect(Game.players[1].move).toBe('rock');
  });

  it('should convert the array of moves into a map', () => {
    Game.selectSavedGameMoves('janken');
    const moves = Game.movesMap;
    expect(moves).toHaveProperty('scissors');
    expect(moves).toHaveProperty('rock');
    expect(moves).toHaveProperty('paper');

    expect(moves.paper).toHaveProperty('kills');
    expect(moves.paper.kills).toBeInstanceOf(Array);
    expect(moves.paper.kills).toHaveLength(1);
  });


  it('should return the winner of a round using the rockpaperscissorslizardspock set of moves', () => {
    Game.selectSavedGameMoves('rockpaperscissorslizardspock');
    Game.setPlayerName(1, 'test1');
    Game.setPlayerName(2, 'test2');
    Game.doMove(1, 'paper');
    Game.doMove(2, 'spock');
    Game.pushToRound();
    const result = Game.getWinner(Game.rounds[0].players);
    // as paper disproves spock we should
    expect(result).toBe('test1');
  });

  it('should return the winner of a round using the classic janken set', () => {
    Game.selectSavedGameMoves('janken');
    Game.startAgain();
    Game.setPlayerName(1, 'test1');
    Game.setPlayerName(2, 'test2');
    Game.doMove(1, 'scissors');
    Game.doMove(2, 'rock');
    Game.pushToRound();
    const result = Game.getWinner(Game.rounds[0].players);
    // as it always is, rock smashes scissors
    expect(result).toBe('test2');
  });

  it('should return an empty string when draw', () => {
    Game.selectSavedGameMoves('janken');
    Game.startAgain();
    Game.setPlayerName(1, 'test1');
    Game.setPlayerName(2, 'test2');
    Game.doMove(1, 'rock');
    Game.doMove(2, 'rock');
    Game.pushToRound();
    const result = Game.getWinner(Game.rounds[0].players);
    expect(result).toBe('');
  });

  it('should return an empty string when draw and the moves are not cyclic', () => {
    Game.selectSavedGameMoves('notacycle');
    Game.startAgain();
    Game.setPlayerName(1, 'test1');
    Game.setPlayerName(2, 'test2');
    Game.doMove(1, 'scissors');
    Game.doMove(2, 'lizard');
    Game.pushToRound();
    const result = Game.getWinner(Game.rounds[0].players);
    expect(result).toBe('');
  });

  it('should returns a list of unique moves', () => {
    Game.selectSavedGameMoves('rockpaperscissorslizardspock');
    const moves = Game.uniqueMoves;
    expect(moves.length).toBe(5);
  });

  it('should reset again when startAgain method is called', () => {
    Game.selectSavedGameMoves('rockpaperscissorslizardspock');
    Game.setPlayerName(1, 'test1');
    Game.setPlayerName(2, 'test2');
    Game.doMove(1, 'paper');
    Game.doMove(2, 'spock');
    Game.pushToRound();
    Game.startAgain();
    expect(Game.players[0].move).toBe('');
    expect(Game.rounds.length).toBe(0);
    expect(Game.turn).toBe(1);
  });

  it('should return the winner of the game given a set of rounds', () => {
    Game.selectSavedGameMoves('rockpaperscissorslizardspock');
    Game.setPlayerName(1, 'test1');
    Game.setPlayerName(2, 'test2');
    Game.doMove(1, 'paper');
    Game.doMove(2, 'spock');
    Game.pushToRound();
    Game.doMove(1, 'paper');
    Game.doMove(2, 'scissors');
    Game.pushToRound();
    Game.doMove(1, 'spock');
    Game.doMove(2, 'paper');
    Game.pushToRound();
    const emperor = Game.getEmperor(Game.rounds);
    expect(emperor).toBe('test2');
  });
});
