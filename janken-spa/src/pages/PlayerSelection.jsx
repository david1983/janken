import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import PlayerNameInput from '../components/PlayerNameInput';
// import GameClass from '../state/Game';

const PlayerSelection = props => (
  <div>
    <h1>Player selection</h1>
    <form onSubmit={(e) => {
      e.preventDefault();
      props.history.push('/game');
    }}
    >
      <PlayerNameInput key="player1" playerNumber={1} />
      <PlayerNameInput key="player2" playerNumber={2} />
      <Button type="submit">
        Start Game
      </Button>
    </form>

  </div>
);


PlayerSelection.defaultProps = {
  history: {},
};

PlayerSelection.propTypes = {
  history: PropTypes.object,
};


export default inject('Game')(observer(PlayerSelection));
