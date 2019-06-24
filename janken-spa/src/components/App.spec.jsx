import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('the App component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot of the shallow rendered component', () => {
    const component = <App />;
    const rendered = shallow(component);
    expect(rendered).toMatchSnapshot();
  });
});
