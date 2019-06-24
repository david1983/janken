import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';

import GameClass from '../state/Game';

/**
 * Component that renders a table with the results
 * for each round of the game
 * @param {Object} param0 the component props
 */
const RoundsResults = ({ Game }) => (

  <Table>
    <TableHead>
      <TableRow>
        {Game.players.map((i, k) => (
          <TableCell
            key={`header-${k}`}
          >
            {`Player ${k + 1} - ${i.name}`}
          </TableCell>
        ))}
        <TableCell>Winner</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Game.rounds.map((round, idx) => (
        <TableRow key={`round-${idx}`}>
          {Object.keys(round.players)
            .map(playerKey => (
              <TableCell
                key={playerKey}
              >
                {round.players[playerKey].move}
              </TableCell>
            ))}
          <TableCell>{round.winner}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

RoundsResults.defaultProps = {
  Game: new GameClass(),
};

RoundsResults.propTypes = {
  Game: PropTypes.object,
};


export default inject('Game')(observer(RoundsResults));
