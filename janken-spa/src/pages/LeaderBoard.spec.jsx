import React from 'react';
import { shallow } from 'enzyme';
import LeaderBoard from './LeaderBoard';

describe('the GamePage component', () => {
  it('should match the snapshot of the shallow rendered component', () => {
    const component = <LeaderBoard />;
    const rendered = shallow(component);
    expect(rendered).toMatchSnapshot();
  });
});
