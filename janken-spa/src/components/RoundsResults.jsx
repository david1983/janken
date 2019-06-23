import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Paper, Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';

import GameClass from '../state/Game';

const GameView = ({ Game }) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    {Game.players.map((i, k) => <TableCell>{`Player ${k + 1} - ${i.name}`}</TableCell>)}
                    <TableCell>Winner</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Game.rounds.map((round, idx) => (
                    <TableRow key={`rounds-${idx}`}>
                        {Object.keys(round.players)
                          .map(playerKey => <TableCell>{round.players[playerKey].move}</TableCell>)}
                        <TableCell>{round.winner}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
);

GameView.defaultProps = {
  Game: new GameClass(),
};

GameView.propTypes = {
  Game: PropTypes.object,
};


export default inject('Game')(observer(GameView));
