const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// Import Routes
const authorsRoute = require('./routes/authors');
const booksRoute = require('./routes/books');

app.set('view engine', 'ejs')
app.use('/authors/', authorsRoute);
app.use('/books/', booksRoute);
app.use(express.static('public'))

// RUTE

app.get('/', (req, res) => {
    res.send('We are on home');
});

// Spajanje na bazu
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECTION,
     {useNewUrlParser: true },
      ()  => console.log('Spojeno na bazu')
      
);

// Localhost:3000
app.listen(3000)
