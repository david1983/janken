import { observable, action, computed } from 'mobx';

/**
 * Class defining the store for the Business logic of the game.
 */
export default class Game {
  @observable players = [
    { name: '', move: '' },
    { name: '', move: '' },
  ]

  maxTurns = 6

  @observable turn = 1

  @observable rounds = []

  @observable savedMoves = {
    janken: [
      { move: 'paper', kills: 'rock' },
      { move: 'rock', kills: 'scissors' },
      { move: 'scissors', kills: 'paper' },
    ],
    rockpaperscissorslizardspock: [
      { move: 'scissors', kills: 'paper' },
      { move: 'paper', kills: 'rock' },
      { move: 'rock', kills: 'lizard' },
      { move: 'lizard', kills: 'spock' },
      { move: 'spock', kills: 'scissors' },
      { move: 'scissors', kills: 'lizard' },
      { move: 'lizard', kills: 'paper' },
      { move: 'paper', kills: 'spock' },
      { move: 'spock', kills: 'rock' },
      { move: 'rock', kills: 'scissors' },
    ],
  }

  @observable moves = this.savedMoves.rockpaperscissorslizardspock

  /**
   * Set the name of the specified player number
   * @param {Number} num an integer identifying the playern number
   * @param {String} name the player name
   */
  @action
  setPlayerName(num, name) {
    if (num > Object.keys(this.players)) return console.error('Player number must be 1 or 2');
    this.players[num - 1].name = name;
  }

  /**
   * Set the move used in the current round
   * by the specified player number
   * @param {Number} num an integer identifying the player number
   * @param {String} move the move used chosen by the player
   */
  @action
  doMove(num, move) {
    if (num > Object.keys(this.players)) return console.error('Player number must be 1 or 2');
    this.players[num - 1].move = move;
  }

  @action
  endTurn() {
    if (this.turn === this.players.length) {
      this.turn = 1;
      const round = this.players.reduce((a, i, k) => {
        const newObj = a;
        newObj[`player${k}`] = i;
        return newObj;
      }, {});
      this.rounds.push(round);
      return this.resetMoves();
    }
    if (this.turn === this.maxTurns) return;
    this.turn += 1;
  }

  /**
   * Reset player moves, used to reinitialise the round
   */
  @action
  resetMoves() {
    this.players = this.players.map((player) => {
      const newPlayer = player;
      newPlayer.move = '';
      return newPlayer;
    });
  }

  /**
   * Transforms the Array of moves into an Object/Map/Dictionary
   * this allow better performance when the number of moves increases
   * as the Array of moves could contains duplicate
   */
  @computed
  get uniqueMoves() {
    return Array.from(new Set(this.moves.map(m => m.move)));
  }


  getPlayer(num) {
    if (num > Object.keys(this.players)) return console.error('Player number must be 1 or 2');
    return this.players[num - 1];
  }
}
