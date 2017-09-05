import React from 'react';
import PropTypes from 'prop-types';

import BookListItem from './BookListItem';

function BookShelf (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <BookListItem key={book.id} book={book}
              onBookUpdated={props.onBookUpdated} showLoader={props.showLoader} />
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  showLoader: PropTypes.func.isRequired,
  onBookUpdated: PropTypes.func.isRequired
};

export default BookShelf;