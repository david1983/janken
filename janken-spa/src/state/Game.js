import { observable, action, computed } from 'mobx';

class Game {
  @observable player1 = {
    name: '', move: '',
  }

  @observable player2 = {
    name: '', move: '',
  }

  @observable savedMoves = {
    janken: [
      { move: 'paper', kills: 'rock' },
      { move: 'rock', kills: 'scissors' },
      { move: 'scissors', kills: 'paper' },
    ],
  }

  @observable moves = this.savedMoves.janken

  @action
  setPlayerName(num, name) {
    switch (num) {
      case 1:
        this.player1.name = name;
        break;
      case 2:
        this.player2.name = name;
        break;
      default:
        return console.error('Player number must be 1 or 2');
    }
  }

  @action
  doMove(num, move) {
    switch (num) {
      case 1:
        this.player1.move = move;
        break;
      case 2:
        this.player2.move = move;
        break;
      default:
        return console.error('Player number must be 1 or 2');
    }
  }

  @computed
  get possibleMoves() {
    return new Set(this.moves.map(i => i.move));
  }

  @computed
  get movesMap() {
    return this.moves.reduce((accumulator, iterator) => {
      if (!accumulator[iterator.move]) accumulator[iterator.move] = { kills: [iterator.kills] };
      else accumulator[iterator.move].kills.push(iterator.kills);
      return accumulator;
    }, {});
  }
}

export default new Game();
