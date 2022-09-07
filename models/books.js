'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const booksSchema = new Schema({
  title: String,
  description: String,
  status: String,
  email: String
});

const Books = mongoose.model('Books', booksSchema);

module.exports = Books;
