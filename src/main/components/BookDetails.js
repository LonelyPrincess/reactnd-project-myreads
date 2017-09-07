import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from '../utils/BooksAPI';

// TODO: create new component with common methods to this and 'BookListItem', so we don't have duplicate code

/**
 * Component used to render detailed information on a book.
 *
 * @module components/BookDetails
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
class BookDetails extends Component {

  state = {
    book: null
  };

  static propTypes = {
    bookId: PropTypes.string.isRequired,
    showLoader: PropTypes.func.isRequired
  };

  // Retrieve books from API once component is inserted in DOM
  componentDidMount() {
    this.props.showLoader(true);
    BooksAPI.get(this.props.bookId)
      .then((book) => {
        this.setState({ book });
        this.props.showLoader(false);
      });
  }

  /**
   * Creates a string with author names separated by commas based on the book's
   * author array. If 'authors' field is missing from the book, it will be set to
   * "Unknown".
   * @return {string}
   */
  getAuthorListString = () => {
    return this.state.book.authors ? this.state.book.authors.join(", ") : "Unknown";
  };

  /**
   * Checks if there's a thumbnail available for the book.
   * @return {boolean}
   */
  isThumbnailAvailable = () => {
    return (this.state.book.imageLinks && this.state.book.imageLinks.thumbnail);
  };

  render() {
    const book = this.state.book;

    /* TODO: display an error message if the book was not found */
    if (!book) {
      return null;
    }

    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="book-details">
          <div className="book-meta">
            {this.isThumbnailAvailable() ? (
              <div className="book-cover" style={{ backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
            ) : (
              <div className="book-cover no-image"></div>
            )}
            <div className="book-info">
              <div className="book-title">{book.title}</div>
              <div className="book-subtitle">{book.subtitle}</div>
              <div className="book-authors">{this.getAuthorListString()}</div>

              <ul>
                <li>Number of pages: {book.pageCount}</li>
                <li>Published by "{book.publisher}" on {book.publishedDate}</li>
              </ul>
            </div>
          </div>

          <div className="book-summary">{book.description}</div>

          <div className="rating-stars">
            <i className={"ico ico-star" + (book.averageRating ? " fill" : "")}></i>
            <i className={"ico ico-star" + (book.averageRating > 1 ? " fill" : "")}></i>
            <i className={"ico ico-star" + (book.averageRating > 2 ? " fill" : "")}></i>
            <i className={"ico ico-star" + (book.averageRating > 3 ? " fill" : "")}></i>
            <i className={"ico ico-star" + (book.averageRating > 4 ? " fill" : "")}></i>
            <div className="review-count">(Based on {book.ratingsCount} reviews)</div>
          </div>

          <div className="tags">
            {book.categories.map((category, index) => (
              <span key={index}>{category}</span>
            ))}
          </div>
        </div>
      </div>
    )
  };
}

export default BookDetails;