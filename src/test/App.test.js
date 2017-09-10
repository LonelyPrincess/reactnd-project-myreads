import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import App from '../main/App';

describe('\n --- TESTS FOR APP COMPONENT --- \n', () => {
  let wrapper;

  // Initialize wrapper before running any of the tests
  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
  });

  it('renders a header with the application name', () => {
    const header = wrapper.find('header');
    expect(header).toHaveLength(1);
    expect(header.find('h1').text()).toBe('MyReads');
  });

  it('renders a header without back button in root path', () => {

    // TODO: find another way to retrieve current path from react router
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      return;
    }

    const header = wrapper.find('header.without-back-button');
    expect(header).toHaveLength(1);
    expect(header.children()).toHaveLength(2);
    expect(header.find('.back-button')).toHaveLength(0);
  });
});
