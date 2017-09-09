import React from 'react';
import { Route, Link } from 'react-router-dom';

import Loader from './components/Loader';
import * as BooksAPI from './utils/BooksAPI';
import BookShelf from './components/BookShelf';
import BookSearch from './components/BookSearch';
import BookDetails from './components/BookDetails';

import '../res/styles/App.css';

/**
 * Main component for the application. It contains the routes that makes it
 * possible to navigate throughout the different parts of the application.
 *
 * Layout elements that are common to all the pages (like the header) are also
 * available in the render method of this base component.
 *
 * @module BooksApp
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
class BooksApp extends React.Component {
  state = {
    books: [],
    showLoader: false
  };

  /**
   * Obtain all of the user's book that belong to a certain shelf.
   * @param {string} shelf
   * @returns {array} List of books that belong to the selected shelf.
   */
  getBooksFromShelf = (shelf) => {
    return this.state.books
      .filter((book) => book.shelf === shelf)
  };

  /**
   * Obtains the shelf name to which a certain book belongs to.
   * @param {string} bookId
   * @returns {Event} string - Name of the shelf for the selected book.
   */
  getBookShelf = (bookId) => {
    let foundBook = this.state.books
      .find((book) => book.id === bookId);
    return foundBook ? foundBook.shelf : "none";
  };

  /**
   * Allows to switch the state of the loader.
   * @param {boolean} value - Flag that will determine whether the loader will
   *  be hidden or displayed on the screen.
   */
  showLoader = (value) => {
    this.setState({ showLoader: value });
  };

  /**
   * Replace updated instance of a book in the local list held in this
   * component's state.
   * @param {Object} book - Book instance that was moved to a new shelf.
   */
  udateBookStatus = (book) => {
    const bookIndex = this.state.books
      .findIndex((item) => item.id === book.id);

    let books = this.state.books;
    if (bookIndex !== -1) {
      if (book.shelf === "none") {
        console.log(`"${book.title}" removed from shelves`);
        books.splice(bookIndex, 1);
      } else {
        console.log(`"${book.title}" moved to shelf "${book.shelf}"`);
        books[bookIndex] = book;
      }
    } else {
      console.log(`"${book.title}" added to shelf "${book.shelf}"`);
      books.push(book);
    }

    this.setState({ books });
  };

  /**
   * Handler for one of the component's lifecycle events, 'componentDidMount'.
   * This will be triggered once the component is inserted in the DOM, and
   * we'll use it to fetch data on the current user's library.
   */
  componentDidMount() {
    this.setState({ showLoader: true });
    BooksAPI.getUserBooks()
      .then((books) => this.setState({ books, showLoader: false }));
  }

  /**
   * Returns the view template of the component.
   * @returns JSX template for the component.
   */
  render() {
    return (
      <div className="app">
        {this.state.showLoader && (<Loader />)}

        {/* TODO: hide back button when we're on the list page */}
        <header>
          <Link className={`ico ${"back-button"}`} to="/">Go back</Link>
          <h1>MyReads</h1>
          <i className="ico menu-button"></i>
        </header>
        <main>

          { /* Book list page */}
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading"
                    showLoader={this.showLoader}
                    onBookUpdated={this.udateBookStatus}
                    books={this.getBooksFromShelf("currentlyReading")} />
                  <BookShelf title="Want to Read"
                    showLoader={this.showLoader}
                    onBookUpdated={this.udateBookStatus}
                    books={this.getBooksFromShelf("wantToRead")} />
                  <BookShelf title="Read"
                    showLoader={this.showLoader}
                    onBookUpdated={this.udateBookStatus}
                    books={this.getBooksFromShelf("read")} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )} />

          { /* Search books page */}
          <Route path='/search' render={() => (
            <BookSearch
              showLoader={this.showLoader}
              getBookShelf={this.getBookShelf}
              onBookUpdated={this.udateBookStatus} />
          )} />

          { /* Book details page */}
          <Route path='/details/:bookId' render={(props) => (
            <BookDetails
              bookId={props.match.params.bookId}
              showLoader={this.showLoader}
              onBookUpdated={this.udateBookStatus} />
          )} />
        </main>
      </div>
    )
  }
}

export default BooksApp;