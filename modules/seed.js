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
  // seed the database with some books so I can retrieve them
  const myBooks = new Book({
    title: 'A Scanner Darkly',
    description:'The semi-autobiographical story is set in a dystopian Orange County, California, in the then-future of June 1994, and includes an extensive portrayal of drug culture and drug use.',
    status: 'finished',
    email: 'lauren.main28@gmail.com'
  });
  myBooks.save(function (err) {
    if (err) console.error(err);
    else console.log('saved Darkly in database!');
  });

  // alternately...
  await Book.create({
    title: 'Demian',
    description:'Emil Sinclair is a young boy raised in a middle class home, amidst what is described as a Scheinwelt, a play on words meaning "world of light" as well as "world of illusion".',
    status: 'finished',
    email: 'lauren.main28@gmail.com'
  });

  await Book.create({
    title: 'Desert Solitaire',
    description:'Desert Solitaire is a meditation on the stark landscapes of the red-rock West, a passionate vote for wilderness, and a howling lament for the commercialization of the American outback. ',
    status: 'finished',
    email: 'lauren.main28@gmail.com'
  });

  await Book.create({
    title: 'A Sand County Almanac',
    description:'Describing the land around the author\'s home in Sauk County, Wisconsin, the collection of essays advocate Leopold\'s idea of a "land ethic", or a responsible relationship existing between people and the land they inhabit. ',
    status: 'finished',
    email: 'razor@jetcityrollerderby.com'
  });


  await Book.create({
    title: 'Homeland Elegies',
    description:'The idea for writing Homeland Elegies came to Akhtar while he was in Rome, reading Giacomo Leopardi\'s Canti. The first poem "To Italy" inspired him to write a novel about America, that "seemed on the verge of splitting apart." ',
    status: 'finished',
    email: 'razor@jetcityrollerderby.com'
  });

  await Book.create({
    title: 'Dune',
    description:'Dune is set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs. It tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis.',
    status: 'finished',
    email: 'razor@jetcityrollerderby.com'
  });

  console.log('saved books into database');

  console.log('done seeding!');

  mongoose.disconnect();
}

seed();
