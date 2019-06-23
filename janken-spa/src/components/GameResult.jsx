import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Card, CardHeader, CardContent, CardActionArea,
} from '@material-ui/core';
import GameClass from '../state/Game';

const GameResult = ({ Game }) => (
  <div className="game-result">
    <Card>
      <CardHeader>Game result</CardHeader>
      <CardContent>
        <div>

          <h1>We have a WINNER!!</h1>
          <h3>Player is the new EMPEROR!</h3>

        </div>
      </CardContent>
      <CardActionArea onClick={() => Game.startAgain()}>
        Play again
      </CardActionArea>
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
