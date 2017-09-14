import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { getAppWrapper } from './utils/TestUtils';

import App from '../main/App';
import BookSearch from '../main/components/BookSearch';
import BookListItem from '../main/components/BookListItem';


describe('\n --- TESTS FOR APP COMPONENT --- \n', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
  });

  it('renders a header with the application name', () => {
    const wrapper = getAppWrapper();
    const header = wrapper.find('header');
    expect(header).toHaveLength(1);
    expect(header.find('h1').text()).toBe('MyReads');
  });

  it('renders a header without back button in root path', () => {
    const wrapper = getAppWrapper('/');
    const header = wrapper.find('header.without-back-button');
    expect(header).toHaveLength(1);
    expect(header.children()).toHaveLength(2);
    expect(header.find('.back-button')).toHaveLength(0);
  });

  it('if a search term is included as a path param, input must be set to that value', () => {
    const wrapper = getAppWrapper('/search/term');
    const search = wrapper.find(BookSearch);
    expect(search).toHaveLength(1);
    const query = search.find('[name="query"]').props().value;
    expect(query).toBe('term');
  });
});
