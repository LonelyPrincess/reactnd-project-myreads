import React from 'react'
import { Route } from 'react-router-dom'

import '../res/styles/App.css'

import * as BooksAPI from './utils/BooksAPI'
import BookListItem from './components/BookListItem'

class BooksApp extends React.Component {
  state = {
    books: []
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
        <Route exact path='/' render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter((book) => book.shelf === "currentlyReading")
                        .map((book) => <BookListItem key={book.id} book={book} />)}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter((book) => book.shelf === "wantToRead")
                        .map((book) => <BookListItem key={book.id} book={book} />)}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter((book) => book.shelf === "read")
                        .map((book) => <BookListItem key={book.id} book={book} />)}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => history.push('/search')}>Add a book</a>
            </div>
          </div>
        )} />

        { /* Search books page */ }
        <Route path='/search' render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => history.push('/')}>Close</a>
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
