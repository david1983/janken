import React from 'react';
import { render } from 'enzyme';
import GameResult from './GameResult';
import GameClass from '../state/Game';

const Game = new GameClass();

describe('the GameResult component', () => {
  it('should match the snapshot of the shallow rendered component', () => {
    const component = <GameResult Game={Game} />;
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
  });
});
