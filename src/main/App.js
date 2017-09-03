import React from 'react'
import { Route, Link } from 'react-router-dom'

import '../res/styles/App.css'

import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooksFromShelf = (shelf) => {
    return this.state.books
      .filter((book) => book.shelf === shelf)
  }

  // Refresh book list by changing a book status
  updateBookStatus = (book) => {
    const bookIds = this.state.books.map((book) => book.id);
    const bookIndex = bookIds.indexOf(book.id);

    let books = this.state.books;
    if (bookIndex !== -1) {
      if (book.shelf === "none") {
        console.log(`${book.title} removed from shelves`);
        books.splice(bookIndex, 1);
      } else {
        console.log(`${book.title} moved to shelf ${book.shelf}`);
        books[bookIndex] = book;
      }
    } else {
      console.log(`${book.title} added to shelf ${book.shelf}`);
      books.push(book);
    }

    this.setState({ books });
  }

  // Retrieve books from API once component is inserted in DOM
  componentDidMount () {
    BooksAPI.getAll()
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
                <BookShelf title="Currently Reading" onUpdateBook={this.updateBookStatus}
                  books={this.getBooksFromShelf("currentlyReading")} />
                <BookShelf title="Want to Read" onUpdateBook={this.updateBookStatus}
                  books={this.getBooksFromShelf("wantToRead")} />
                <BookShelf title="Read" onUpdateBook={this.updateBookStatus}
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
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
