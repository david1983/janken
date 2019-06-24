import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  FormControl, MenuItem, Button, InputLabel, Select,
} from '@material-ui/core';

import GameClass from '../state/Game';

/**
 * Component that renders the main game view
 * where the players can choose their moves
 * @param {props} props The component props
 */
const GameView = ({ Game, playerNumber }) => {
  const player = Game.getPlayer(playerNumber);
  return (
    <div className="game-view-content">

      <h3>
        {`${[player.name]}'s turn`}
      </h3>

      {player.move === '' && (
        <div>

          <FormControl className="form-control-select-move">

            <InputLabel htmlFor="move-simple">Choose a move</InputLabel>
            <Select
              inputProps={{
                name: 'move',
                id: 'move-simple',
              }}
              value="Chose a move"
              onChange={e => Game.doMove(playerNumber, e.target.value)}
            >
              {Game.uniqueMoves.map(move => (
                <MenuItem key={`select-move-${move}`} value={move}>{move}</MenuItem>
              ))}

            </Select>
          </FormControl>

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
