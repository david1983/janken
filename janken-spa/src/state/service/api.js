import axios from 'axios';

/**
 * The Api class defines the object
 * used to interface with the REST api
 */
class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  savePlayer(name) {
    return axios.post(`${this.baseUrl}/player`, { name });
  }

  getPlayerById(id) {
    return axios.get(`${this.baseUrl}/player/${id}`);
  }

  saveGame(game) {
    return axios.post(`${this.baseUrl}/game`, game);
  }

  getAllGames() {
    return axios.get(`${this.baseUrl}/game/all`);
  }

  getLeaderBoard() {
    return axios.get(`${this.baseUrl}/game/leaderboard`);
  }
}

export default Api;
