import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import { createMuiTheme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';

import '../styles/main.css';

import PlayerSelection from '../pages/PlayerSelection';
import Game from '../pages/GamePage';
import LeaderBoard from '../pages/LeaderBoard';
import Stores from '../state/Stores';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
