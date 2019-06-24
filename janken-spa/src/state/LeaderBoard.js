import { observable, action } from 'mobx';
import Api from './service/api';


class LeaderBaord {
    @observable leaderboard = []

    constructor() {
      this.api = new Api('http://localhost:3001');
    }

    @action
    getGames() {
      this.api.getAllGames()
        .then(result => result.data)
        .then((games) => {
          this.leaderboard = games;
        })
        .catch(console.err);
    }
}


export default LeaderBaord;
