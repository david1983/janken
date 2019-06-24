import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  CardContent, Card,
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';

const LeaderBoardPage = ({ LeaderBoard }) => (
  <div className="leaderboard-container" onLoad={() => LeaderBoard.getGames()}>
    <Card className="leaderboard-card">
      <CardContent>
        <h1>LeaderBoard</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player name</TableCell>
              <TableCell># of Wins</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {LeaderBoard.leaderboard.map(player => (
              <TableRow>
                <TableCell>{player[0]}</TableCell>
                <TableCell>{player[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  </div>
);

LeaderBoardPage.defaultProps = {
  LeaderBoard: {},
};

LeaderBoardPage.propTypes = {
  LeaderBoard: PropTypes.object,
};

export default inject('LeaderBoard')(observer(LeaderBoardPage));
