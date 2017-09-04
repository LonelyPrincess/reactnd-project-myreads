/**
 * This module contains a couple of methods that will make it possible to
 * interact with the books' API used by this application.
 *
 * @module utils/BooksAPI
 * @author Richard Kalehoff <richardkalehoff@gmail.com>
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */

import { searchTerms } from '../constants/SearchTerms';

const api = "https://reactnd-books-api.udacity.com";
const availableSearchTerms = searchTerms.map((term) => term.toLowerCase());

// Generate a unique token for storing your bookshelf data on the backend server
let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

/**
 * Obtain information on a specific book.
 * @param {string} bookId
 * @returns {Promise} Promise object with data on a single book.
 */
export const get = (bookId) => {
  return fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);
};

/**
 * Obtain the list of the books in current user's collection.
 * @returns {Promise} Promise object with an array of books.
 */
export const getUserBooks = () => {
  return fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);
};

/**
 * Update shelf for an existing book instance.
 * @param {Object} book - Book to update.
 * @param {string} shelf - Name of the shelf where the book will be stored.
 * @returns {Promise} Promise object with an array containing the id of the
 *  books in each of the available shelves.
 */
export const update = (book, shelf) => {
  return fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json());
};

/**
 * Obtain list of books matching the specified query.
 * @param {string} query - Search term.
 * @returns {Promise} Promise object with an array of books.
 */
export const search = (query) => {
  return fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.books);
};

/**
 * Checks if current query matches one of the available search terms.
 * @param {string} query - Search term.
 * @returns {boolean}
 */
export const isValidQuery = (query) => {
  return availableSearchTerms.indexOf(query.toLowerCase()) !== -1;
};
