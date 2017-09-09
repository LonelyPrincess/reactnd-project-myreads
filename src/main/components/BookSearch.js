import React from 'react';
import PropTypes from 'prop-types';

import BookListItem from './BookListItem';
import * as BooksAPI from '../utils/BooksAPI';

class BookSearch extends React.Component {

  static propTypes = {
    showLoader: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired,
    onBookUpdated: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: []
  }

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

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-books">
        <input type="search" name="query" placeholder="Search by title or author"
          value={query} onChange={this.updateQuery} />
        <div className="search-books-results">
          {query && (results.length === 0
            ? (<p>No results found for <em>"{query}"</em></p>)
            : (<p>Showing {results.length} books for <em>"{query}"</em></p>))}
          <ol className="books-grid">
            {results.map((book) => (
              <BookListItem key={book.id} book={book}
                showLoader={this.props.showLoader}
                onBookUpdated={this.props.onBookUpdated} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;