import React from 'react'
import { Route, Link } from 'react-router-dom'

import '../res/styles/App.css'

import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'
import BookDetails from './components/BookDetails'
import Loader from './components/Loader'

class BooksApp extends React.Component {
  state = {
    books: [],
    showLoader: false
  }

  getBooksFromShelf = (shelf) => {
    return this.state.books
      .filter((book) => book.shelf === shelf)
  }

  getBookShelf = (bookId) => {
    let foundBook = this.state.books
      .find((book) => book.id === bookId);
    return foundBook ? foundBook.shelf : "none";
  }

  showLoader = (value) => {
    this.setState({ showLoader: value });
  }

  // Refresh book list by changing a book status
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
  }

  // Retrieve books from API once component is inserted in DOM
  componentDidMount () {
    this.setState({ showLoader: true });
    BooksAPI.getUserBooks()
      .then((books) => this.setState({ books, showLoader: false }));
  }

  render() {
    return (
      <div className="app">
        { this.state.showLoader && (<Loader />)}

        { /* Book list page */ }
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
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

        { /* Search books page */ }
        <Route path='/search' render={() => (
          <BookSearch
            showLoader={this.showLoader}
            getBookShelf={this.getBookShelf}
            onBookUpdated={this.udateBookStatus} />
        )} />

        { /* Book details page */ }
        <Route path='/details/:bookId' render={(props) => (
          <BookDetails
            bookId={props.match.params.bookId}
            showLoader={this.showLoader} />
        )} />
      </div>
    )
  }
}

export default BooksApp