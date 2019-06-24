import { observable, action, computed } from 'mobx';
import Api from './service/api';

/**
 * Class defining the store for the Business logic of the game.
 */
export default class Game {
  @observable players = [
    { name: '', move: '' },
    { name: '', move: '' },
  ]

  @observable maxRounds = 1

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
    notacycle: [
      { move: 'scissors', kills: 'paper' },
      { move: 'paper', kills: 'rock' },
      { move: 'rock', kills: 'lizard' },
      { move: 'lizard', kills: 'paper' },
    ],
  }

  @observable moves = this.savedMoves.rockpaperscissorslizardspock

  constructor() {
    this.api = new Api('http://localhost:3001');
  }


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

  /**
   * returns the name of the winner for the specified round
   * @param {Object} roundPlayers
   */
  getWinner(roundPlayers) {
    if (!roundPlayers) return;
    // extract the players of the round
    const players = Object.keys(roundPlayers).map(pkey => roundPlayers[pkey]);
    // map over the players to check who generate the kill
    const kills = players.map(p1 => players
      .map(p2 => this
        .movesMap[p1.move]
        .kills
        .indexOf(p2.move) >= 0));

    const result = kills.map(i => i.reduce((a2, i2) => (a2 || i2)));
    return result.map((i, k) => ((i) ? players[k].name : '')).join('');
  }

  /**
   * Given a set of rounds returns the name of the player
   * who won most rounds
   */
  getEmperor(rounds) {
    if (!rounds) return console.error('rounds must be provided');
    const winners = rounds.map(round => round.winner);
    const aggregation = winners.reduce((a, i) => {
      const elem = a.filter(iter => iter[0] === i);
      if (elem.length > 0) {
        const idx = a.indexOf(elem[0]);
        a[idx][1] += 1;
      } else { a.push([i, 1]); }

      return a;
    }, []);
    const sortedAggreg = aggregation.sort((a, b) => a[1] - b[1]);
    if (sortedAggreg.length === 0) return '';
    return sortedAggreg[sortedAggreg.length - 1][0];
  }


  @action
  pushToRound() {
    const players = this.players.reduce((a, i, k) => {
      const newObj = a;
      // deep cloning the player object, to avoid shallow copy bugs
      // doing deep copy with the JSON library is not ideal
      // especially for large data structures.
      // in this case the difference in performance is negligeable
      newObj[`player${k}`] = JSON.parse(JSON.stringify(i));
      return newObj;
    }, {});
    const winner = this.getWinner(players);
    const round = { players, winner };
    this.rounds.push(round);
  }

  @action
  endTurn() {
    if (this.rounds.length >= this.maxRounds) {
      return console.warn('rounds length should not be greater than maxRounds check the endTurn fn');
    }

    if (this.turn === this.players.length) {
      this.turn = 1;
      this.pushToRound();
      if (this.rounds.length === this.maxRounds) {
        const game = {
          moves: this.moves,
          winner: this.getEmperor(this.rounds),
          rounds: this.rounds,
        };
        console.log(game);
        this.api.saveGame(game)
          .catch(console.error);
      }
      return this.resetMoves();
    }
    this.turn += 1;
  }

  /**
   * Reset player moves, used to reinitialise the round
   */
  @action
  resetMoves() {
    this.players = this.players.map((player) => {
      player.move = '';
      return player;
    });
  }

  /**
   *
   * @param {String} key the key name of the saved set of moves
   */
  @action
  selectSavedGameMoves(key) {
    if (!this.savedMoves[key]) return console.warn(`No saved moves pattern saved with name: ${key}`);
    this.moves = this.savedMoves[key];
  }

  /**
   *
   */
  @action
  start() {
    const proms = this.players.map(player => this.api.savePlayer(player.name));
    Promise.all(proms)
      .then(result => result.map(res => res.data))
      .catch(console.error);
  }

  @action
  startAgain() {
    this.resetMoves();
    this.rounds = [];
    this.turn = 1;
  }

  getPlayer(num) {
    if (num > Object.keys(this.players)) return console.error('Player number must be 1 or 2');
    return this.players[num - 1];
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

  /**
   * Convert the Array of moves into a Map/Object/Dictionary
   * this should reduce the number of iterable keys
   */
  @computed
  get movesMap() {
    return this.moves.reduce((a, i) => {
      if (!a[i.move]) a[i.move] = { kills: [i.kills] };
      else a[i.move].kills.push(i.kills);
      return a;
    }, {});
  }
}
