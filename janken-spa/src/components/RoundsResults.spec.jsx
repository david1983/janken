import React from 'react';
import { render } from 'enzyme';
import RoundsResults from './RoundsResults';
import GameClass from '../state/Game';

const Game = new GameClass();
describe('the RoundsResults component', () => {
  it('should match the snapshot of the shallow rendered component', () => {
    const component = <RoundsResults Game={Game} />;
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
  });
});
