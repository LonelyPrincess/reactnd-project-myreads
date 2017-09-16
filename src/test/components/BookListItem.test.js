import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { getComponentWrapper } from '../utils/TestUtils';

import BookListItem from '../../main/components/BookListItem';

import data from '../../res/data/ws-get-book.json';

/**
 * Unit tests for the book list item component.
 *
 * @module test/components/BookListItem
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
describe('\n --- TESTS FOR BOOK LIST ITEM COMPONENT --- \n', () => {

  const book = data.book;

  it('render book data', () => {
    const wrapper = getComponentWrapper(
      <BookListItem book={book} onShelfChange={() => null} />
    );

    expect(wrapper.find('.book-title').text())
      .toBe(book.title);
    expect(wrapper.find('.book-authors').text())
      .toBe(book.authors.join(', '));
    expect(wrapper.find('a').prop('href'))
      .toBe(`/details/${book.id}`);
    expect(wrapper.find('.book-cover').prop('style').backgroundImage)
      .toBe(`url('${book.imageLinks.thumbnail}')`);
    expect(wrapper.find('select').prop('value'))
      .toBe(book.shelf);
  });

});
