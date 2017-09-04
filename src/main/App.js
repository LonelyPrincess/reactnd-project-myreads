import React from 'react'
import { Route, Link } from 'react-router-dom'

import '../res/styles/App.css'

import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'

class BooksApp extends React.Component {
  state = {
    books: []
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
    BooksAPI.getUserBooks()
      .then((books) => this.setState({ books }));
  }

  render() {
    return (
      <div className="app">

        { /* Book list page */ }
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" onBookUpdated={this.udateBookStatus}
                  books={this.getBooksFromShelf("currentlyReading")} />
                <BookShelf title="Want to Read" onBookUpdated={this.udateBookStatus}
                  books={this.getBooksFromShelf("wantToRead")} />
                <BookShelf title="Read" onBookUpdated={this.udateBookStatus}
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
            getBookShelf={this.getBookShelf}
            onBookUpdated={this.udateBookStatus} />
        )} />
      </div>
    )
  }
}

export default BooksApp
