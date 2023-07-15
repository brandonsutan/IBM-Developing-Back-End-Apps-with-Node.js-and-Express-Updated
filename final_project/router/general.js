const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

// Middleware for formatting the response
const formatResponse = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Apply middleware
public_users.use(formatResponse);
public_users.use(express.json());
public_users.use(errorHandler);

// Register a user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can log in." });
    } else {
      return res.status(409).json({ message: "User already exists!" });
    }
  } else {
    return res.status(400).json({ message: "Invalid request. Provide username and password." });
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.status(200).json(books);
});

// Error handling for invalid routes
public_users.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports.general = public_users;
