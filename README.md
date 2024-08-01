## Book & Author Search

### Live-link

[Book & Author Search](https://nanoheal-backend.vercel.app/)

### About

This project is a server application built using the Node.js and Express. It demonstrates the skills of working with API calls(Open Library API), handling responses, and managing API calls.

### Features

1. A JSON response of array of books based on a search query from frontend.
2. A JSON response of object containing details for a specific book from the Open Library API.
3. A JSON response of array of authors based on a search query from frontend.
4. A JSON response of object containing details of a specific author from the Open Library API.

### Working

- On searching books name (ex-da vinci code, pride and prejudice) from frontend a GET API request
  is called at **${BackendURLGivenAbove}/book/bookSearch?bookName=${your_bookname}**. This returns a list of first 20 related books to the search.

- On click of any book-card a GET API request is called at **${BackendURLGivenAbove}/book/bookdetail?bookId=${specificIdOfThatBook}**. This will return all the detail of that book.

- Similar working for authors.

## Installation

- Clone the Repository:

##

    git clone https://github.com/srishtigautam21/nanoheal-backend.git
    cd nanoheal-backend

- Install Dependencies:

##

    npm install

- Setup Environment Variable: Create a .env file in the root directory

##

    PORT=5000

- Run the Application:

##

    node index.js
