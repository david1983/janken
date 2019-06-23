import React from 'react';
import { Provider } from 'mobx-react';

import { MemoryRouter as Router, Route } from 'react-router';
import '../styles/main.css';

import PlayerSelection from '../pages/PlayerSelection';
import Game from '../pages/GamePage';
import LeaderBoard from '../pages/LeaderBoard';
import Stores from '../state/Stores';

function App() {
  return (
    <div className="App">
      <Provider {...Stores}>
        <Router>
          <div>
            <Route exact path="/" component={PlayerSelection} />
            <Route path="/game" component={Game} />
            <Route path="/leaderboard" component={LeaderBoard} />
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
