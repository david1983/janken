import React from 'react';
import { render } from 'enzyme';
import PlayerNameInput from './PlayerNameInput';
import GameClass from '../state/Game';

const Game = new GameClass();
describe('the PlayerNameInput component', () => {
  it('should match the snapshot of the shallow rendered component', () => {
    const component = <PlayerNameInput Game={Game} />;
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
  });
});
