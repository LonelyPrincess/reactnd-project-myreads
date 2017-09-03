import React from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from '../utils/BooksAPI'

function BookListItem (props) {

  let updateBookShelf = (event) => {
    const shelf = event.target.value;
    console.debug(shelf === "none"
      ? `"${props.book.title}" will be removed from shelves`
      : `"${props.book.title}" will be moved to shelf "${shelf}"`);

    BooksAPI.update(props.book, shelf)
      .then(props.onBookUpdated);
  };

  let getAuthorListString = () => {
    const authorList = props.book.authors;
    return authorList ? authorList.join(", ") : "Unknown";
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: 'url("' + props.book.imageLinks.thumbnail + '")' }}></div>
          <div className="book-shelf-changer">
            <select value={props.book.shelf || "none"} onChange={updateBookShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{getAuthorListString()}</div>
      </div>
    </li>
  );
}

BookListItem.propTypes = {
  book: PropTypes.object.isRequired,
  onBookUpdated: PropTypes.func.isRequired
};

export default BookListItem;