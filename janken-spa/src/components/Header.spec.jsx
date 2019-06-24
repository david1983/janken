import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('the Header component', () => {
  it('should match the snapshot of the shallow rendered component', () => {
    const component = <Header />;
    const rendered = shallow(component);
    expect(rendered).toMatchSnapshot();
  });
});
