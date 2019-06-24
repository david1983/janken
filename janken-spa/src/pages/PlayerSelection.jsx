import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Card, CardContent, CardActions, Button, MenuItem, FormControl, InputLabel, Select,
} from '@material-ui/core';
import PlayerNameInput from '../components/PlayerNameInput';
import GameClass from '../state/Game';
// import GameClass from '../state/Game';

const PlayerSelection = ({ history, Game }) => (
  <div className="player-selection-container">
    <form onSubmit={(e) => {
      e.preventDefault();
      Game.start();
      history.push('/game');
    }}
    >
      <Card className="player-selection-form">
        <CardContent>
          <h1>Player selection</h1>
          <PlayerNameInput key="player1" playerNumber={1} />
          <PlayerNameInput key="player2" playerNumber={2} />
          <div className="mode-selection">
            <h3 className="label">
              Select game mode
            </h3>
            <FormControl className="form-control-select-move">

              <InputLabel htmlFor="mode-simple">Choose Mode</InputLabel>
              <Select
                inputProps={{
                  name: 'mode',
                  id: 'mode-simple',
                }}
                value={Game.selectedMoves}
                onChange={e => Game.selectSavedGameMoves(e.target.value)}
              >
                {Object.keys(Game.savedMoves)
                  .map(move => <MenuItem key={move} value={move}>{move}</MenuItem>)}
              </Select>
            </FormControl>
          </div>

        </CardContent>
        <CardActions className="action-area">
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className="player-selection-form-submit"
          >
            Start Game
          </Button>

        </CardActions>
      </Card>
    </form>

  </div>
);


PlayerSelection.defaultProps = {
  history: {},
  Game: new GameClass(),
};

PlayerSelection.propTypes = {
  history: PropTypes.object,
  Game: PropTypes.object,
};


export default inject('Game')(observer(PlayerSelection));
