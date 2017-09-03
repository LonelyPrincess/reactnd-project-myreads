
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookListItem from './BookListItem';
import * as BooksAPI from '../utils/BooksAPI';

class BookSearch extends React.Component {

  static propTypes = {
    onBookUpdated: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: []
  }

  updateQuery = (event) => {
    const query = event.target.value.trim();
    this.setState({ query });

    if (BooksAPI.isValidQuery(query)) {
      this.performBookSearch(query);
    } else {
      this.setState({ results: [] });
    }
  };

  performBookSearch = (query) => {
    BooksAPI.search(query, 10)
      .then((results) => this.setState({ results }));
  };

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={query} onChange={this.updateQuery} />
          </div>
        </div>
        <div className="search-books-results">
          {query && (results.length === 0
            ? (<p>No results found for "{query}"</p>)
            : (<p>Showing {results.length} books for "{query}"</p>))}
          <ol className="books-grid">
            {results.map((book) => (
              <BookListItem key={book.id} book={book}
                onBookUpdated={this.props.onBookUpdated} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;