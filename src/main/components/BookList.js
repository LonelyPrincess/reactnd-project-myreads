import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';

/**
 * This stateless component represents the final user's library. It includes
 * a set of shelves in which the different books will be grouped into.
 *
 * @module components/BookList
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
function BookList (props) {

  const shelves = [
    { id: "currentlyReading", name: "Currently Reading" },
    { id: "wantToRead", name: "Want to Read" },
    { id: "read", name: "Read" }
  ];

  /**
   * Obtain all of the user's book that belong to a certain shelf.
   * @param {string} shelf
   * @returns {array} List of books that belong to the selected shelf.
   */
  let getBooksFromShelf = (shelf) => {
    return props.books
      .filter((book) => book.shelf === shelf)
  };

  return (
    <section data-page="user-books">
      <div className="container full-width">
          { shelves.map((shelf) => (
            <BookShelf
              key={shelf.id}
              title={shelf.name}
              onShelfChange={props.onShelfChange}
              books={getBooksFromShelf(shelf.id)} />
          ))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </section>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BookList;