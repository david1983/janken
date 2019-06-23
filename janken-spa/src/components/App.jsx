import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
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
            <Route exact path="/game" component={Game} />
            <Route exact path="/leaderboard" component={LeaderBoard} />
            <Redirect to="/" />
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
