import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Input } from '@material-ui/core';
import GameClass from '../state/Game';

const PlayerNameInput = ({ Game, playerNumber }) => (
  <div className="player-selection">
    <h3 className="label">
      {`Player ${playerNumber}`}
    </h3>
    {' '}
    <Input
      required
      type="text"
      className="input"
      placeholder={`type name for player ${playerNumber}`}
      onChange={e => Game.setPlayerName(playerNumber, e.target.value)}
    />
  </div>
);

PlayerNameInput.defaultProps = {
  Game: new GameClass(),
  playerNumber: 1,
};

PlayerNameInput.propTypes = {
  Game: PropTypes.object,
  playerNumber: PropTypes.number,
};


export default inject('Game')(observer(PlayerNameInput));
