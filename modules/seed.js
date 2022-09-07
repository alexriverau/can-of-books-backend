'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

// connect to Mongo using Mongoose
mongoose.connect(process.env.MONGO_CONNECTION);
// this is where the connection actually happens
const db = mongoose.connection;
// is turning the db on and checking for any errors
db.on('error', console.error.bind(console, 'connection error:'));
// if my db is connected properly, I should see this console.log after "listening on PORT 3001"
db.once('open', function() {
  console.log('Mongoose is connected for seeding!');
});

const Book = require('../models/books');

// create a function that seeds the database
async function seed() {
  console.log('seeding database...');
  // seed the database with some cats so I can retrieve them
  const myBooks = new Book({
    title: 'A Scanner Darkly',
    description:'The semi-autobiographical story is set in a dystopian Orange County, California, in the then-future of June 1994, and includes an extensive portrayal of drug culture and drug use.',
    status: 'finished'
  });
  myBooks.save(function (err) {
    if (err) console.error(err);
    else console.log('saved Darkly in database!');
  });

  // alternately...
  await Book.create({
    title: 'Demian',
    description:'Emil Sinclair is a young boy raised in a middle class home, amidst what is described as a Scheinwelt, a play on words meaning "world of light" as well as "world of illusion".',
    status: 'finished'
  });

  await Book.create({
    title: 'The Exorcist',
    description:'The book details the demonic possession of eleven-year-old Regan MacNeil, the daughter of a famous actress, and the two priests who attempt to exorcise the demon. ',
    status: 'finished'
  });

  console.log('saved books into database');

  console.log('done seeding!');

  mongoose.disconnect();
}

seed();
