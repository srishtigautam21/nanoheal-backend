const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const URL = "https://openlibrary.org/search.json?title=";
const DETAIL_URL = "https://openlibrary.org/works/";
const AUTHOR_URL = "https://openlibrary.org/search/authors.json?q=";
const AUTHOR_DETAIL = "https://openlibrary.org/authors/";

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Everthing looks good",
  });
});

app.get("/book/bookSearch", async (req, res) => {
  const bookName = req.query.bookName;
  const searchUrl = `${URL}${bookName}&limit=20`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(searchUrl, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({
      msg: "Server error",
    });
  }
});

app.get("/book/bookdetail", async (req, res) => {
  const bookId = req.query.bookId;

  const bookDetailUrl = `${DETAIL_URL}${bookId}.json`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(bookDetailUrl, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({
      msg: "server error",
    });
  }
});

app.get("/author/authorSearch", async (req, res) => {
  const authorName = req.query.authorName;

  const authorUrl = `${AUTHOR_URL}${authorName}&limit=20`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(authorUrl, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({
      msg: "Server error",
    });
  }
});

app.get("/author/authordetail", async (req, res) => {
  const authorId = req.query.authorId;
  const authorDetailUrl = `${AUTHOR_DETAIL}${authorId}.json`;
  const authorWorkUrl = `${AUTHOR_DETAIL}${authorId}/works.json?limit=10`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(authorDetailUrl, options);
    const data = await response.json();
    const workResponse = await fetch(authorWorkUrl, options);
    const workData = await workResponse.json();
    res.status(200).json({ data, workData });
  } catch (e) {
    res.status(500).send({
      msg: "server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
