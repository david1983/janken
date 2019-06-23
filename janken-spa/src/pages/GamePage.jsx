import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GameClass from '../state/Game';


import GameView from '../components/GameView';

const GamePage = ({ Game }) => (
  <div className="game-page-container">
    <div>
      <h1>
        Round
        {' '}
        {Game.rounds.length + 1}
      </h1>

      <GameView playerNumber={Game.turn} />
    </div>
    <div>
      <h1>Rounds results</h1>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player 1</TableCell>
              <TableCell>Player 2</TableCell>
              <TableCell>Winner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Game.rounds.map((round, idx) => (
              <TableRow key={`rounds-${idx}`}>
                <TableCell>Player 1</TableCell>
                <TableCell>Player 2</TableCell>
                <TableCell>Winner</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>

  </div>
);


GamePage.defaultProps = {
  Game: new GameClass(),
};

GamePage.propTypes = {
  Game: PropTypes.object,
};

export default inject('Game')(observer(GamePage));
