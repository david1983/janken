import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Card, CardHeader, CardContent, CardActions, Button,
} from '@material-ui/core';
import GameClass from '../state/Game';

const GameResult = ({ Game }) => (
  <div className="game-result">
    <Card>
      <CardHeader>Game result</CardHeader>
      <CardContent>
        <div>

          <h1>We have a WINNER!!</h1>
          <h3>
            {Game.getEmperor(Game.rounds)}
            {' '}
            is the new EMPEROR!
          </h3>

        </div>
      </CardContent>
      <CardActions className="action-area">
        <Button
          color="primary"
          variant="contained"
          onClick={() => Game.startAgain()}
        >
          Play again
        </Button>
      </CardActions>
    </Card>


  </div>
);

GameResult.defaultProps = {
  Game: new GameClass(),
};

GameResult.propTypes = {
  Game: PropTypes.object,
};


export default inject('Game')(observer(GameResult));
