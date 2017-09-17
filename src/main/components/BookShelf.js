import React from 'react';
import PropTypes from 'prop-types';

import BookListItem from './BookListItem';

/**
 * Stateless component to render an user shelf, displaying both its title and
 * the books that the user has put into it.
 *
 * @module components/BookShelf
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {string} props.title - Shelf name.
 * @param {array} props.books - List of books to display on the shelf.
 * @param {function} props.onShelfChange - Handler function to trigger when a
 *  book is moved to another shelf.
 */
function BookShelf (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <BookListItem key={book.id} book={book}
              onShelfChange={props.onShelfChange} />
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BookShelf;