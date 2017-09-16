import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { getComponentWrapper } from '../utils/TestUtils';

import BookListItem from '../../main/components/BookListItem';

/**
 * Unit tests for the book list item component.
 *
 * @module test/components/BookListItem
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
describe('\n --- TESTS FOR BOOK LIST ITEM COMPONENT --- \n', () => {

  const book = {
    "title": "Learning Web Development with React and Bootstrap",
    "authors": [
        "Harmeet Singh",
        "Mehul Bhatt"
    ],
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "id": "sJf1vQAACAAJ",
    "shelf": "currentlyReading"
  };

  it('render book data', () => {
    const wrapper = getComponentWrapper(
        <BookListItem book={book} onShelfChange={() => null} />
    );
    expect(wrapper.find('.book-title').text())
      .toBe('Learning Web Development with React and Bootstrap');
    expect(wrapper.find('.book-authors').text())
      .toBe('Harmeet Singh, Mehul Bhatt');
    expect(wrapper.find('a').prop('href'))
      .toBe(`/details/${book.id}`);
    expect(wrapper.find('.book-cover').prop('style').backgroundImage)
      .toBe(`url('${book.imageLinks.thumbnail}')`);
  });

});
