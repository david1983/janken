import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import GameClass from '../state/Game';

const GameResult = ({ Game }) => (
  <div className="game-result">
      <h2>We have a WINNER!!</h2>
      <h3>Player is the new EMPEROR!</h3>
      <button type="button">Play again</button>
    </div>
);

GameView.defaultProps = {
  Game: new GameClass(),
};

GameView.propTypes = {
  Game: PropTypes.object,
};


export default inject('Game')(observer(GameView));
