import axios from 'axios';

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

  saveGame(round, moves, winner) {
    return axios.post(`${this.baseUrl}/game`, { round, moves, winner });
  }
}

export default Api;
