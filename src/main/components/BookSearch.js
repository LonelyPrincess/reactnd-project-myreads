import React from 'react';
import PropTypes from 'prop-types';

import BookListItem from './BookListItem';
import * as BooksAPI from '../utils/BooksAPI';

/**
 * Component in charge of handling the status of a search input and render the
 * list of the books returned by the API after calling the search service.
 *
 * @module components/BookSearch
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
class BookSearch extends React.Component {

  static propTypes = {
    showLoader: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  state = {
    query: '',
    results: []
  };

  /**
   * Handler for the 'change' event of the search input. If its value matches
   * one of the search terms supported by the provided API, the search service
   * is called. Otherwise, we'll assign an empty array to the search results.
   *
   * @param {Event} event - Information on the triggered 'change' event,
   *  including the new value of the search input.
   */
  updateQuery = (event) => {
    let query = event.target.value;
    this.setState({ query });

    query = query.trim();
    if (BooksAPI.isValidQuery(query)) {
      this.performBookSearch(query);
    } else {
      this.setState({ results: [] });
    }
  };

  /**
   * Calls the search method of the Books API to retrieve the list of books
   * that matches the specified criteria. Component's status will be updated
   * with the updated results.
   *
   * @param {string} query - Search term that will be used as a query.
   */
  performBookSearch = (query) => {
    this.props.showLoader(true);
    BooksAPI.search(query)
      .then((results) => {
        let resultsWithShelves = results.map((book) => {
          book.shelf = this.props.getBookShelf(book.id);
          return book;
        });
        this.props.showLoader(false);
        this.setState({ results: resultsWithShelves });
      });
  };

  /**
   * Returns the view of the component.
   * @returns JSX template for the component.
   */
  render() {
    const { query, results } = this.state;

    return (
      <div className="search-books">
        <input type="search" name="query" placeholder="Search by title or author"
          value={query} onChange={this.updateQuery} />
        <section className="search-books-results">
          {query && (results.length === 0
            ? (<p>No results found for <em>"{query}"</em></p>)
            : (<p>Showing {results.length} books for <em>"{query}"</em></p>))}
          <ol className="books-grid">
            {results.map((book) => (
              <BookListItem key={book.id} book={book}
                onShelfChange={this.props.onShelfChange} />
            ))}
          </ol>
        </section>
      </div>
    );
  }
}

export default BookSearch;