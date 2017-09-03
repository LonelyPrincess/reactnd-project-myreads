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

  loadBookListFromServer = () => {
    return BooksAPI.getAll()
      .then((books) => this.setState({ books }));
  }

  // Retrieve books from API once component is inserted in DOM
  componentDidMount () {
    this.loadBookListFromServer();
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
                <BookShelf title="Currently Reading" onBookUpdated={this.loadBookListFromServer}
                  books={this.getBooksFromShelf("currentlyReading")} />
                <BookShelf title="Want to Read" onBookUpdated={this.loadBookListFromServer}
                  books={this.getBooksFromShelf("wantToRead")} />
                <BookShelf title="Read" onBookUpdated={this.loadBookListFromServer}
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
          <BookSearch onBookUpdated={this.loadBookListFromServer} />
        )} />
      </div>
    )
  }
}

export default BooksApp
