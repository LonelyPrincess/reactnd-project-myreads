import React from 'react';
import PropTypes from 'prop-types';

import BookListItem from './BookListItem';
import * as BooksAPI from '../utils/BooksAPI';

/**
 * Component in charge of handling the status of a search input and render the
 * list of the books returned by the API after calling the search service.
 *
 * @module components/BookSearch
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
function BookSearch (props) {

  // Component state
  const
    [ query, setQuery ] = React.useState(''),
    [ results, setResults ] = React.useState([]);

  /**
   * Updates the value of the query in the component' state. If the new value
   * matches one of the search terms supported by the provided API, the search
   * service is called. Otherwise, we'll assign an empty array to the results.
   *
   * @param {string} query - New value for the query input.
   */
  const updateQuery = (query) => {
    setQuery(query);

    query = query.trim();
    if (BooksAPI.isValidQuery(query)) {
      performBookSearch(query);
    } else {
      setResults([]);
    }
  };

  /**
   * Calls the search method of the Books API to retrieve the list of books
   * that matches the specified criteria. Component's status will be updated
   * with the updated results.
   *
   * @param {string} query - Search term that will be used as a query.
   */
  const performBookSearch = (query) => {
    props.showLoader(true);
    BooksAPI.search(query)
      .then((results) => {
        let resultsWithShelves = results.map((book) => {
          book.shelf = props.getBookShelf(book.id);
          return book;
        });
        props.showLoader(false);
        setResults(resultsWithShelves);
      });
  };

  /**
   * Handler for 'component did mount' lifecycle event. If the component
   * receives a query as a prop, we initialize the query property in the
   * component' state to that value.
   */
  React.useEffect(() => {
    const initialQuery = props.query;
    if (initialQuery) {
      updateQuery(initialQuery);
    }
  });

  /**
   * Returns the view of the component.
   * @returns JSX template for the component.
   */
  return (
    <section className="search-books" data-page="book-search">
      <input type="search" name="query" placeholder="Search by title or author"
        value={query} onChange={(event) => {
          updateQuery(event.target.value);
        }} />
      <section className="container full-width search-books-results">
        {query && (results.length === 0
          ? (<p>No results found for <em>"{query}"</em></p>)
          : (<p>Showing {results.length} books for <em>"{query}"</em></p>))}
        <ol className="books-grid">
          {results.map((book) => (
            <BookListItem key={book.id} book={book}
              onShelfChange={props.onShelfChange} />
          ))}
        </ol>
      </section>
    </section>
  );
}

BookSearch.propTypes = {
  query: PropTypes.string,
  showLoader: PropTypes.func.isRequired,
  getBookShelf: PropTypes.func.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BookSearch;