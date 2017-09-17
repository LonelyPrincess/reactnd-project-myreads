import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless component that contains a shelf selector, allowing the user
 * to move a book from one shelf to another.
 *
 * @module components/BookShelfSelector
 * @author LonelyPrincess <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {object} props.book - Book to which the selector will apply.
 * @param {function} props.onShelfChange - Handler function to trigger when a
 *  book is moved to another shelf.
 */
function BookShelfSelector (props) {

  const book = props.book;

  /**
   * Handler for the 'change' event of the 'select' tag that allows the user to
   * move the book to another shelf.
   * @param {Event} event - Contains information on the selected shelf.
   */
  let changeBookShelf = (event) => {
    const shelf = event.target.value;
    props.onShelfChange(book, shelf);
  };

  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || 'none'} onChange={changeBookShelf}>
        <option value="placeholder" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

BookShelfSelector.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BookShelfSelector;