import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import {
  Card, CardContent, CardActions, Button,
} from '@material-ui/core';

import GameClass from '../state/Game';
import RoundsResults from '../components/RoundsResults';
import GameView from '../components/GameView';
import GameResult from '../components/GameResult';

const GamePage = ({ Game }) => (
  <div className="game-page-container">
    {Game.getPlayer(Game.turn).name === '' && <Redirect to="/" />}

    {!(Game.rounds.length >= Game.maxRounds || Game.getEmperor(Game.rounds) !== '') && (
      <div className="game-view-container">
        <Card>
          <CardContent>
            <h1>
              {`Round ${Game.rounds.length + 1}`}
            </h1>
            <GameView playerNumber={Game.turn} />
          </CardContent>
          <CardActions className="action-area">
            <Button
              color="primary"
              variant="contained"
              onClick={() => Game.endTurn()}
              disabled={Game.getPlayer(Game.turn).move === '' || Game.getPlayer(Game.turn).name === ''}
            >
              Finish turn
            </Button>
          </CardActions>
        </Card>

        {Game.rounds.length > 0 && (
          <Card>
            <CardContent>
              <h1>Rounds results</h1>
              <RoundsResults />
            </CardContent>
          </Card>
        )}
      </div>
    )}

    {(Game.rounds.length >= Game.maxRounds || Game.getEmperor(Game.rounds) !== '')
      && (
        <div className="game-result">
          <GameResult />
        </div>
      )}

  </div>
);


GamePage.defaultProps = {
  Game: new GameClass(),
};

GamePage.propTypes = {
  Game: PropTypes.object,
};

export default inject('Game')(observer(GamePage));
