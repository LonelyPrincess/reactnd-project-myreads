import React from 'react';
import PropTypes from 'prop-types';

function BookListItem (props) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: 'url("' + props.book.imageLinks.thumbnail + '")' }}></div>
          <div className="book-shelf-changer">
            <select value={props.book.shelf || "none"} onChange={() => console.log('TODO: update book shelf') }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors.map((author, index) => (index > 0 ? ", " : "" ) + author)}</div>
      </div>
    </li>
  );
}

// TODO: include new prop to handle shelf change
BookListItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookListItem;