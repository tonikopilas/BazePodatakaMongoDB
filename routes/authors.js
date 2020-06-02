const express = require('express');
ObjectId = require('mongodb').ObjectID;
const router = express.Router();
const Author = require('../models/Author');


// Pregled autora
router.get('/', async (req, res) => {
    try{
        const authors = await Author.find()
        .then(authors => {
            res.render('authors/index.ejs', {authors : authors})
          })
          
    }catch(err){
        res.json({ message: err });
    }
});

router.get('/create', (req, res) => {
    res.render('authors/create/index.ejs')
 })
 

 // Kreiranje authora
router.post('/create', async (req, res) => {
   
    const author = new Author({
        ime: req.body.ime,
        prezime: req.body.prezime,
        broj_dijela: req.body.broj_dijela
    });
    try{
    const savedAuthor = await author.save();
    res.redirect('/authors/')
    } catch (err) {
    res.json({ message: err });
    }
});
// edit autora prikaz
router.get('/edit/', async (req, res) => {
    var naziv_url = req.url
    
    var niz = naziv_url.split('=');
    var id = niz[1]
   // console.log(id)
    try{
        const authors = await Author.find({ _id: new ObjectId(id)})
        .then(authors => {
            res.render('authors/edit/index.ejs', {authors : authors})
          })
    }catch(err){
        res.json({ message: err });
    }
});
// uredi autora
router.post('/edit/', async (req, res) => {
    try{
       const updateauthors = await Author.updateOne(
            { _id: req.body.id_autor },
            { $set: {
                ime: req.body.ime,
                prezime: req.body.prezime,
                broj_dijela:req.body.broj_dijela
              }}
            );
            res.redirect('/authors/')  
    }catch(err){
        res.json({ message: err });
    }
});

// izbrisi autora
router.post('/delete/', async (req, res) => {
    try{
        const removedAuthors = await Author.remove({ _id: req.body.id_autor});
        res.redirect('/authors/')
    }catch(err){
        res.json({ message: err });
    }
});
// prikaz  view za brisanje autora
router.get('/delete/', async (req, res) => {
    var naziv_url = req.url
    
    var niz = naziv_url.split('=');
    var id = niz[1]
    //console.log(id)
    try{
        const authors = await Author.find({ _id: new ObjectId(id)})
        .then(authors => {
            res.render('authors/delete/index.ejs', {authors : authors})
          })
    }catch(err){
        res.json({ message: err });
    }
});







module.exports = router;