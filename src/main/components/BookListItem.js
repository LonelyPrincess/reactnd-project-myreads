/**
 * This stateless component represents a book item as displayed on a list, only
 * with the most relevant information: title, authors and a thumbnail image.
 *
 * @module components/BookListItem
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from '../utils/BooksAPI';

function BookListItem (props) {

  /**
   * Handler for the 'change' event of the 'select' tag that allows the user to
   * move the book to another shelf. Updates the book' status on the server.
   * @param {Event} event - Contains information on the selected shelf.
   */
  let updateBookShelf = (event) => {
    const book = props.book;
    const shelf = event.target.value;

    props.showLoader(true);
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        props.onBookUpdated(book);
        props.showLoader(false);
      });
  };

  /**
   * Creates a string with author names separated by commas based on the book's
   * author array. If 'authors' field is missing from the book, it will be set to
   * "Unknown".
   * @return {string}
   */
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
  showLoader: PropTypes.func.isRequired,
  onBookUpdated: PropTypes.func.isRequired
};

export default BookListItem;