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
    book: null,
    notFound: false
  };

  static propTypes = {
    bookId: PropTypes.string.isRequired,
    showLoader: PropTypes.func.isRequired,
    onBookUpdated: PropTypes.func.isRequired
  };

  // Retrieve books from API once component is inserted in DOM
  componentDidMount() {
    this.props.showLoader(true);
    BooksAPI.get(this.props.bookId)
      .then((book) => {
        this.setState({ book });
        this.props.showLoader(false);
      })
      .catch((error) => {
        console.warn("Failed to fetch book with id " + this.props.bookId);
        this.setState({ notFound: true });
      });
  }

  /**
   * Handler for the 'change' event of the 'select' tag that allows the user to
   * move the book to another shelf. Updates the book' status on the server.
   * @param {Event} event - Contains information on the selected shelf.
   */
  updateBookShelf = (event) => {
    const shelf = event.target.value;
    const book = this.state.book;

    this.props.showLoader(true);
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.props.onBookUpdated(book);
        this.props.showLoader(false);
      });
  };

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
    const { book, notFound } = this.state;

    /* TODO:
      - header and main containers must be moved to the app component, as not to duplicate code
      - error page must become an independant component receiving two props: title and error message
    */
    if (!book) {
      if (!notFound) {
        return null;
      }

      return (
        <section className="container error-message">
          <h1>Houston, we have a problem!</h1>
          <p>Sorry! We couldn't find the book you were looking for!</p>
          <div className="crying-face"></div>
        </section>
      );
    }

    return (
      <article className="book-details">
        <section className="book-meta">
          <div className="book-top">
            {this.isThumbnailAvailable() ? (
              <div className="book-cover" style={{ backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
            ) : (
                <div className="book-cover">
                  <span className="no-image"></span>
                </div>
              )}
            <div className="book-shelf-changer">
              <select value={book.shelf || "none"} onChange={this.updateBookShelf}>
                <option value="placeholder" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-info">
            <div className="book-title">{book.title}</div>
            <div className="book-subtitle">{book.subtitle}</div>
            <div className="book-authors">{this.getAuthorListString()}</div>

            <ul>
              <li>Number of pages: {book.pageCount}</li>
              <li>Published by "{book.publisher}" on {book.publishedDate}</li>
            </ul>
          </div>
        </section>

        <section className="book-summary">{book.description}</section>

        <section className="rating-stars">
          <i className={"ico ico-star" + (book.averageRating ? " fill" : "")}></i>
          <i className={"ico ico-star" + (book.averageRating > 1 ? " fill" : "")}></i>
          <i className={"ico ico-star" + (book.averageRating > 2 ? " fill" : "")}></i>
          <i className={"ico ico-star" + (book.averageRating > 3 ? " fill" : "")}></i>
          <i className={"ico ico-star" + (book.averageRating > 4 ? " fill" : "")}></i>
          <div className="review-count">(Based on {book.ratingsCount || 0} reviews)</div>
        </section>

        <section className="tags">
          {(book.categories || []).map((category, index) => (
            <span key={index}>{category}</span>
          ))}
        </section>
      </article>
    )
  };
}

export default BookDetails;