# React Fundamentals: MyReads

This is the final project for the first module of the [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019), *React Fundamentals*.

## Project description

The aim of this application is to allow the user to keep track of their own personal library. It includes a list of the books that are already in their possession or those in their wishlist. Each of these books will be grouped in three _shelves_ depending on their status:

* Currently reading
* Want to read
* Read

The user will be able to change a book status anytime, as well as add new titles to their collection or remove items from their library.

## Installation and deployment

### Pre-requisites

Before being able to run this application, you must have [Node Package Manager](https://nodejs.org/en/) installed in your system.

### Get the application running

If you have all the required software installed, the first step to run this application is to install all of its dependencies and start the application's server.

To do so, you must open a console and, once into the project's root directory, run the following commands:

```bash
npm install     # Install all project's dependencies
npm start       # Run application's server
```

When the previous command has finished, the console output should have told you at which URL is the application running.

```bash
The app is running at:

  http://localhost:3000/    # URL where the app is running
```

Now you only have to enter that URL into your favourite browser, and that's it! You're all set!

## Project structure

```bash
├── README.md # The file you're currently seeing
├── SEARCH_TERMS.md # Search terms supported by the book search feature
├── package.json # npm package manager file
├── public # Public resources that will accessible from outside of the app
    ├── favicon.ico
    ├── index.html
└── src
    ├── main # JavaScript files where all of the functionality is implemented
    ├── res # Resources used by the application
        ├── images
        ├── stylesheets
    ├── test # Code for unit testing is wrapped into this folder
```

## Aspects to consider

### Project status
This project is still **in development**, meaning some of the features may not work as expected. Missing features and bug fixes will be eventually commited to this repository.

[![Inline docs](http://inch-ci.org/github/LonelyPrincess/reactnd-project-myreads.svg?branch=master&style=shields)](http://inch-ci.org/github/LonelyPrincess/reactnd-project-myreads)
[![Build Status](https://travis-ci.org/LonelyPrincess/reactnd-project-myreads.svg?branch=master)](https://travis-ci.org/LonelyPrincess/reactnd-project-myreads)

### Available search terms
The provided API that serves as a backend for this application does only support a fixed set of search terms. The search page will _not_ return any results for queries that doesn't match any of the search terms specified in [this list](SEARCH_TERMS.md).

## Credits

#### Image resources

* [Freepik](http://www.freepik.com)
* [Flaticon](https://www.flaticon.com)
* [Manda-Pie](http://manda-pie.deviantart.com)
* [Alfredo Hernández](https://www.flaticon.com/authors/alfredo-hernandez)

#### Development tools

* [React.js](https://facebook.github.io/react/)
* [Node Package Manager](https://nodejs.org/en/)
* [Travis CI](https://travis-ci.org/)
* [Jest](https://facebook.github.io/jest/)

#### Useful documentation

* [Use JSDoc](http://usejsdoc.org/)
