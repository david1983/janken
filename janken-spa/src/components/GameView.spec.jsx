import React from 'react';
import { render } from 'enzyme';
import GameView from './GameView';
import GameClass from '../state/Game';

const Game = new GameClass();
describe('the GameView component', () => {
  it('should match the snapshot of the shallow rendered component', () => {
    const component = <GameView Game={Game} />;
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
  });
});
