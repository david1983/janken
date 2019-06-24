import React from 'react';
import { shallow } from 'enzyme';
import PlayerSelection from './PlayerSelection';

describe('the GamePage component', () => {
  it('should match the snapshot of the shallow rendered component', () => {
    const component = <PlayerSelection />;
    const rendered = shallow(component);
    expect(rendered).toMatchSnapshot();
  });
});
