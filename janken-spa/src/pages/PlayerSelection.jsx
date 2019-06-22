import React from 'react';

const PlayerSelection = () => (
  <div>
    <h1>Player selection</h1>

    <div className="player-selection">
      <h3>Player 1</h3>
      <input type="text" onChange={e => console.log(e.target.value)} />
    </div>

    <div className="player-selection">
      <h3>Player 2</h3>
      <input type="text" onChange={e => console.log(e.target.value)} />
    </div>

    <button type="button">Set</button>

  </div>
);

export default PlayerSelection;
