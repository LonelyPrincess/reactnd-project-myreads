import React from 'react';

import { getAppWrapper } from '../utils/TestUtils';

import BookSearch from '../../main/components/BookSearch';

/**
 * Unit tests for the book search component.
 *
 * @module test/components/BookSearch
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
describe('\n --- TESTS FOR BOOK SEARCH COMPONENT --- \n', () => {

  it('if no param is specified on search route, input must be empty', () => {
    const wrapper = getAppWrapper('/search');
    const search = wrapper.find(BookSearch);
    expect(search).toHaveLength(1);
    const query = search.find('[name="query"]').props().value;
    expect(query).toBeFalsy();
  });

  it('if a search term is included as a path param, input must be set to that value', () => {
    const wrapper = getAppWrapper('/search/term');
    const search = wrapper.find(BookSearch);
    expect(search).toHaveLength(1);
    const query = search.find('[name="query"]').props().value;
    expect(query).toBe('term');
  });

});
