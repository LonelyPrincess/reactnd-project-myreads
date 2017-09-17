import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookShelfSelector from './BookShelfSelector';

/**
 * This stateless component represents a book item as displayed on a list with
 * its most relevant information: title, authors and a thumbnail image.
 *
 * @module components/BookListItem
 * @author LonelyPrincess <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {object} props.book - Book to display.
 * @param {function} props.onShelfChange - Handler function to trigger when a
 *  book is moved to another shelf.
 */
function BookListItem(props) {

  const book = props.book;

  /**
   * Creates a string with author names separated by commas based on the book's
   * author array. If 'authors' field is missing from the book, it will be set to
   * "Unknown".
   * @return {string}
   */
  let getAuthorListString = () => {
    return book.authors ? book.authors.join(', ') : 'Unknown';
  };

  /**
   * Checks if there's a thumbnail available for the book.
   * @return {boolean}
   */
  let isThumbnailAvailable = () => {
    return (book.imageLinks && book.imageLinks.thumbnail);
  };

  return (
    <li className="book">
      <div className="book-top">
        <Link to={`/details/${book.id}`}>
          {isThumbnailAvailable() ? (
            <div className="book-cover" style={{ backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
          ) : (
            <div className="book-cover">
              <span className="no-image"></span>
            </div>
          )}
        </Link>
        <BookShelfSelector book={book} onShelfChange={props.onShelfChange} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{getAuthorListString()}</div>
    </li>
  );
}

BookListItem.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BookListItem;