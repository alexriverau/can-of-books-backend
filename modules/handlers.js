'use strict';

const Book = require('../models/books');

const Handler = {};

Handler.getBooks = async (request, response, next) => {
  try {
    // is I pass in a empty object, that tells Mongoose to get ALL the documents from the database
    const book = await Book.find({email: request.user.email});
    console.log(request.user); 
    // const book = await Book.find({});
    response.status(200).send(book);
    // const noData = require('./nodata.js');
    // response.send(noData);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

Handler.createBook = async (request, response, next) => {
  // const{title,description,status} = request.body;
  try {
    const book = await Book.create({ ...request.body, email: request.user.email})
    response.status(201).send(book);
    // const noData = require('./nodata.js');
    // response.send(noData);
  } catch (error) {
    error.customMessage = 'Something went wrong with adding your book: ';
    console.error(error.customMessage + error);
    next(error);
  }
};

Handler.deleteBook = async (request, response, next) => {
  try {
    console.log('Request Obj in Delete Book: ', request);
    await Book.findByIdAndDelete({_id: request.params.id, email: request.user.email});
    response.status(200).send('your book is deleted!');
  } catch (error) {
    error.customMessage = 'Something went wrong when deleting your book: ';
    console.error(error.customMessage + error);
    next(error);
  }
};

Handler.updateBook = async (request, response, next) => {
  try {
    let newBook = await Book.findByIdAndUpdate({...request.body, email: request.user.email, new: true});
    response.status(200).send(newBook);
  } catch (error) {
    error.customMessage = 'Something went wrong when updating your book: ';
    console.error(error.customMessage + error);
    next(error);
  }
};


module.exports = Handler;
