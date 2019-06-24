import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Card, CardHeader, CardContent, CardActions, Button,
} from '@material-ui/core';
import GameClass from '../state/Game';

/**
 * The GameResult component renders a card containing
 * the winner of the rounds
 */
const GameResult = ({ Game }) => {
  const winner = Game.getEmperor(Game.rounds);
  return (
    <div className="game-result">
      <Card>
        <CardHeader>Game result</CardHeader>
        <CardContent>
          {winner !== '' && (
            <div>
              <h1>We have a WINNER!!</h1>
              <h3>
                {Game.getEmperor(Game.rounds)}
                {' '}
                is the new EMPEROR!
              </h3>
            </div>
          )}

          {winner === '' && (
            <div>
              <h1>We have a DRAW!!</h1>
              <h3>
                Press the button below to play again
              </h3>
            </div>
          )}
        </CardContent>
        <CardActions className="action-area">
          <Button
            type="button"
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
};


GameResult.defaultProps = {
  Game: new GameClass(),
};

GameResult.propTypes = {
  Game: PropTypes.object,
};


export default inject('Game')(observer(GameResult));
