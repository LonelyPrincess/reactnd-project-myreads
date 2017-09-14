import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../utils/BooksAPI';
import TroubleReport from './TroubleReport';
import BookShelfSelector from './BookShelfSelector';

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
    onShelfChange: PropTypes.func.isRequired
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
        console.warn(`Failed to fetch book with id ${this.props.bookId}`);
        this.setState({ notFound: true });
      });
  }

  /**
   * Creates a string with author names separated by commas based on the book's
   * author array. If 'authors' field is missing from the book, it will be set to
   * "Unknown".
   * @return {string}
   */
  getAuthorListString = () => {
    return this.state.book.authors ? this.state.book.authors.join(', ') : 'Unknown';
  };

  /**
   * Checks if there's a thumbnail available for the book.
   * @return {boolean}
   */
  isThumbnailAvailable = () => {
    return (this.state.book.imageLinks && this.state.book.imageLinks.thumbnail);
  };

  /**
   * Obtains an array stating which of the rating stars should be highlighted
   * depending on the book's average rating.
   * @return {array} - Array with the status for each of the rating stars.
   */
  getRatingStarStatus = () => {
    const avgRating = this.state.book.averageRating || 0;

    let highlightStar = [];
    for (let i = 0; i < 5; i++) {
      highlightStar.push(avgRating > i);
    }

    return highlightStar;
  };

  render() {
    const { book, notFound } = this.state;

    if (!book) {
      if (!notFound) {
        return null;
      }

      return (
        <TroubleReport message="Sorry! We couldn't find the book you were looking for!" />
      );
    }

    return (
      <article className="container" data-page="book-details">
        <section className="book-details">
          <div className="book-top">
            {this.isThumbnailAvailable() ? (
              <div className="book-cover" style={{ backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
            ) : (
              <div className="book-cover">
                <span className="no-image"></span>
              </div>
            )}
            <BookShelfSelector book={book} onShelfChange={this.props.onShelfChange} />
          </div>
          <div className="book-info">
            <div className="book-title">{book.title}</div>
            <div className="book-subtitle">{book.subtitle}</div>
            <div className="book-authors">{this.getAuthorListString()}</div>

            <ul>
              <li>Number of pages: {book.pageCount}</li>
              <li>Published by {book.publisher || 'an unknown entity'} on {book.publishedDate || 'a certain date in history'}</li>
            </ul>
          </div>
        </section>

        <section className="book-summary">{book.description}</section>

        <section className="rating-stars">
          {this.getRatingStarStatus().map((highlightStar, index) => (
            <i key={index} className={`ico ${highlightStar ? 'ico-star' : 'ico-star-outline'}`}></i>
          ))}
          <div className="review-count">(Based on {book.ratingsCount || 0} reviews)</div>
        </section>

        <section className="tags">
          {(book.categories || []).map((category, index) => (
            <Link key={index} to={`/search/${category}`}>{category}</Link>
          ))}
        </section>
      </article>
    )
  };
}

export default BookDetails;