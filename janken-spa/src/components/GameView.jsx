import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  MenuItem, Button, InputLabel, Select,
} from '@material-ui/core';

import GameClass from '../state/Game';

const GameView = ({ Game, playerNumber }) => {
  const player = Game.getPlayer(playerNumber);
  return (
    <div className="game-view">

      <h3>
        {`${[player.name]}'s turn`}
      </h3>

      {player.move === '' && (
        <div>

          <InputLabel htmlFor="move-simple">Choose a move</InputLabel>
          <Select
            inputProps={{
              name: 'move',
              id: 'move-simple',
            }}
            onChange={e => Game.doMove(playerNumber, e.target.value)}
          >
            {Game.uniqueMoves.map(move => (
              <MenuItem key={`select-move-${move}`} value={move}>{move}</MenuItem>
            ))}

          </Select>

        </div>
      )
      }

      {player.move !== '' && (
        <div>
          <div>
            {`${player.name}'s choice is ${player.move}`}
          </div>
          <hr />
          <Button onClick={() => Game.doMove(playerNumber, '')}>Change move</Button>
        </div>
      )}

    </div>
  );
};
GameView.defaultProps = {
  Game: new GameClass(),
  playerNumber: 1,
};

GameView.propTypes = {
  Game: PropTypes.object,
  playerNumber: PropTypes.number,
};


export default inject('Game')(observer(GameView));
