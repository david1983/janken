import { observable, action } from 'mobx';
import Api from './service/api';


class LeaderBaord {
  @observable leaderboard = []

  constructor() {
    this.api = new Api('http://localhost:3001');
    this.getGames();
  }

  @action
  getGames() {
    this.api.getLeaderBoard()
      .then(result => result.data)
      .then((games) => {
        console.log(games);
        this.leaderboard = games;
      })
      .catch(console.err);
  }
}


export default LeaderBaord;
