import React from 'react';
import { shallow } from 'enzyme';
import GamePage from './GamePage';

describe('the GamePage component', () => {
  it('should match the snapshot of the shallow rendered component', () => {
    const component = <GamePage />;
    const rendered = shallow(component);
    expect(rendered).toMatchSnapshot();
  });
});
