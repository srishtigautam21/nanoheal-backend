const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(express.json());
// if (process.env.NODE_ENV !== "production") {
app.use(cors());
// }

//static folder
// app.use(express.static(__dirname + "/public"));

const URL = "https://openlibrary.org/search.json?title=";
const DETAIL_URL = "https://openlibrary.org/works/";

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
  console.log(bookName);
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
  console.log("in server", bookId);
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

// app.use(function (req, res, next) {
//   res.sendFile(__dirname + "/public/index.html");
// });

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
