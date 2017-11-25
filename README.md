# React Fundamentals: MyReads

[![Build Status](https://travis-ci.org/LonelyPrincess/reactnd-project-myreads.svg?branch=master)](https://travis-ci.org/LonelyPrincess/reactnd-project-myreads)
[![Inline docs](http://inch-ci.org/github/LonelyPrincess/reactnd-project-myreads.svg?branch=master&style=shields)](http://inch-ci.org/github/LonelyPrincess/reactnd-project-myreads)
[![Live demo](https://img.shields.io/badge/live%20demo-available-blue.svg)](https://lonelyprincess.github.io/reactnd-project-myreads)

This is the final project for the first module of the [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019), "React Fundamentals".

## Project description

The aim of this application is to allow the user to keep track of their own personal library. It includes a list of the books that are already in their possession or those in their wishlist. Each of these books will be grouped in three _shelves_ depending on their status:

* Currently reading
* Want to read
* Read

The user will be able to change a book status anytime, as well as add new titles to their collection or remove items from their library.

## Installation and deployment

### Pre-requisites

Before being able to run this application, you must have [Node Package Manager](https://nodejs.org/en/) or [Yarn](https://yarnpkg.com/) installed on your system.

### Get the application running

If you have all the required software installed, the first step to run this application is to install all of its dependencies and start the application's server.

To do so, you must open a console and, once located into the project's root directory, run the following commands:

```bash
# Install all project's dependencies
> npm install

# Run application's server
> npm start
```

These instructions assume that you've installed [Node Package Manager](https://nodejs.org/en/). If you are using [Yarn](https://yarnpkg.com/) instead, just replace `npm` with `yarn` in the commands listed above.

After running the `start` command, the console output should tell you at which URL is the application running.

```bash
The app is running at:

  # URL where the app is running
  http://localhost:3000/
```

Now you only have to enter that URL into your favourite browser, and that's it! You're all set!

## Project structure

The project folder structure is as follows:

```bash
├── public
└── src
    ├── main
    ├── res
        ├── data
        ├── images
        ├── stylesheets
    ├── test
```

Two folders can be found at the project's root path, being the `src` the most important one as it is the place where all of the application source code will live. The other one, `public`, will contain public resources that can be directly accessed via a direct request to the server, such as the application _favicon_ and the _index.html_ file.

The `src` directory is divided in three parts, each one with a different purpose:

- `main` - As the name implies, this folder contains the main code for the project, being it the wrapper for all the files where the app's functionality is implemented.

- `res` - Resources to be used by the application, including images, stylesheets or mock data files that can be used for testing purposes.

- `test` - Code for unit testing is wrapped into this folder.

## Aspects to consider

### Available search terms

The provided API that serves as a backend for this application does only support a fixed set of search terms. The search page will _not_ return any results for queries that don't match any of the search terms specified in [this list](SEARCH_TERMS.md).

### Project status

Although the specified criteria for passing the first project at the [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) should be met by now, this repository will remain open to new features and improvements. Feel free to [open a new issue](https://github.com/LonelyPrincess/reactnd-project-myreads/issues/new) if you have any suggestion or come across a bug that should eventually be fixed.

### Browser support

This application has been tested in the following browsers:

* Google Chrome (~60.0.3112.113)
* Firefox Developer Edition (~56.0b11)

It's possible that _it might present unexpected behaviours or rendering problems in older browsers_ that have no support for the latest ES2015, HTML5 or CSS3 features.

Since Chrome was one of the main tools used while developing and debugging this application, it's highly recommended to run it in a recent version of Google Chrome.

### Credits

If you need information of the resources used on this project, take a look at [this file](CREDITS.md). This includes links to some useful documentation resources, tools involved in the development process and credits to the authors of the icons used throughout the application.
