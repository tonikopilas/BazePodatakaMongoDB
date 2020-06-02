const express = require('express');

const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');


router.get('/', async (req, res) => {
    try{
        const books = await Book.find()
        .then(books => {
            res.render('books/index.ejs', {books : books})
          })
          
    }catch(err){
        res.json({ message: err });
    }
});
// create get
router.get('/create', async (req, res) => {
    try{
        const authors = await Author.find()
        .then(authors => {
            res.render('books/create/index.ejs', {authors : authors})
          })
          
    }catch(err){
        res.json({ message: err });
    }
});
// create post
router.post('/create', async (req, res) => {
    const authors = await Author.find({ _id: new ObjectId(req.body.Autor)})
    
    //console.log(req.body.Autor)
    //console.log(authors[0])
    const book = new Book({
        naziv: req.body.naziv,
        datum_objave: req.body.datum_objave,
        cijena: req.body.cijena,
        broj_stranica: req.body.broj_stranica,
        ime_autora: {
            _id: authors[0]._id,
            ime: authors[0].ime,
            prezime: authors[0].prezime
        }
    });
    try{
        const savedBook = await book.save();
        res.redirect('/books/')
    }catch(err){
        res.json({ message: err });
    }

});
// edit get Prikaz view-a
router.get('/edit/', async (req, res) => {
    var naziv_url = req.url
    var niz = naziv_url.split('=');
    var id_knjige = niz[1].split('&')

    //console.log(id_knjige[0]) id knjige
    //console.log(niz[2])       id_autora
    try{
        const books = await Book.find({ _id: new ObjectId(id_knjige[0])})
       // books[0].datum_objave = books[0].datum_objave.getMonth() + "/" + books[0].datum_objave.getDay() + "/" + books[0].datum_objave.getFullYear()
        .then(books => {
            res.render('books/edit/index.ejs', {books : books})
          })
    }catch(err){
        res.json({ message: err });
    }
});
// edit post Uredi knjigu
router.post('/edit/', async (req, res) => {
    try{
       const updateBooks = await Book.updateOne(
            { _id: req.body.id_knjige },
            { $set: {
                naziv: req.body.naziv,
                cijena: req.body.cijena,
                broj_stranica: req.body.broj_stranica
              }}
            );
            res.redirect('/books/')  
    }catch(err){
        res.json({ message: err });
    }
});

// izbrisi knjigu 
router.post('/delete/', async (req, res) => {
    try{
        const removedBooks = await Book.remove({ _id: req.body.id_knjige});
        res.redirect('/books/')
    }catch(err){
        res.json({ message: err });
    }
});
// prikaz viewa za knjigu
router.get('/delete/', async (req, res) => {
    var naziv_url = req.url
    
    var niz = naziv_url.split('=');
    var id = niz[1]
    //console.log(id)
    try{
        const books = await Book.find({ _id: new ObjectId(id)})
        .then(books => {
            res.render('books/delete/index.ejs', {books : books})
          })
    }catch(err){
        res.json({ message: err });
    }
});


module.exports = router;