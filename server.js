'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const getBooks = require('./modules/handlers');
const notFound = require('./modules/notFound');
const Handler = require('./modules/handlers');
const verifyUser = require('./modules/auth.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_CONNECTION);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected');
});


app.use(verifyUser);

app.get('/test', (request, response) => {

  response.send(request.user);

});


app.get('/books', Handler.getBooks);
app.post('/books', Handler.createBook);
app.delete('/books/:id', Handler.deleteBook);
app.put('/books/:id', Handler.updateBook);
app.get('/user', handleGetUser); 
app.get('*', notFound);

app.use((error, request, response, next) => {
  response.status(500).send(`Error occurred in the server! ${error.message}`);
});

function handleGetUser(req, res) {
  console.log('Getting the user');
  res.send(req.user);
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
