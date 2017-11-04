import React from 'react';
import { Route } from 'react-router-dom';

import Loader from './components/Loader';
import AppInfo from './components/AppInfo';
import * as BooksAPI from './utils/BooksAPI';
import Header from './components/Header';
import BookList from './components/BookList';
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
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
class BooksApp extends React.Component {
  state = {
    books: [],
    showLoader: false
  };

  /**
   * Obtains the shelf name to which a certain book belongs to.
   * @param {string} bookId
   * @returns {Event} string - Name of the shelf for the selected book.
   */
  getBookShelf = (bookId) => {
    let foundBook = this.state.books
      .find((book) => book.id === bookId);
    return foundBook ? foundBook.shelf : 'none';
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
  updateBookStatus = (book) => {
    const books = this.state.books;
    const bookIndex = books
      .findIndex((item) => item.id === book.id);

    if (bookIndex !== -1) {
      if (book.shelf === 'none') {
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
   * Moves a book to a new the shelf by calling the update method in the API.
   * @param {Object} book - Book instance that was moved to a new shelf.
   */
  moveBookToShelf = (book, shelf) => {
    this.showLoader(true);
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.updateBookStatus(book);
        this.showLoader(false);
      });
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

        <Route path="/" render={({ location }) => (
          <Header currentPath={location.pathname} />
        )} />

        <main>
          { /* Book list page */ }
          <Route exact path="/" render={() => (
            <BookList
              books={this.state.books}
              onShelfChange={this.moveBookToShelf} />
          )} />

          { /* Search books page */ }
          <Route path="/search/:query?" render={({ match }) => (
            <BookSearch
              query={match.params.query}
              showLoader={this.showLoader}
              getBookShelf={this.getBookShelf}
              onShelfChange={this.moveBookToShelf} />
          )} />

          { /* Book details page */ }
          <Route path="/details/:bookId" render={(props) => (
            <BookDetails
              bookId={props.match.params.bookId}
              showLoader={this.showLoader}
              onShelfChange={this.moveBookToShelf} />
          )} />

          { /* About page */ }
          <Route path="/about" component={AppInfo} />
        </main>
      </div>
    );
  }
}

export default BooksApp;